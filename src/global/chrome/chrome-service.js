let getUserRepoList = (callback) => {
    chrome.storage.sync.get(['history'], (result) => {
        let repoList = result.history != undefined ? result.history : [];
        callback(repoList);
    });
}

let setUserRepoList = (repoList, callback) => {
    chrome.storage.sync.set({history: repoList}, callback);
}

let removeRepo = (user, repo, callback) => {
    getUserRepoList((repoList) => {
        repoList = repoList.filter(repoInfo => repoInfo.repo != repo || repoInfo.user != user);
        setUserRepoList(repoList, callback);
    });
}

let getToken = (callback) => {
    chrome.storage.sync.get(['token'], (result) => {
        callback(result.token);
    });
}

let setToken = (token, callback) => {
    chrome.storage.sync.set({token: token}, callback);
}