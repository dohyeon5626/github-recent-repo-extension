let registRepo = () => {
    let userInfo = document.querySelector("a.url.fn");
    let repoInfo = document.querySelector("strong.mr-2.flex-self-stretch > a");
    if (userInfo != undefined && repoInfo != undefined) {
        let user = userInfo.textContent;
        let repo = repoInfo.textContent;

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