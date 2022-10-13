let getLanguageColor = (callback) => {
    fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json")
        .then((response) => response.json())
        .then((data) => callback(data));
}

let getRepoInfo = (user, repo, callback) => {
    fetch("https://api.github.com/repos/" + user + "/" + repo)
        .then((response) => response.json())
        .then((data) => callback(data));
}