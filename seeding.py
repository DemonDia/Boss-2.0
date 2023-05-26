import os
import openpyxl

folder = "./testdata"
data = []
def loadWorkbook (excelSheetName):
    print("excelSheetName",excelSheetName)
    book = openpyxl.load_workbook(excelSheetName,read_only=True)
    # sheet = book.active
    # print(sheet)

def changeExtension(item):
    root, xtension = os.path.splitext(item.path)
    if xtension == ".xls":
        xtension = ".xlsx"
        newPath = root+xtension
        os.rename(item.path, newPath)
        print("Changed")
    else:
        print("No need to change")

if __name__ == "__main__":
    with os.scandir(folder) as fileOrFolder:
        for item in fileOrFolder:
            if item.is_file():
                changeExtension(item)
    
    os.chdir(folder)
    for file in os.listdir():
        print(file)
    loadWorkbook("2019-20_T1.xlsx")

    

