const express = require('express');
const router = express.Router();
const User = require('../models/userSchema'); 
const multer = require('multer'); 
const path = require('path');

router.post('/users', async (req, res) => {
    const { name, email, phoneNumber } = req.body;
    try {
        
        const newUser = new User({ name, email, phoneNumber });
        
        await newUser.save();
        
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Server Error' });
    }
});


// POST endpoint for user login
router.post('/login', async (req, res) => {
    const { name, phoneNumber } = req.body;

    try {
        
        const user = await User.findOne({ name, phoneNumber });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Server Error' });
    }
});



// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        const userId = req.body.userId; 
        const fileName = `${userId}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName); 
    }
});

const upload = multer({ storage });

// POST endpoint to handle PDF upload
router.post('/uploadPdf', upload.single('pdf'), async (req, res) => {
    try {
        
        const userId = req.body.userId;

       
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        
        user.pdf = req.file.path; 

        
        await user.save();

       
        res.status(200).json({ message: 'PDF uploaded successfully' });
    } catch (error) {
        console.error('Error uploading PDF:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// GET endpoint to download PDF
router.get('/downloadPdf', async (req, res) => {
    try {
        const userId = req.query.userId; 

        const user = await User.findById(userId);

        if (!user || !user.pdf) {
            return res.status(404).json({ error: 'PDF not found' });
        }

        res.download(path.resolve(__dirname, '..', user.pdf)); 

    } catch (error) {
        console.error('Error downloading PDF:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
