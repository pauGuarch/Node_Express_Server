import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = 3000;
const host = "localhost";

console.log(`Your port is ${port}`);
app.listen(port,()=>console.log(`Server is running on http://${host}:${port}`));

