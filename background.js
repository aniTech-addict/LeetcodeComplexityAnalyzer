console.log("Background script loaded");

function sendMessage(tabId, message, options){
    console.log("Attempting to send message to tab", tabId, ":", message);
    chrome.tabs.sendMessage(tabId, message, options)
        .then(response => {
            console.log("Message sent successfully to tab", tabId, "response:", response);
        })
        .catch(error => {
            console.error("Failed to send message to tab", tabId, ":", error);
        });
}
function getProblemName(tab) {
    if (tab.url && tab.url.includes("leetcode.com/problems/")) {
        const urlParts = tab.url.split("/");
        const problemName = urlParts[4];
        console.log("Extracted problem name:", problemName, "for tab", tab.id);
        sendMessage(tab.id, {type: "problemName", data: problemName});
        
    } else {
        console.log("Tab URL does not match LeetCode problem page:", tab.url);
    }
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        getProblemName(tab);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        getProblemName(tab);
    }
});