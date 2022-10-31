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