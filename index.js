// ==================imports==================
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// ==================configure a[p settings==================
app.use(cors());
app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

// ==================connect to mongoose==================
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected");
    } catch (error) {
        console.log(error);
    }
}

// ==================use the routes==================
// =========test routes=========
app.get("/", (req, res) => {
    res.send("OK");
});
app.use("/mods", require("./Routes/ModRoutes"));

// ==================port listeneer==================
app.listen(8000, async () => {
    await connect();
    console.log("OK");
});
