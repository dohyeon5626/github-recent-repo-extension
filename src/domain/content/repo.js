let info = location.href.split('/');
let user = info[3];
let repo = info[4].split((/[!,@,#,$,%,^,&,*,(,),+,?,>,<,~,₩]/g))[0];

getUserRepoList((repoList) => {
    repoList = repoList.filter(repoInfo => repoInfo.repo != repo || repoInfo.user != user);
    repoList.unshift({
        user: user,
        repo: repo
    });
    setUserRepoList(repoList.splice(0, 30));
});