# Velocix Code Review Report

This report focuses on backend mistakes that are either crashing requests or making responses slower than they should be.

## 1. Product list endpoint calls an undefined variable
**Code**
```js
const products = await getAllProducts.getAllProducts();
```
**File**
[backend/src/controllers/productController.mjs](backend/src/controllers/productController.mjs#L8)
**Code**
`getAllProducts` is not defined in this controller, so the route throws a runtime error instead of returning products.
**Solution**
Use `ProductService.getAllProducts()`.

## 2. Order placement uses an undefined variable
**Code**
```js
const order = await OrderService.placeOrder(req.user.id, data, req.body.items);
```
**File**
[backend/src/controllers/orderController.mjs](backend/src/controllers/orderController.mjs#L6)
**Code**
`data` is never declared, so every order request fails before the service runs.
**Solution**
Pass the actual request body, for example `req.body`, or destructure the fields you need before calling the service.

## 3. Product creation has undefined variables and swallows errors
**Code**
```js
if (store.ownerId != user.id) throw new Error("User does not own the store");
```
**File**
[backend/src/services/productService.mjs](backend/src/services/productService.mjs#L14)
**Code**
`store` and `user` are not defined in this method, so product creation crashes immediately. The same file also catches errors and returns them instead of throwing, which hides failures from the global error handler.
**Solution**
Pass the needed user and store data into the method, load the store first, and replace `return err;` with `throw err;`.

## 4. Sorted product query uses the wrong Prisma key
**Code**
```js
orderB:{
```
**File**
[backend/src/services/productService.mjs](backend/src/services/productService.mjs#L57)
**Code**
`orderB` is a typo. Prisma expects `orderBy`, so this query can fail or behave incorrectly.
**Solution**
Rename the field to `orderBy`.

## 5. Order lookup calls Prisma on the wrong object
**Code**
```js
return await prisma.findUnique({
```
**File**
[backend/src/services/orderService.mjs](backend/src/services/orderService.mjs#L85)
**Code**
`findUnique` is being called on `prisma` instead of `prisma.order`, which is a runtime error.
**Solution**
Change it to `prisma.order.findUnique(...)`.

## 6. Order placement is slower than necessary
**Code**
```js
for(const item of items){
```
**File**
[backend/src/services/orderService.mjs](backend/src/services/orderService.mjs#L10)
**Code**
The order flow does multiple sequential database calls per item, then repeats another lookup loop and logs the same payload multiple times. That creates an N+1 style pattern and increases response time as cart size grows.
**Solution**
Fetch all products for the order in one query, cache them in memory for the transaction, remove repeated lookups, and delete the debug logs.

## 7. The location search endpoint is broken and expensive
**Code**
```js
const lng = parseFloat(req,query.lng);
```
**File**
[backend/src/controllers/consumerController.mjs](backend/src/controllers/consumerController.mjs#L8)
**Code**
There is a syntax bug in the longitude parse, the raw SQL selects `address` even though the Store model does not define it, and the distance comparison reads `nearestStore.distance` instead of `nearestStore.distance_km`. The query also computes distance across the whole Store table, which gets slower as the table grows.
**Solution**
Fix the query typos, remove the nonexistent `address` column, compare against `distance_km`, and consider an indexed geospatial approach or at least a smaller candidate set before sorting all stores.

## 8. List endpoints fetch entire tables without pagination
**Code**
```js
const products = await prisma.product.findMany({});
```
**File**
[backend/src/services/productService.mjs](backend/src/services/productService.mjs#L6)
**Code**
```js
const stores = await prisma.store.findMany({});
```
**File**
[backend/src/services/storeService.js](backend/src/services/storeService.js#L22)
**Code**
Both endpoints return every row in the table. That is fine on small datasets, but response times will get noticeably worse as the database grows.
**Solution**
Add pagination, filtering, and field selection so the API returns only the rows and columns the client actually needs.

## 9. Some services return errors instead of throwing them
**Code**
```js
return err;
```
**File**
[backend/src/services/productService.mjs](backend/src/services/productService.mjs#L27)
**Code**
This pattern appears in multiple service methods. Returning an error object makes the caller think the operation succeeded, which leads to confusing responses and hides the real failure path.
**Solution**
Throw the error so `catchAsync` and the global error handler can format it correctly.
