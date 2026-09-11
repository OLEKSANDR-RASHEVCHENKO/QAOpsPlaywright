//const ExcelJs = require("exceljs");

//const workBook = new ExcelJs.Workbook();

/*workBook.xlsx
    .readFile("C:/Users/OleksandrRashevchenk/Downloads/exceldownloadTest.xlsx")
    .then(function () {
        const worksheet = workBook.getWorksheet("Sheet1");

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNummer) => {
                if (cell.value === "Apple") {

                    console.log(rowNumber);
                    console.log(colNummer);
                }
            });
        });

        //Reread apple to Iphone
        const cell = worksheet.getCell(3, 4);
        cell.value = "Iphone";
        workBook.xlsx
            .writeFile("C:/Users/OleksandrRashevchenk/Downloads/exceldownloadTest.xlsx")
            .then(function () {
            });
    });
*/

//Можно еще вот так вот сделать
const{test, expect} = require("@playwright/test");
const ExcelJS = require("exceljs");


async function writeExcelTest(searchText,replaceText,change,filePath) {

    
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet("Sheet1");

      const output = await readExcel(worksheet,searchText);

    //Reread apple to Iphone
        const cell = worksheet.getCell(output.row, output.column+change.colChange);
        cell.value = replaceText;
       await workbook.xlsx
            .writeFile(filePath)
}

async function readExcel(worksheet,searchText){
    let output = {row:-1,column:-1}
        worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, columnNumber) => {

            if (cell.value === searchText) {

                    output.row = rowNumber;
                    output.column = columnNumber;
                }
        });
    });
    return output;
}
//excelTest().catch(console.error);
//writeExcelTest("Republick",355,{rowChange:0,colChange:2},"C:/Users/OleksandrRashevchenk/Downloads/ExcelTest.xlsx")
test('Upload download excel validation', async({page})=>{
const textSearch = "Mango";
const updateValue = "355";
await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
const downloadPromise =  page.waitForEvent("download");
await page.getByRole("button",{name:'Download'}).click();
const download = await downloadPromise;

const filePath =
    "C:/Users/OleksandrRashevchenk/Downloads/download.xlsx";

await download.saveAs(filePath);
await writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"C:/Users/OleksandrRashevchenk/Downloads/download.xlsx");
await page.locator("#fileinput").click();
await page.locator("#fileinput").setInputFiles("C:/Users/OleksandrRashevchenk/Downloads/download.xlsx");
const textLocator = page.getByText(textSearch);
const designerRow = page.getByRole('row').filter({has: textLocator});
await expect(designerRow.locator("#cell-4-undefined")).toContainText(updateValue);



})