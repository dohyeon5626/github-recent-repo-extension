let aTagList = document.getElementsByTagName("a");
for (let i=0; i<aTagList.length; i++) {
    aTagList[i].onclick = () => {
        getLanguageColor((color) => {
                let metaTag = document.querySelector("meta[name=octolytics-actor-login]");
                let info = aTagList[i].href.split('/');
                let user = info[3];
                let repo = info[4];

                if (metaTag != undefined && aTagList[i].href.indexOf("https://github.com/") != -1 && user != undefined && repo != undefined) {
                    let watcher = metaTag.content;

                    getUserRepoList(watcher, (infoMap, userRepoInfoList) => {
                        userRepoInfoList = userRepoInfoList.filter(repoInfo => repoInfo.repo != repo && repoInfo.user != user);
                        getRepoInfo(user, repo, (repoInfo) => {
                            if (repoInfo.stargazers_count != undefined) {
                                let languageColor = color[repoInfo.language];
                                userRepoInfoList.unshift({
                                    user: user,
                                    repo: repo,
                                    language: repoInfo.language,
                                    languageColor: languageColor != undefined ? languageColor.color : undefined,
                                    description: repoInfo.description,
                                    star: repoInfo.stargazers_count
                                });
                                infoMap.set(watcher, userRepoInfoList.splice(0, 30));
                                setUserRepoList(infoMap);
                            }
                        });
                    });
                }
            });
    }
}