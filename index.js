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