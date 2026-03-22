require ('dotenv').config();
const app = require('./src/app');
// let port = 3000;

const connectDB = require('./src/db/db')

connectDB();

const PORT = process.env.PORT || 3000;




app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})