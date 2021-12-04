export const getCurrentTab = async () => {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

export const injectCSS = async (css) => {
  const activeTab = await getCurrentTab();
  if (!activeTab) return;
  chrome.scripting.insertCSS({
    css,
    target: { tabId: activeTab.id },
  });
};
