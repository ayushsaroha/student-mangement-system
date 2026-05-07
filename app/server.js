const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

let students = [

    {
        id: 1,
        name: "Ayush",
        roll: "101",
        course: "BTech CSE"
    },

    {
        id: 2,
        name: "Rahul",
        roll: "102",
        course: "BTech IT"
    }

];


// HOME ROUTE
app.get("/", (req, res) => {

    res.send("Student Management System Running Successfully");

});


// GET ALL STUDENTS
app.get("/students", (req, res) => {

    res.json(students);

});


// GET SINGLE STUDENT
app.get("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    res.json(student);

});


// ADD STUDENT
app.post("/students", (req, res) => {

    const newStudent = {

        id: students.length + 1,
        name: req.body.name,
        roll: req.body.roll,
        course: req.body.course

    };

    students.push(newStudent);

    res.status(201).json({

        message: "Student added successfully",
        student: newStudent

    });

});


// UPDATE STUDENT
app.put("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    student.name = req.body.name || student.name;
    student.roll = req.body.roll || student.roll;
    student.course = req.body.course || student.course;

    res.json({

        message: "Student updated successfully",
        student

    });

});


// DELETE STUDENT
app.delete("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    students = students.filter(s => s.id !== id);

    res.json({

        message: "Student deleted successfully"

    });

});


// SERVER
const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});