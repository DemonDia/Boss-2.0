from flask import Flask, request, jsonify
from seeding import processAndLoadData


app = Flask(__name__)
data = processAndLoadData()

@app.route("/")
def home():
    return "Server is alive"

@app.route("/mods")
def getData():
    return jsonify(data), 200


# get the mods in given term
@app.route("/mods/term/<term>/<year>")
def getModsByTerm(term,year):
    # print("term",term)
    years = ["2019-20","2020-21","2021-22","2022-23"]
    terms = ["1","2","3A","3B"]
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
        res = [row for row in data if row.get("Term") == currTerm]
        print(len(res))
        return jsonify({
            "data":res,
            "status":200
        })
    
    except:
        return jsonify({
            "Something went wrong", 500 
        })

#get the mods in given round
@app.route("/mods/round/<round>/<window>")
def getModsByRound(round,window):
    rounds = ["1","1A","1B","2","2A"]
    windows = ["1","2","3","4","5"]
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
        return jsonify({
            "data":res,
            "status":200
        })
    
    except:
        return jsonify({
            "Something went wrong", 500 
        })
    
@app.route("/mods/name/<name>")
def getModsByName(name):
    try:
        res = [row for row in data if name in row.get("Description").lower()]
        return jsonify({
            "data":res,
            "status":200
        })
    
    except:
        return jsonify({
            "Something went wrong", 500 
        })

if __name__ == "__main__":
    app.run(debug=True)
