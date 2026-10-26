## Advanced E-commerce Shopping Application

## Project Description:

This is an Advanced E-commerce Shopping Application built with React and TypeScript. It allows users to browse products, filter products by category, add products to a shopping cart, manage quantities, and simulate checkout.

The application uses the FakeStore API to retrieve product information.

## Technologies Used:

React

TypeScript

Vite

React Query (TanStack Query)

Redux Toolkit

React Redux

React Router

Session Storage

CSS

FakeStore API

## Features:

- Product Catalog

Display all products from FakeStore API.

Show product title, price, category, description, rating, and image.

Add products to the shopping cart.

Display a placeholder when a product image fails to load.

- Category Navigation

Retrieve product categories dynamically from the API.

Filter products by selected category.

Use React Query to fetch category-specific products.

- Shopping Cart

Add products to the cart.

Increase and decrease product quantities.

Remove products from the cart.

Display product images, titles, quantities, and prices.

Calculate the total number of products.

Calculate the total shopping cart price.

- Session Storage

Save cart data in sessionStorage.

Restore cart data when the application is refreshed.

Keep cart information available across application pages during the browser session.

- Checkout

Simulate a successful checkout.

Clear the Redux shopping cart.

Clear the saved cart data in sessionStorage.

Display a success message after checkout.

- API

This project uses the FakeStore API:

All Products: https://fakestoreapi.com/products

Categories: https://fakestoreapi.com/products/categories

Products by Category: https://fakestoreapi.com/products/category/{category}

## State Management

Redux Toolkit is used to manage the shopping cart state. React Query is used to fetch and cache product and category information from the FakeStore API.

SessionStorage is used to save and restore shopping cart data during the browser session.
