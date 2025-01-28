// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3010;

// Middleware to parse JSON request body
app.use(express.json());

// Load student data from data.json
const studentsData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// POST API: Get students above a certain threshold
app.post('/students/above-threshold', (req, res) => {
    const { threshold } = req.body;

    // Validate input
    if (typeof threshold !== 'number' || isNaN(threshold)) {
        return res.status(400).json({ message: "Invalid threshold. Please provide a valid number." });
    }

    // Filter students who have total marks above the threshold
    const filteredStudents = studentsData.filter(student => student.total > threshold);

    // Send response
    res.json({
        count: filteredStudents.length,
        students: filteredStudents.map(student => ({
            name: student.name,
            total: student.total
        }))
    });
});

// Serve static files (CSS, JS, etc.)
app.use(express.static('static'));

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


