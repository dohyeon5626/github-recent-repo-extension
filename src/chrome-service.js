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

let removeRepo = (watcher, user, repo) => {
    getUserRepoList(watcher, (infoMap, userRepoInfoList) => {
        userRepoInfoList = userRepoInfoList.filter(repoInfo => repoInfo.repo != repo && repoInfo.user != user);

        infoMap.set(watcher, userRepoInfoList);
        setUserRepoList(infoMap, () => {
            document.getElementById("box-" + user + "-" + repo).replaceWith("");
            if (userRepoInfoList.length == 0) {
                document.getElementById("date-clear-box").replaceWith("");
            }
        });
    })
}