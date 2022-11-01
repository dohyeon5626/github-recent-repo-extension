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