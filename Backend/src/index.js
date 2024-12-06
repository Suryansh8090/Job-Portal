import dotenv from "dotenv"
import connectDB  from "./db/index.js"
import { app } from "./app.js"


dotenv.config({
    path: "./src/.env"
})

// console.log("MongoDB URI:", process.env.MONGODB_URI);


// DATABSE CONNECTION 

connectDB() 
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️  Server is running on port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGODB connection failed!", err);
    
})