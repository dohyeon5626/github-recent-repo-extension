let getLanguageColor = (callback) => {
    getToken((token) => {
        fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json")
            .then((response) => response.json())
            .then((data) => callback(data));
    });
}

let getRepoInfo = (user, repo, callback) => {
    getToken((token) => {
        fetch("https://api.github.com/repos/" + user + "/" + repo, {
            method: 'get',
            headers: new Headers({
                "Authorization": `token ${token}`,
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.stargazers_count === undefined) {
                fetch("https://api.github.com/repos/" + user + "/" + repo)
                    .then((response) => response.json())
                    .then((data) => {
                        callback(data);
                    });
            }
            else {
                callback(data)
            }
        });
    });
}