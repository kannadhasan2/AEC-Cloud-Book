const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const dbPath = path.join("/tmp", "aeclibrary.db");

let db = null;

// DB Initialization
const initializationOfDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Run local server only if not in Vercel
    if (process.env.VERCEL === undefined) {
      app.listen(5000, () => {
        console.log("Server running at http://localhost:5000");
      });
    }
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializationOfDBAndServer();
console.log("DB Path:", dbPath);
const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table';");
console.log("Tables:", tables);

// JWT Middleware
const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401).send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "AEC_LIBRARY", (error, payload) => {
      if (error) {
        response.status(401).send("Invalid JWT Token");
      } else {
        request.register_no = payload.register_no;
        next();
      }
    });
  }
};

//testing
app.get("/",(request,response) =>{
  response.send("Working...")
})


// Register User
app.post("/register", async (request, response) => {
  const { username, dateOfBirth, registerNo, department, email } = request.body;
  const selectStudentQuery = `SELECT * FROM student WHERE register_no = '${registerNo}';`;
  const dbStudent = await db.get(selectStudentQuery);

  if (dbStudent === undefined) {
    const createStudentQuery = `
      INSERT INTO student (username, register_no, department, date_of_birth, email)
      VALUES ('${username}', '${registerNo}', '${department}', '${dateOfBirth}', '${email}');
    `;
    await db.run(createStudentQuery);
    response.send({ error_msg: "User Created Successfully" });
  } else {
    response.status(400).send({ error_msg: "User already exist" });
  }
});

// Login User
app.post("/login", async (request, response) => {
  const { registerNo, dateOfBirth } = request.body;
  const selectStudentQuery = `SELECT * FROM student WHERE register_no = '${registerNo}';`;
  const dbStudent = await db.get(selectStudentQuery);

  if (dbStudent === undefined) {
    response.status(400).send("Invalid Register No");
  } else {
    if (dbStudent.date_of_birth === dateOfBirth) {
      const payload = { register_no: registerNo };
      const jwtToken = jwt.sign(payload, "AEC_LIBRARY");
      response.send({ jwt_token: jwtToken });
    } else {
      response.status(400).send("Invalid Date Of Birth");
    }
  }
});



// Student List
app.get("/student-list", async (request, response) => {
  const selectStudentQuery = `SELECT * FROM student;`;
  const studentList = await db.all(selectStudentQuery);
  response.send({ studentList });
});

// Profile
app.get("/profile", authenticateToken, async (request, response) => {
  const registerNo = request.register_no;
  const selectStudentQuery = `SELECT * FROM student WHERE register_no='${registerNo}';`;
  const studentData = await db.get(selectStudentQuery);
  response.send(studentData);
});

// Insert Book
app.post("/insert-book", async (request, response) => {
  const { bookId, bookName, author, numberOfPages, publishedYear, description, publisher, bookCount, imageUrl, chapters } = request.body;
  const insertDataQuery = `
    INSERT INTO books (book_id, book_name, author, number_of_pages, published_year, publisher, description, book_count, image_url, chapters)
    VALUES ('${bookId}','${bookName}','${author}',${numberOfPages},${publishedYear},'${publisher}','${description}',${bookCount},'${imageUrl}','${chapters}');
  `;
  await db.run(insertDataQuery);
  response.send("Book Added");
});

// Get All Books
app.get("/books", async (request, response) => {
  const getBooksQuery = `SELECT * FROM books ORDER BY book_name;`;
  const books = await db.all(getBooksQuery);
  response.send(books);
});

// Get Single Book
app.get("/book/:bookId", async (request, response) => {
  const { bookId } = request.params;
  const getBooksQuery = `SELECT * FROM books WHERE book_id='${bookId}';`;
  const book = await db.get(getBooksQuery);
  response.send(book);
});

// Export app for Vercel
module.exports = app;
