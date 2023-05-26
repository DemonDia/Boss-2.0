from flask import Flask, request, jsonify

app = Flask(__name__)
data = {}

@app.route("/")
def home():
    return "Server is alive"


# GET
# POST
# PUT
# DELETE


if __name__ == "__main__":
    app.run(debug=True)
