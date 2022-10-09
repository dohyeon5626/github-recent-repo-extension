let metaTag = document.querySelector("meta[name=octolytics-actor-login]");

if (metaTag != undefined) {
    let info = location.href.split('/');
    let user = info[3];
    let repo = info[4];
    let repoUrl = "/" + user + "/" + repo;
    let watcher = metaTag.content;

    chrome.storage.sync.get(['history'], function(result) {
        let urlMap = result.history != undefined ? new Map(Object.entries(result.history)) : new Map();
        console.log(urlMap);

        let userUrlList = urlMap.get(watcher);
        userUrlList = userUrlList != undefined ? userUrlList : [];
        userUrlList.unshift(repoUrl);
        urlMap.set(watcher, userUrlList);

        chrome.storage.sync.set({history: Object.fromEntries(urlMap)});
    });
}