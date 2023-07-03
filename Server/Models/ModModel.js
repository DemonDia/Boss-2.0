const mongoose = require("mongoose");
const modSchema = mongoose.Schema({
    Term: { type: String, required: true },
    Session: { type: String, required: true },
    Bidding_Window: { type: String, required: true },
    Course_Code: { type: String, required: true },
    Description: { type: String, required: true },
    Section: { type: String, required: true },
    Vacancy: { type: Number, required: true },
    Opening_Vacancy: { type: Number, required: true },
    Before_Process_Vacancy: { type: Number, required: true },
    DICE: { type: Number, required: true },
    After_Process_Vacancy: { type: Number, required: true },
    Enrolled_Students: { type: Number, required: true },
    Median_Bid: { type: Number, required: true },
    Min_Bid: { type: Number, required: true },
    Instructor: { type: String, required: true },
    School_Department: { type: String, required: true },
});

module.exports = mongoose.model("Mods", modSchema);
