let getUserRepoList = (watcher, callback) => {
    chrome.storage.sync.get(['history'], (result) => {
        let infoMap = result.history != undefined ? new Map(Object.entries(result.history)) : new Map();
        let userRepoInfoList = infoMap.get(watcher);
        userRepoInfoList = userRepoInfoList != undefined ? userRepoInfoList : [];
        callback(infoMap, userRepoInfoList);
    });
}

let setUserRepoList = (infoMap, callback) => {
    chrome.storage.sync.set({history: Object.fromEntries(infoMap)}, callback);
}