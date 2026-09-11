class LoginPage {
constructor(page){
    this.page = page;
    this.userEmail =  page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.signlnbutton = page.locator("#login");
}
async goTo(){
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")
}
async validLogin (user__name, passsword){
    await this.userEmail.fill(user__name)
    await this.password.fill(passsword);
    await this.signlnbutton.click();
    await this.page.waitForLoadState("networkidle");
    
}


}
module.exports = {LoginPage};