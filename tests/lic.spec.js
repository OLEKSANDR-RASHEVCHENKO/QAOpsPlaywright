const{test, expect} = require("@playwright/test");
const { exec } = require("node:child_process");

test("Playwright special locators test" , async({page})=>
{
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Female");
await page.getByPlaceholder("Password").fill("Gazmanov1234");
await page.getByRole("button",{name:'Submit'}).click();

//await page.getByText("Success! The Form has been submitted successfully!.").isVisible();// only checkt if it visible, get true or false

//5 second default timeout for expect assertion
//await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible(); // assertion
//will wait what  i fill
await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10_000});

await page.getByRole("link",{name:'Shop'}).click();
await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

//locators(css) waitFor()

});



test("Test Lavel Timeout" , async({page})=>
{

test.setTimeout(60000);
const slowExpect = expect.configure({timeout : 9000});//assertion wait for test
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Female");
await page.getByPlaceholder("Password").fill("Gazmanov1234");
await page.getByRole("button",{name:'Submit'}).click();

//await page.getByText("Success! The Form has been submitted successfully!.").isVisible();// only checkt if it visible, get true or false

//5 second default timeout for expect assertion
//await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible(); // assertion
//will wait what  i fill
await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

await page.getByRole("link",{name:'Shop'}).click();
await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");
//2 more
await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

//locators(css) waitFor()

});