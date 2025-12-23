console.log("Background script loaded");

function checkLeetCodeProblem(tab) {
    if (tab.url && tab.url.includes("leetcode.com/problems/")) {
        const urlParts = tab.url.split("/");
        const problemName = urlParts[4];
        console.log("LeetCode problem:", problemName);
    }
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        checkLeetCodeProblem(tab);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        checkLeetCodeProblem(tab);
    }
});