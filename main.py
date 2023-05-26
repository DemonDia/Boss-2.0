from flask import Flask, request, jsonify
from seeding import processAndLoadData


app = Flask(__name__)
data = []

@app.route("/")
def home():
    return "Server is alive"

@app.route("/data")
def getData():
    
    return jsonify(data)


# GET
# POST
# PUT
# DELETE


if __name__ == "__main__":
    data = processAndLoadData()
    app.run(debug=True)
