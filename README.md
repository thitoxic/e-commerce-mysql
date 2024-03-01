# E-commerce Backend Application

This is a backend application for an e-commerce platform. It utilizes various libraries and tools for its functionality.

## Libraries Used

- Express framework: A web application framework for Node.js.
- MySQL: A relational database management system.
- Sequelize ORM: An ORM (Object-Relational Mapping) library for Node.js, which provides easy access to MySQL database through models.
- jsonwebtoken: A library for generating and verifying JSON Web Tokens (JWT), used for authentication.

## Local Setup

Follow these steps to set up the application locally:

1. Copy `config.sample.json` file and create a `config.json` file in the `config` folder. Add local database related fields in the `development` object.
2. Create a `.env` environment file and add `JWT_SECRET_KEY` with your own secret key.
3. Install all the dependency libraries using `npm install`.
4. Start your application using `npm start`.

## API Documentation

Authentication - 
`/api/auth/register` - Registering users & adding admin permission.
`api/auth/login` - Logging the user with jwt token 

Products - 
`api/products/list` - Listing the products with searching and sorting functionality
`api/products/add` - Adding a new product(Admin only)
`api/products/update/:productId` - Updating a product with id
`api/products/delete/:productId` - Deleting a product with id
