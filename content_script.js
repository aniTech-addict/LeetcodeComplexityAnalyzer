console.log("Content script loaded on LeetCode problem page");
(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log("Message received in content script:", message);
        if(message.type === "problemName"){
            console.log(message.data);
        }
        sendResponse({status: "success", messageType: message.type});
    });
})()