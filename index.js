// These are built into the OS of the player
const diClass = require("@brightsign/deviceinfo");

const registryClass = require("@brightsign/registry");

var VideoModeConfigurationClass = require("@brightsign/videomodeconfiguration");
var videoConfig = new VideoModeConfigurationClass();

// External dependencies
const axios = require("axios");
const qs = require("qs");

const di = new diClass();
const registry = new registryClass();

// Reusable function to make POST call to set User Variable values
// User Variables are specific to a BrightAuthor:connected Presentation
// This is part of the Local Web Server of the player
const postToSetValues = async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:8008/SetValues",
      qs.stringify(payload),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "http://localhost:8008", // Add Referer request header
        },
        maxRedirects: 10,
      }
    );
    //console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getVideoMode = async () => {
  try {
    let currentRes = await videoConfig.getConfiguredMode();
    console.log("Current Resolution:", currentRes);
    await postToSetValues({
      // modified to just return width and height
      "bs-resolution": currentRes.width + "x" + currentRes.height,
    });
  } catch (error) {
    console.log(JSON.stringify(data));
  }
};

// Function to get the serial number, using @brightsign/deviceinfo
const getSerialNumber = async () => {
  try {
    const serialNumber = di.serialNumber;
    console.log("Serial Number:", serialNumber);
    // Set the serial number as a User Variable
    await postToSetValues({ "bs-serial-num": serialNumber });
  } catch (error) {
    console.error("Error getting serial number:", error);
  }
};

// Function to get a registry key value using @brightsign/registry
const getRegistryKey = async (section, key) => {
  try {
    const value = await registry.read(section, key);
    console.log(`Registry value for ${section}/${key}:`, value);
    // Set the registry value as a User Variable
    await postToSetValues({ "bs-description": value });
  } catch (error) {
    console.error(`Error reading registry key ${section}/${key}:`, error);
  }
};

// Main function to control the application flow
const main = async () => {
  //await getSerialNumber();
  await getRegistryKey("networking", "ud");
  await getVideoMode();
};

// Run the main function
main();
