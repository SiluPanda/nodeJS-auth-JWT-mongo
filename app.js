const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

dotenv.config();

const app = express();


mongoose.connect(process.env.MONGO_URI)
.then((res) => {
    app.listen(process.env.PORT || 5000, () => console.log(`server started`));
    console.log("connected to database");
})
.catch((err) => console.log(`unable to connect to database, reason: ${err}`));


app.use(express.json())
app.use("/auth", authRouter)
app.use("/user", userRouter)


app.use(function (err, req, res, next) {
    console.error(err.stack)
    return res.status(500).json({
        message: "unexpected internal server error"
    })
})

app.get("/ping", async (request, response) => {
    return response.send({
        message: "server is healthy"
    })
});







