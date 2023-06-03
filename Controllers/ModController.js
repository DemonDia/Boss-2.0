const Mod = require("../Models/ModModel");

// =========================Helper functions=========================

// =========================Read=========================
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
        return res.json({
            data: selectedMods,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const getAveragePriceMod = async (req, res) => {
    const [round, window, code] = req.params;
};

module.exports = { getModNamesTerm, getModsCodesTerm };
