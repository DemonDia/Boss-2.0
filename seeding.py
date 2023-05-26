import os
import openpyxl
import pandas as pd
folder = "./testdata"
extension = "xlsx"

def loadWorkbook(excelSheetName,data):
    df = pd.read_excel(excelSheetName)
    df.to_dict(orient='records')

    for col in df.columns:
        df.rename(columns={col:col.replace("/"," ").replace(" ","_")},inplace=True)

    for index, row in df.iterrows():
        currRow = row.to_dict()
        data.append(currRow)


def changeExtension(item):
    root, xtension = os.path.splitext(item.path)
    if xtension != extension:
        xtension = extension
        newPath = root+"."+xtension
        os.rename(item.path, newPath)
        print("Changed")
    else:
        print("No need to change")

def processFiles():
    with os.scandir(folder) as fileOrFolder:
        for item in fileOrFolder:
            if item.is_file():
                changeExtension(item)
    os.chdir(folder)


def loadData():    
    data = []
    files = os.listdir()
    fileNo = 1
    for file in files:
        print("Processing ",fileNo,"/",len(files))
        if file != ".DS_Store.xlsx":
            loadWorkbook(file,data)
        fileNo += 1
    os.chdir("..")
    return data

def processAndLoadData():
    processFiles()
    data = loadData()
    # print(data[0])
    return data

if __name__ == "__main__":
    data = processAndLoadData()
    print(len(data))

    

