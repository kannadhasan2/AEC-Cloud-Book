const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
const jwt = require("jsonwebtoken")
const dbPath = path.join(__dirname, "aeclibrary.db");
let db = null;
const initializationOfDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  } catch (e) {
    console.log(`DB Error" ${e.message}`);
    process.exit(1);
  }
};
initializationOfDBAndServer();
app.listen(5000, () => {
  console.log("Server running at the port 5000");
});


const authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
      response.status(401);
      response.send("Invalid JWT Token");
    } else {
      jwt.verify(jwtToken, "AEC_LIBRARY", async (error, payload) => {
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
          request.register_no = payload.register_no;
          next();
        }
      });
    }
  };

//Register User

app.post("/register/", async (request , response)=>{
    const student = request.body 
    const {username,dateOfBirth,registerNo,department,email} = student 
    console.log(student)
    const selectStudentQuery = `select * from student where register_no = '${registerNo}';` 
    const dbStudent = await db.get(selectStudentQuery)
    if (dbStudent === undefined){
        const createStudentQuery = `
        INSERT into student (username,register_no,department,date_of_birth,email)
        values ('${username}', '${registerNo}', '${department}', '${dateOfBirth}','${email}');
        `
        await db.run(createStudentQuery)
        response.send({"error_msg":"User Created Successfully"})
        
    }else{
        response.status(400)
        response.send({"error_msg":"User already exist"})
    }
})

//Login User

app.post("/login", async (request,response) =>{
    const student = request.body     
    const {registerNo, dateOfBirth} = student
    const selectStudentQuery = `select * from student where register_no = '${registerNo}';`
    const dbStudent = await db.get(selectStudentQuery)
    if (dbStudent === undefined){
        response.status(400)
        response.send("Invalid Register No")
    }else{
        if (dbStudent.date_of_birth === dateOfBirth){
            const payload = {register_no:registerNo}
            const jwtToken = jwt.sign(payload, "AEC_LIBRARY")
            
            response.send({jwt_token:jwtToken})
        }else{
            response.status(400)
            response.send("Invalid Date Of Birth")
        }
    }
})

app.use('/',(req,res)=> {
  res.send("Working")
})

//Get STudent Details 
app.get('/student-list/', authenticateToken, async (request,response)=>{
    const selectStudentQuery = `
        select * from student
    `
    const studentList = await db.all(selectStudentQuery)
    response.send({studentList})
})

//Profile API 
app.get("/profile",authenticateToken, async (request,response) =>{
  const registerNo = request.register_no 
  const selectStudentQuery = `select * from student where register_no='${registerNo}';`
  const studentData = await db.get(selectStudentQuery)
  response.send(studentData)

})

//Insert Book Data API 
app.post("/insert-book" , async (request,response)=>{
  const bookData= request.body
  const {bookId,bookName,author,numberOfPages,publishedYear, description,publisher,bookCount,imageUrl,chapters} = bookData
  const insertDataQuery = `
    insert into books (book_id,book_name,author,number_of_pages,published_year,publisher,description,book_count,image_url,chapters)
    values ('${bookId}','${bookName}','${author}',${numberOfPages},${publishedYear},'${publisher}','${description}',${bookCount},'${imageUrl}','${chapters}');
  `
  await db.run(insertDataQuery) 
  response.send("Book Added")
})

app.get('/books' , async (request,response) => {
  const getBooksQuery = `
    select * from books order by book_name;
  `
  const books = await db.all(getBooksQuery) 
  response.send(books)
})

app.get('/book/:bookId' , async (request,response) => {
  const {bookId} = request.params 
  const getBooksQuery = `
    select * from books where book_id='${bookId}';;
  `
  const book = await db.get(getBooksQuery) 
  response.send(book)
})

module.exports = app