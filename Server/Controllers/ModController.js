const Mod = require("../Models/ModModel");

// =========================Helper functions=========================

// =========================Read=========================

// get everything
const getAllMods = async (req, res) => {
    try{
        console.log("LOADING....")
        data = await Mod.find();
        console.log("Loaded")
        return res.json({
            data,
        });
    }
    catch(e){
        console.log(e)
        return res.status(500).json({ message: "Something went wrong" });
    }

};

// get prof names for each term
const getProfNamesTerm = async (req, res) => {
    const { year, term } = req.params;
    try {
        const selectedProfs = await Mod.find(
            { Term: year + " Term " + term },
            { Instructor: 1 }
        ).distinct("Instructor");
        return res.json({
            data: selectedProfs,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// get mod names for each term
const getModNamesTerm = async (req, res) => {
    // const start = Date.now();
    const { year, term } = req.params;
    try {
        const selectedMods = await Mod.find(
            { Term: year + " Term " + term },
            { Description: 1 }
        ).distinct("Description");
        return res.json({
            data: selectedMods,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// get mod codes for each teerm
const getModsCodesTerm = async (req, res) => {
    const { year, term } = req.params;
    try {
        const selectedMods = await Mod.find(
            { Term: year + " Term " + term },
            { Description: 1 }
        ).distinct("Course_Code");
        if (selectedMods.length === 0) {
            return res.status(404).json({
                message: "No records found",
            });
        }
        return res.json({
            data: selectedMods,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// get average median for each mod for given prof
const getAverageMedianMod = async (req, res) => {
    const { round, window, code, prof } = req.params;
    try {
        console.log(`Round ${round} Window ${window}`);
        const selectedMods = await Mod.find(
            {
                Course_Code: code,
                Bidding_Window: `Round ${round} Window ${window}`,
                Instructor: prof,
            },
            { Median_Bid: 1, Term: 1 }
        );
        if (selectedMods.length === 0) {
            return res.status(404).json({
                message: "No records found",
            });
        }
        let medians = [];
        selectedMods.forEach((mod) => {
            const { Median_Bid, Term } = mod;
            medians.push({ Median_Bid, Term });
        });
        return res.json({
            data: medians,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// get average median for each mod based on prof
const getAverageMedianProfMod = async (req, res) => {
    const { round, window, code } = req.params;
    console.log(round);
    try {
        console.log(`Round ${round} Window ${window}`);
        const selectedMods = await Mod.find(
            {
                Course_Code: code,
                Bidding_Window: `Round ${round} Window ${window}`,
            },
            { Median_Bid: 1, Term: 1, Instructor: 1 }
        );
        if (selectedMods.length === 0) {
            return res.status(404).json({
                message: "No records found",
            });
        }
        let medians = [];
        let data = {};
        selectedMods.forEach((mod) => {
            const { Median_Bid, Term, Instructor } = mod;
            medians.push({ Median_Bid, Term, Instructor });
            if (Instructor in data) {
                data[Instructor].push({ Median_Bid, Term });
            } else {
                data[Instructor] = [{ Median_Bid, Term }];
            }
        });
        return res.json({
            data,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    getAllMods,
    getProfNamesTerm,
    getModNamesTerm,
    getModsCodesTerm,
    getAverageMedianMod,
    getAverageMedianProfMod,
};
