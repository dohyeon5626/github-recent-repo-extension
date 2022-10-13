let metaTag = document.querySelector("meta[name=octolytics-actor-login]");

if (metaTag != undefined) {
    let info = location.href.split('/');
    let user = info[3];
    let repo = info[4];
    let watcher = metaTag.content;

    getUserRepoList(watcher, (infoMap, userRepoInfoList) => {
        userRepoInfoList = userRepoInfoList.filter(repoInfo => repoInfo.repo != repo && repoInfo.user != user);
        userRepoInfoList.unshift({
            user: user,
            repo: repo
        });
        infoMap.set(watcher, userRepoInfoList.splice(0, 30));
        setUserRepoList(infoMap);
    });
}