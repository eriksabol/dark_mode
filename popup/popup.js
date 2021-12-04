const darkmode_toggle = document.getElementById("invert-toggle");
const html = document.getElementById("my-body");

chrome.storage.sync.get("color", ({ color }) => {
  html.style.backgroundColor = color;
});

let buttonOn = false;

const getCurrentTab = async () => {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

const injectCSS = async (css) => {
  const activeTab = await getCurrentTab();
  if (!activeTab) return;
  chrome.scripting.insertCSS({
    css,
    target: { tabId: activeTab.id },
  });
};

darkmode_toggle.addEventListener("click", () => {
  if (buttonOn) {
    injectCSS(`html {
      filter: none;
  }`);
    injectCSS(`img, image, video {
    filter: none;
}`);
    buttonOn = false;
  } else {
    injectCSS(`html {
    filter: invert(1) hue-rotate(180deg);
}`);
    injectCSS(`img, image, video {
filter: invert(1) hue-rotate(180deg);
}`);
    buttonOn = true;
  }
});
