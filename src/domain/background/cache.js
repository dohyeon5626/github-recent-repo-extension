let feedMap = new Map();
let repoCache = new Map();
let colorCache;

chrome.runtime.onMessage.addListener(
    (request, sender, callback) => {
        if (request.action == "setFeed") {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                feedMap.set(tabs[0].id, request.value);
            });
        }
        else if (request.action == "getFeed") {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                let value = feedMap.get(tabs[0].id);
                callback(value != undefined ? value : "feed-original");
            });
        }
        else if (request.action == "setRepoCache") {
            repoCache.set(request.user + request.repo, request.data);
            callback();
        }
        else if (request.action == "getRepoCache") {
            callback(repoCache.get(request.user + request.repo));
        }
        return true;
    }
);