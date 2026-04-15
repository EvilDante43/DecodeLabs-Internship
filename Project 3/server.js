require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("DB Error:", err));

const User = require('./models/User');

app.get('/', (req, res) => {
    res.send("API with MongoDB working 🚀");
});

app.post('/users', async (req, res) => {
    try {
        const { name, age } = req.body;

        if (!name || !age) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const user = new User({ name, age });
        await user.save();

        res.status(201).json({ message: "User saved", user });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(id);

        res.json({ message: "User deleted" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, age } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, age },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});