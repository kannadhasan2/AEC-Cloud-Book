import 'dotenv/config';
import express from "express";
import { createClient } from "@libsql/client";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Turso client
const db = createClient({
  url: 'libsql://aec-library-kannadhasan2.aws-ap-south-1.turso.io', // your HTTP URL
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTc1NzAwMzcsImlkIjoiZTYzZTFlYzItNmM5MS00YmE2LWI2YmUtMDY0MDc1NGZkMDJmIiwicmlkIjoiZTczMjdhYmUtYzcyOS00OTc5LWJkMmEtODZkODZmOWM0ODgxIn0.YSjhd3u7cVRi6E60FHouEXwJHnuixlDrermUOzgrNER2C19_HuUALB2ttGd_GQcERzVTxqhjbV1sfhEs76AvDQ'
});

// DB Initialization
const initializeDB = async () => {
  try {
    // Create student table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS student (
        register_no TEXT PRIMARY KEY,
        username TEXT,
        department TEXT,
        date_of_birth TEXT,
        email TEXT
      )
    `);

    // Create books table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS books (
        book_id TEXT PRIMARY KEY,
        book_name TEXT,
        author TEXT,
        number_of_pages INTEGER,
        published_year INTEGER,
        publisher TEXT,
        description TEXT,
        book_count INTEGER,
        image_url TEXT,
        chapters TEXT
      )
    `);

    // Check if any books exist
    const existingBooks = await db.execute("SELECT COUNT(*) AS count FROM books");
    if (existingBooks.rows[0].count === 0) {
      await db.execute({
        sql: `INSERT INTO books (
          book_id, book_name, author, number_of_pages, published_year, publisher, description, book_count, image_url, chapters
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          "B001",
          "Innovation101",
          "JohnDoe",
          250,
          2022,
          "OpenAIPress",
          "A book on innovation",
          5,
          "https://via.placeholder.com/150",
          JSON.stringify(["Intro", "Chapter1"]),
        ],
      });
      console.log("✅ Sample book inserted");
    }

    // Start server if not on Vercel
    if (!process.env.VERCEL) {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    }

  } catch (e) {
    console.error(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDB();

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const jwtToken = authHeader && authHeader.split(" ")[1];

  if (!jwtToken) return res.status(401).send("Invalid JWT Token");

  jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload) => {
    if (error) return res.status(401).send("Invalid JWT Token");
    req.register_no = payload.register_no;
    next();
  });
};

// Routes
app.get("/", (req, res) => res.send("Working..."));

app.post("/register", async (req, res) => {
  const { username, dateOfBirth, registerNo, department, email } = req.body;
  const dbStudent = await db.execute({
    sql: "SELECT * FROM student WHERE register_no = ?",
    args: [registerNo],
  });

  if (dbStudent.rows.length === 0) {
    await db.execute({
      sql: `
        INSERT INTO student (username, register_no, department, date_of_birth, email)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [username, registerNo, department, dateOfBirth, email],
    });
    res.send({ message: "User Created Successfully" });
  } else {
    res.status(400).send({ error_msg: "User already exists" });
  }
});

app.post("/login", async (req, res) => {
  const { registerNo, dateOfBirth } = req.body;
  const dbStudent = await db.execute({
    sql: "SELECT * FROM student WHERE register_no = ?",
    args: [registerNo],
  });

  if (dbStudent.rows.length === 0) return res.status(400).send("Invalid Register No");

  const student = dbStudent.rows[0];
  if (student.date_of_birth === dateOfBirth) {
    const jwtToken = jwt.sign({ register_no: registerNo }, process.env.JWT_SECRET);
    res.send({ jwt_token: jwtToken });
  } else {
    res.status(400).send("Invalid Date Of Birth");
  }
});

app.get("/student-list", async (req, res) => {
  const studentList = await db.execute("SELECT * FROM student");
  res.send({ studentList: studentList.rows });
});

app.get("/profile", authenticateToken, async (req, res) => {
  const studentData = await db.execute({
    sql: "SELECT * FROM student WHERE register_no = ?",
    args: [req.register_no],
  });
  res.send(studentData.rows[0]);
});

app.post("/insert-book", async (req, res) => {
  const { bookId, bookName, author, numberOfPages, publishedYear, description, publisher, bookCount, imageUrl, chapters } = req.body;
  await db.execute({
    sql: `
      INSERT INTO books (book_id, book_name, author, number_of_pages, published_year, publisher, description, book_count, image_url, chapters)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [bookId, bookName, author, numberOfPages, publishedYear, publisher, description, bookCount, imageUrl, chapters],
  });
  res.send("Book Added");
});

app.get("/books", async (req, res) => {
  const books = await db.execute("SELECT * FROM books ORDER BY book_name");
  res.send(books.rows);
});

app.get("/book/:bookId", async (req, res) => {
  const book = await db.execute({
    sql: "SELECT * FROM books WHERE book_id = ?",
    args: [req.params.bookId],
  });
  res.send(book.rows[0]);
});

// Export app for Vercel
export default app;
