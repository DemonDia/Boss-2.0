const Mod = require("../Models/ModModel");

// =========================Helper functions=========================

// =========================Read=========================
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

const getAverageMedianMod = async (req, res) => {
    const { term, year, round, window, code, prof } = req.params;
    console.log({ term, year, round, window, code, prof } );
    try {
        console.log(`Round ${round} Window ${window}`);
        const selectedMods = await Mod.find(
            {
                Course_Code: code,
                Bidding_Window: `Round ${round} Window ${window}`,
                Instructor: prof,
            },
            { Median_Bid: 1 }
        );
        if (selectedMods.length === 0) {
            return res.status(404).json({
                message: "No records found",
            });
        }
        let medians = [];
        selectedMods.forEach((mod) => {
            medians.push(mod.Median_Bid);
        });
        return res.json({
            data: medians,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    getProfNamesTerm,
    getModNamesTerm,
    getModsCodesTerm,
    getAverageMedianMod,
};
