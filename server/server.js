const express = require("express");
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const connectToDatabase = require("./configs/db")
const Routes = require("./Routes")
const cookieParser = require("cookie-parser");


//initialize expree app
const app = express()

dotenv.config()

//connecting database
connectToDatabase()

//middlewares
app.use(bodyParser.json({
    limit: "30mb", extended: true
}))

app.use(bodyParser.urlencoded({
    limit: "30mb", extended: true
}))

app.use(cookieParser());

//including other routes
app.use("/auth", Routes.authRouter)
app.use("/users", Routes.userRouter)

app.listen(process.env.PORT, (error) =>{
    if (error)
        console.log("Server unable to start: ", error)

    console.log(`Sever is running on port: ${process.env.PORT}` )
})