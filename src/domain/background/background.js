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

let registRepo = () => {
    let metaTag = document.querySelector("meta[name=octolytics-actor-login]");
    let info = location.href.split('/');
    if (info.length >= 5) {
        let user = info[3];
        let repo = info[4].split((/[!,@,#,$,%,^,&,*,(,),+,?,>,<,~,₩]/g))[0];

        if (metaTag != undefined != -1 && user != undefined && repo != undefined) {
            let watcher = metaTag.content;

            getUserRepoList(watcher, (infoMap, userRepoInfoList) => {
                userRepoInfoList = userRepoInfoList.filter(repoInfo => repoInfo.repo != repo || repoInfo.user != user);
                userRepoInfoList.unshift({
                    user: user,
                    repo: repo
                });
                infoMap.set(watcher, userRepoInfoList.splice(0, 30));
                setUserRepoList(infoMap);
            });
        }
    }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        if(changeInfo.url.includes("https://github.com")) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: registRepo
            });
        }
    }
});