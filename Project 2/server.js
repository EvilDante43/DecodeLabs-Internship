const express = require("express");
const app = express();

app.use(express.json());

let users = [];

app.get("/users", (req,res) => {
    res.status(200).json(users);
})

app.post("/users", (req,res) => {
    const {name, age} = req.body;
    if(typeof name !== "string" || name.trim() === "" || typeof age !== "number"){
        return res.status(400).json({message: "Invalid Data!"})
    }
    users.push({ id: users.length + 1, name, age });
    res.status(201).json({
        message: "User added successfully",
        users
    });
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userExists = users.some(user => user.id === id);
    if (!userExists) {
        return res.status(404).json({ message: "User not found" });
    }
    users = users.filter(user => user.id !== id);
    res.json({ message: "User deleted" });
});

app.get("/", (req,res) => {
    res.send("API Working correctly");
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})