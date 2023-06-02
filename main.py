from flask import Flask, request, jsonify
from seeding import processAndLoadData
from operator import itemgetter
from setup import modsCollection

app = Flask(__name__)
data = []

rounds = ["1","1A","1B","2","2A"]
windows = ["1","2","3","4","5"]
years = ["2019-20","2020-21","2021-22","2022-23"]
terms = ["1","2","3A","3B"]

@app.route("/")
def home():
    return "Server is alive"

# ==================== Basic routes ====================
# get all the mods
@app.route("/mods")
def getData():
    return jsonify(data), 200


# get the mods in given term
@app.route("/mods/term/<term>/<year>")
def getModsByTerm(term,year):
    try:

        if term not in terms:
            return jsonify({
                "message":"Invalid term",
                "status":400
            })
        if year not in years:
            return jsonify({
                "message":"Invalid year",
                "status":400
            })
        
        currTerm = year+" Term "+term
        res = []
        # data = modsCollection.find({"Term":currTerm}).sort("Description")
        data = modsCollection.find()
        # .sort("Description")
        for row in data:
            if row["Description"] not in res and row["Term"] == currTerm:
                res.append(row.get("Description"))
        return jsonify(res)

        # return jsonify({"msg":"idkbro"})
    
    except:
        return jsonify({
            "Something went wrong", 500 
        })

#get the mods in given round
@app.route("/mods/round/<round>/<window>")
def getModsByRound(round,window):
    try:
        if round not in rounds:
            return jsonify({
                "message":"Invalid round",
                "status":400
            })
        if window not in windows:
            return jsonify({
                "message":"Invalid window",
                "status":400
            })
        currRound = "Round "+round+" Window "+window
        res = [row for row in data if row.get("Bidding_Window") == currRound]
        return jsonify(res)
    
    except:
        return jsonify({
            "Something went wrong", 500 
        })
    
# by mod name
@app.route("/mods/name/<name>")
def getModsByName(name):
    try:
        res = [row for row in data if name in row.get("Description").lower()]
        return jsonify(res)
    
    except:
        return jsonify({
            "Something went wrong", 500 
        })

# by faculty
@app.route("/mods/school/<school>")
def getModsBySchool(school):
    try:
        res = [row for row in data if school in row.get("School_Department").lower()]
        return jsonify(res)
    
    except:
        return jsonify({
            "Something went wrong", 500 
        })

# by course code
@app.route("/mods/code/<code>")
def getModsByCode(code):
    try:
        res = [row for row in data if code in row.get("Course_Code").lower()]
        return jsonify(res)
    
    except:
        return jsonify({
            "Something went wrong", 500 
        })
    
# by prof name
@app.route("/mods/prof/<prof>")
def getModsByProf(prof):
    try:
        res = [row for row in data if prof in row.get("Instructor").lower()]
        return jsonify(res)
    
    except:
        return jsonify({
            "Something went wrong", 500 
        })

# by mod name, window and term
@app.route("/mods/select")
def selectedMod():
    requestJson = request.get_json()
    print("requestJson",requestJson)
    term, year,name,round,window = itemgetter("term","year","name","round","window")(requestJson)
    try:
        currTerm = year+" Term "+term
        currRound = "Round "+round+" Window "+window

        res = [row for row in data if row.get("Bidding_Window") == currRound and row.get("Term") == currTerm and name in row.get("Description").lower()]
        return jsonify(res)
    except:
        return jsonify({
            "Something went wrong", 500 
        })

if __name__ == "__main__":
    # data = processAndLoadData()
    app.run(debug=True)
