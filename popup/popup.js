import { injectCSS } from "./helpers.js";

let app = {
  init: () => {
    // cache some element references
    const darkmode_toggle = document.getElementById("invert-toggle");
    const html = document.getElementById("my-body");

    chrome.runtime.sendMessage({ fn: "getButtonOn" }, (response) => {
      darkmode_toggle.checked = response;
    });

    chrome.storage.sync.get("color", ({ color }) => {
      html.style.backgroundColor = color;
    });

    darkmode_toggle.addEventListener("click", () => {
      if (darkmode_toggle.checked) {
        injectCSS(`html {
          filter: none;
      }`);
        injectCSS(`img, image, video {
        filter: none;
    }`);
        console.log("buttonOn ", darkmode_toggle.checked);
        chrome.runtime.sendMessage({
          fn: "setButtonOn",
          state: darkmode_toggle.checked,
        });
      } else {
        injectCSS(`html {
        filter: invert(1) hue-rotate(180deg);
    }`);
        injectCSS(`img, image, video {
    filter: invert(1) hue-rotate(180deg);
    }`);
        console.log("buttonOn ", darkmode_toggle.checked);
        chrome.runtime.sendMessage({
          fn: "setButtonOn",
          state: darkmode_toggle.checked,
        });
      }
    });
  },
};

//app start
document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
