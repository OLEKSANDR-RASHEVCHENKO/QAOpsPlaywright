// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { use } from 'react';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  workers : 3, // parallel ausführung 

  timeout: 300 * 1000,  //for evrystep
  expect :{ // for assertion global
    timeout: 15000
  },
  reporter : "html",


  use: {
    browserName: "chromium",
    headless : false,
    actionTimeout: 10*1000,// for each step timeout
    navigationTimeout:30*1000,
    screenshot : 'on',
    trace: 'on', // ord retain.on-failure
  },


 
});

module.exports = config;

