# assignment-l2-3
📚 Library Management API

A backend RESTful API built with Express, TypeScript, and MongoDB (Mongoose) to manage books and borrowing operations in a library system.

🚀 Features

1. Create, update, delete, and retrieve books
2. Borrow books with quantity and due date
3. Track total borrows per genre and book
4. Schema validation with Mongoose
5. Middleware logging
6. Filtering, sorting, and pagination support
7. Business logic enforcement (e.g., borrowing restrictions)

Tech Stack:

Required Dependencies Installed:
1.express – backend framework
2.mongoose – MongoDB ORM
3.dotenv – for environment variables
4.cors – for API access

Dev Dependencies Installed:
1.typescript – static typing
2.ts-node-dev – hot-reload during development
3.@types/express – TypeScript types
4.@types/node – Node.js types





API Endpoints: POST /api/books

Base URL: http://localhost:5000/api

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}



Get All Books (with filters)

GET http://localhost:5000/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

Get Book by ID: GET http://localhost:5000/api/books/:bookId

Update Book: PUT http://localhost:5000/api/books/:bookId

Delete Book: DELETE http://localhost:5000/api/books/:bookId

Borrow a Book: POST http://localhost:5000/api/borrow

{
  "book": "BOOK_OBJECT_ID",
  "quantity": 2,
  "dueDate": "2025-07-18"
}

GET http://localhost:5000/api/borrow

{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}

Error Response Format

{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}