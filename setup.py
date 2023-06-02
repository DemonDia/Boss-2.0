from dotenv import load_dotenv
import os
from pymongo import MongoClient 
load_dotenv()
connectionString = os.getenv("MONGODB_URL")
client = MongoClient(connectionString)
dbs = client.list_database_names()
testDb = client.test

collections = testDb.list_collection_names()
modsCollection = testDb.mods


def insertTest():
    # collection = testDb.test
    testDoc = {"name":"tim",
               "type":"test"}
    insertedId = modsCollection.insert_one(testDoc).inserted_id
    print(insertedId)

if __name__ == "__main__":
    insertTest()

