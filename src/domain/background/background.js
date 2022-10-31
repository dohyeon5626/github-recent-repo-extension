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
    let info = location.href.split('/');
    if (info.length >= 5) {
        let user = info[3];
        let repo = info[4].split((/[!,@,#,$,%,^,&,*,(,),+,?,>,<,~,₩]/g))[0];

        if (user != undefined && repo != undefined) {
            getUserRepoList((repoList) => {
                repoList = repoList.filter(repoInfo => repoInfo.repo != repo || repoInfo.user != user);
                repoList.unshift({
                    user: user,
                    repo: repo
                });
                setUserRepoList(repoList.splice(0, 30));
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