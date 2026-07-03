import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Define the structure of a single item in the cart
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// 2. Expand the state to include totalPrice and an array of items
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 3. Update the payload to accept the product details (name, price) along with delta
    updateQuantity: (
      state, 
      action: PayloadAction<{ product: { id: number; name: string; price: number }; delta: number }>
    ) => {
      const { product, delta } = action.payload;
      
      // Find if the item already exists in the cart array
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        // Item exists, update its quantity
        state.items[existingItemIndex].quantity += delta;
        
        // If quantity drops to 0 or below, remove it from the array
        if (state.items[existingItemIndex].quantity <= 0) {
          state.items.splice(existingItemIndex, 1);
        }
      } else if (delta > 0) {
        // Item does not exist, add it as a new CartItem
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: delta,
        });
      }

      // 4. Recalculate totals natively inside Redux
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    }
  },
});

export const { updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;