let feedMap = new Map();

chrome.runtime.onMessage.addListener(
    (request, sender, callback) => {
        if (request.action == "set") {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                feedMap.set(tabs[0].id, request.value);
            });
        }
        else if (request.action == "get") {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                let value = feedMap.get(tabs[0].id);
                callback(value != undefined ? value : "feed-original");
            });
        }
        return true;
    }
);