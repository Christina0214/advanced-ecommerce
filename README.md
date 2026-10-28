## MyStore -- E-Commerce Web Application

A React and TypeScript e-commerce application that uses Firebase Authentication for user accounts and Cloud Firestore for product
and order management. The app also includes a shopping cart, product management, and order history.

## About the Project

This project is an e-commerce application developed with React and TypeScript. It originally used the FakeStore API for product data. The application has been extended to use Firebase and Firestore instead.

Users can register and log in, browse products stored in Firestore, manage products, add items to a Redux-powered shopping cart, and place orders. Order information is saved in Firestore and can be viewed later in the order history.

## Live Demo

Visit the deployed application:

https://advanced-ecommerce-rho.vercel.app/

## Technologies Used:

- React -- building the user interface
- TypeScript -- adding static types to the application
- Vite -- development server and build tool
- Firebase Authentication -- email and password authentication
- Cloud Firestore -- storing users, products, and orders
- Redux Toolkit -- managing shopping cart state
- React Redux -- connecting Redux to React components
- React Router -- navigation between pages
- TanStack Query -- fetching and caching product data
- CSS -- page and component styling

## Features:

1. Firebase Authentication
- Register a new account using an email address and password.
- Sign in with an existing account.
- Sign out of the application.
- Create a corresponding user document in the Firestore users
  collection when a user registers.

2. User Management
- Store user information in the Firestore users collection.
- Add and display user records using the data form and display pages.
- Update and delete user records in Firestore.

3. Product Management
- Retrieve products from the Firestore products collection instead
  of the FakeStore API.
- Add new products.
- Update existing products.
- Delete products.
- Display products in the application.
New products do not have to include a rating, so the product display
handles missing rating information.

4. Shopping Cart
- Add products to the shopping cart.
- Display cart items and quantities.
- Calculate the number of items and the total price.
- Clear the cart after a successful checkout.
The cart state is managed with Redux Toolkit.

5. Order Management
- Require the user to be signed in before placing an order.
- Save the order to the Firestore orders collection.
- Store the user ID, user email, ordered products, quantities, total
  price, and creation timestamp.
- Display the signed-in user's order history.
- Show the order ID, creation date, and total price.
- Open an individual order to view its products, quantities,
  subtotals, and total price.

## Testing and CI/CD

The project includes automated tests and a continuous integration and deployment pipeline.

## Testing

- Unit tests for the ProductCard component.

- Unit tests for the CartItem component.

- An integration test verifying that adding a product updates the shopping cart.

- Jest and React Testing Library are used for testing.

## Continuous Integration (CI)

GitHub Actions automatically:

- Installs project dependencies.

- Runs the automated tests.

- Builds the application for production.

## Continuous Deployment (CD)

Vercel is integrated with GitHub Actions to automate production deployments.
Deployment runs after the CI job succeeds, ensuring that the application is tested and built successfully before deployment.

## Getting Started

## Prerequisites

Make sure you have installed:
- Node.js
- npm (included with Node.js)
- A Firebase account

1. Clone the repository
- git clone https://github.com/Christina0214/advanced-ecommerce
2. Open the project folder
cd advanced-ecommerce
3. Install dependencies
npm install
4. Configure Firebase
- Create a Firebase project and register a Web App in the Firebase
Console.
- Enable the following Firebase services:
A. Authentication -- enable the Email/Password sign-in provider.
B. Cloud Firestore -- create a Firestore database. Add your Firebase web app configuration to
src/config/firebaseConfig.ts.
5. Start the development server
- npm run dev
Open the local URL printed in your terminal by Vite.

## Firebase Setup
In the Firebase Console:
1. Open your Firebase project.
2. Go to Build → Authentication → Sign-in method.
3. Enable Email/Password and save the change.
4. Go to Build → Firestore Database.
5. Create a database.
6. Configure Firestore Security Rules for your application. 

Firestore collections are created automatically when the application
first writes a document to them. The users, products, and orders collections do not need to be manually populated with empty collections.

## Firestore Database Structure:

The application uses the following collections:

- users
Stores user-related documents. A registration-created user document is associated with the Firebase
Authentication user's UID.

- products
Stores products displayed in the shop.

- orders
Stores completed orders.

## Application Routes

The application includes these main routes:

/                  Home page with products
/cart              Shopping cart and checkout
/login             User login
/register          User registration
/add-product       Product management page
/orders            Signed-in user's order history
/orders/:orderId   Details for an individual order
/add-data          Add a user data record
/display-data      Display and manage user data records