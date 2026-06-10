import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      state.totalQuantity++;
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1
        });
      } else {
        existingItem.quantity++;
      }
    },
    removeFromCart(state, action: PayloadAction<string | number>) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity--;
        
        if (existingItem.quantity === 1) {
          // Remove entirely if quantity reaches 0
          state.items = state.items.filter(item => item.id !== id);
        } else {
          // Otherwise, just decrement
          existingItem.quantity--;
        }
      }
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;