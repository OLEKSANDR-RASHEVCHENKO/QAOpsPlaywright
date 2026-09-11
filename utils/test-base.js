const base= require("@playwright/test");

exports.customtest = base.test.extend(
    {
testDataForOrder :     {
    username : "rashevchenkoo@gmail.com",
    password : "Gazmanov1234",
    productname : "ZARA COAT 3"
}
    }
)