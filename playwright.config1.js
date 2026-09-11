// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';
import { use } from 'react';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries : 1,

  timeout: 300 * 1000,  //for evrystep
  expect :{ // for assertion global
    timeout: 15000
  },
  reporter : "html",
  projects:[

    /*{
      name : 'safari execution',
      use: {
    browserName: "webkit",
    headless : true,
    actionTimeout: 10*1000,// for each step timeout
    navigationTimeout:30*1000,
    screenshot : 'on',
    trace: 'on' // ord retain.on-failure
  }
},*/
  {
    name :"chromium execution ",
    use: {
    browserName: "chromium",
    headless : false,
    actionTimeout: 10*1000,// for each step timeout
    navigationTimeout:30*1000,
    screenshot : 'on',
    video:"retain-on-failure",
    ignoreHttpsErrors:true,
    permissions:["geolocation"],
    trace: 'on' ,// ord retain.on-failure
    //viewport : {width:720,height:720}
    //...devices["BlackBerry Z30 landscape"]
  }
  
    }
  ]

 
});

module.exports = config;

