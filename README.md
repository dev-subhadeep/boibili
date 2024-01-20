# boibili

A library management software with multi-role user support.

## Installation Guide

### Step 1: Clone this repository

```
git clone https://github.com/dev-subhadeep/boibili.git
```

### Step 2: Go inside the 'server' folder

```
cd boibili/server/
```

### Step 3: Install the required packages

```
npm install
```

### Step 4: Create a .env file in the server folder with the following content

```
DB_URI=YOUR-DATABASE-URI
DB_NAME=YOUR=DATABASE-NAME
JWT_PK=YOUR-SUPERSECRET-PASSKEY
PORT=PORT-NUMBER
```

### Step 5: Start the server

```
npm start
```

## API Endpoings

> All of these need to be preceded by

```
/api/v1
```

### Register a user

POST request with `username` and `password` as JSON data to

```
/user/
```

### Login a user

GET request with `username` and `password` as JSON data to

```
> Note: This will provide a token that you need to add as header under Authorisation as Bearer token

/user/
```

### Getting a list of books (publicly accessible)

GET request to

```
/books/
```

Each page gives you 10 books. To get the next 10 use the page parameter

```
/books?page=2
```

### Getting the data of a single book

GET request to

```
/books/<id-of-the-book>
```

### Adding a book (must be logged in)

POST request to

```
/books/
```

> Required fields: `title`, `author`, `isbn`, `description`, `publish_date`

### Updating a book (must be logged in)

PATCH request to

```
/books/<id-of-the-book>
```

### Delete a book (must be logged in)

DELETE request to

```
/books/<id-of-the-book>
```

> ### All updates will be pushed to v2 branch hence forward
