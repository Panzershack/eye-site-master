import express from "express";
import cors from "cors";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { Consultation } from "./models/consultationModel.js";
import consultationsRoute from "./routes/consultationsRoutes.js"
import inquiriesRouter from "./routes/inquiriesRoute.js"
import suppliersRouter from "./routes/suppliersRoute.js"
import employeeRouter from "./routes/employeeRoute.js"
import ItemRouter from "./routes/itemsRoute.js"

const app = express();

app.use(express.json()); //middleware to parsing request body as a json

app.use(cors());//allow all origins with default of cors

//or to allow custom

// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome to Consultationstore');
});

app.use('/consultations', consultationsRoute); //middleware to use routes
app.use("/inquiries", inquiriesRouter);
app.use("/suppliers", suppliersRouter);
app.use("/employees", employeeRouter);
app.use("/items", ItemRouter);





mongoose
.connect(mongoURL)
.then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log("App is running on port 5555");
    });

})
.catch((error) => {
    console.log(error);
});