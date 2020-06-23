const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))
app.use(express.json())
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
const students = require('./students.json')

//Gets all students, or a student by name if a first or last name is specified
app.get('/students', (req, res) => {
    let searchItem = req.query.search
    if (!searchItem) {
        res.send(students)
    } else {
        let filteredData = students.filter(student => student.name.includes(searchItem))
        res.send(filteredData)
    }
})

//gets a student by student ID
app.get('/students/:studentId', (req, res) => {
    let studentID = Number(req.params.studentId);
    let student;
    for (let i = 0; i < students.length; i++) {
        if (students[i]['studentId'] === studentID) {
            student = students[i]
        }
    }
    res.send(student)
})

//gets the grades of a student by student ID
app.get('/grades/:studentId', (req, res) => {
    let studentID = Number(req.params.studentId);
    let student;
    for (let i = 0; i < students.length; i++) {
        if (students[i]['studentId'] === studentID) {
            student = students[i]
        }
    }
    res.send(student.grades)
})

//adds a grade to a student's array of grades based on student ID
app.post('/grades', (req, res) => {
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

//adds a new student to the roster
app.post('/register', (req, res) => {
    let studentData = req.body
    let newStudent = {"studentId": studentData.id, "name": studentData.name, "profilePic": studentData.profilePic, "lastCalled": studentData.lastCalled, "email": studentData.email, "grades": studentData.grades}
    if (newStudent["name"] && newStudent["email"]) {
        students.push(newStudent)
        res.send(`Successfully added ${newStudent["name"][0]} ${newStudent["name"][1]} to the roster.`)
    } else {
        res.send('You must enter a valid name and email')
    }
})