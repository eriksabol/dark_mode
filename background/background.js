console.log("coming from background.js");

let background = {
  buttonOn: "",
  init: () => {
    let color = "#3aa757";

    chrome.runtime.onInstalled.addListener(() => {
      chrome.storage.sync.set({ color });

      console.log("Default background color set to %cgreen", `color: ${color}`);
    });

    // listen to any messgaes and route them to functions
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log("message recieved", request);
      if (request.fn in background) {
        background[request.fn](request, sender, sendResponse);
      }
    });
  },
  setButtonOn: (request, sender, sendResponse) => {
    console.log("setting buttonOn ", request.state);
    this.buttonOn = request.state;
  },

  getButtonOn: (request, sender, sendResponse) => {
    sendResponse(this.buttonOn);
  },
};

// background startup
background.init();
