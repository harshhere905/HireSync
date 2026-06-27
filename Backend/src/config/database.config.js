import mongoose from 'mongoose'

const connectToDB=async()=>{
      try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database")
      }
      catch(err){
        console.log("Failed to connect Database!!",err)
      }
}

export default connectToDB