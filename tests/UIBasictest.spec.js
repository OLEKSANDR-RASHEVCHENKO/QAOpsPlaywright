const{test, expect} = require("@playwright/test");
const { request } = require("node:http");

test
("Browser context Playwright test" , async({browser})=>
{

const context = await browser.newContext();
const page = await context.newPage();
page.route('**/*.css',route => route.abort());//Блокируем юай тоесть тест будет рабоать без css
const userName = page.locator('#username');
const passWord = page.locator('#password');
const signIn =page.locator('#signInBtn');
const cardTitles = page.locator(".card-body a");
page.on('request',request=> console.log(request.url())); //Возвращает все реквесты и респонсы 
page.on('response',response=> console.log(response.status()));//Возвращает респонсы

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

await userName.fill("rahulshetty");
await passWord.fill("Learning@830$3mK2");
await signIn.click();
console.log (await page.locator('[style*="block"]').textContent());
await expect(await page.locator('[style*="block"]')).toContainText("Incorrect username/password.");

//fill expected login Data
await userName.fill("");
await userName.fill("rahulshettyacademy");
await passWord.fill("Learning@830$3mK2");
await signIn.click();
console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(1).textContent());
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);



});


test("UI Cintrols" , async({page})=>
{
const userName = page.locator('#username');
const passWord = page.locator('#password');
const dropdown = page.locator("select.form-control");
const documentLink = page.locator("[href*='documents-request']");
const signIn =page.locator('#signInBtn');
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

await userName.fill("rahulshetty");
await passWord.fill("Learning@830$3mK2");
await dropdown.selectOption("consult");
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
//assertion that radio btn is selected
await expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked;
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy();
//await page.pause();
await expect(documentLink).toHaveAttribute("class","blinkingText");



});


test("Child window hindling" , async({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink = page.locator("[href*='documents-request']");
const userName = page.locator('#username');

const [newPage]=await Promise.all(
[
     context.waitForEvent("page"),//listen for any new page pending,rejected,fulfilled
     documentLink.click(),

])//new page is opened

const text = await newPage.locator(".red").textContent();
const arrayLiest = text.split("@");
const domain  =  arrayLiest[1].split(" ")[0]
console.log(domain);

//Switch window
await userName.fill(domain);
console.log(await userName.inputValue());
await page.pause();



});


