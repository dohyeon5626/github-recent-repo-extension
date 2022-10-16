let aTagList = document.getElementsByTagName("a");
for (let i=0; i<aTagList.length; i++) {
    aTagList[i].onclick = () => {
        let metaTag = document.querySelector("meta[name=octolytics-actor-login]");
        let info = aTagList[i].href.split('/');
        let user = info[3];
        let repo = info[4].split((/[!,@,#,$,%,^,&,*,(,),+,?,>,<,~,₩]/g))[0];

        if (metaTag != undefined && aTagList[i].href.indexOf("https://github.com/") != -1 && user != undefined && repo != undefined) {
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