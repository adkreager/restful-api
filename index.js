const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))
app.use(express.json())
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
const students = require('./students.json')


// app.get('/students', (req, res) => {
//     if no query {
//         res.send(students)
//     } else {

//     }
// })

app.get('/students/:studentId', (req, res) => {
    /* GET a user by their id */
    let studentID = Number(req.params.studentId);
    let student;
    for (let i = 0; i < students.length; i++) {
        if (students[i]['studentId'] === studentID) {
            student = students[i]
        }
    }
    res.send(student)
})

app.get('/grades/:studentId', (req, res) => {
    /* GET a user by their id */
    let studentID = Number(req.params.studentId);
    let student;
    for (let i = 0; i < students.length; i++) {
        if (students[i]['studentId'] === studentID) {
            student = students[i]
        }
    }
    res.send(student.grades)
})

app.post('/grades', (req, res) => {
    /* POST user data using the request body */
    let studentID = req.body.studentId
    let newGrade = req.body.grades
    let notFoundBool = true;
    for (let i = 0; i < students.length; i++) {
        if (students[i]['studentId'] === studentID) {
            students[i].grades.push(newGrade);
            res.send(`Successfully added new grade to student ${studentID}'s report card.`)
            notFoundBool = false;
        }
    }
    if (notFoundBool) {
        res.send('That student does not exist')
    }
})

app.post('/register', (req, res) => {
    /* POST user data using the request body */
    let studentData = req.body
    let newStudent = {"studentId": studentData.id, "name": studentData.name, "profilePic": studentData.profilePic, "lastCalled": studentData.lastCalled, "email": studentData.email, "grades": studentData.grades}
    if (newStudent["name"] && newStudent["email"]) {
        students.push(newStudent)
        res.send(`Successfully added ${newStudent["name"][0]} ${newStudent["name"][1]} to the roster.`)
    } else {
        res.send('You must enter a valid name and email')
    }
})

// app.post('/', (req, res) => {
//     /* POST user data using the request body */
//     let studentData = req.body
//     let newStudent = {"studentId": studentData.id, "name": studentData.name, "profilePic": studentData.profilePic, "lastCalled": studentData.lastCalled, "grades": studentData.grades}
//     data.push(newStudent)
//     res.send(`Successfully added new student.`)
    
// })

// app.get('/data/', (req, res) => {
//     /* GET a user by their name */
//     let name = req.query.name
//     res.send(`Hello, ${name}`)
// })