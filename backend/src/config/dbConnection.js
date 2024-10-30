import mongoose from "mongoose";

const dbConnect = async() =>{
try {
   await mongoose.connect(process.env.MONGODB_URL,{
    serverSelectionTimeoutMS: 5000 

   })
    console.log('Database Connected Succesfuly')

} catch (error) {
    console.log(error.message)
    process.exit(1)
}
}
export default dbConnect