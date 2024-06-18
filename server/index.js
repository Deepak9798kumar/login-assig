const express = require('express');
const cors = require('cors');
const db = require('./db');
const usersRouter = require('./routers/users');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api', usersRouter); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
