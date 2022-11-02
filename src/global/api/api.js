let getRepoInfo = (user, repo, successCallback, failCallback) => {
    chrome.runtime.sendMessage({
        action: "getRepoCache",
        user: user,
        repo: repo
    }, (data) => {
        if (data != null) {
            successCallback(data);
        }
        else {
            getToken((token) => {
                fetch("https://api.github.com/repos/" + user + "/" + repo, {
                    method: 'get',
                    headers: new Headers({
                        "Authorization": `token ${token}`,
                    })
                }).then((response) => response.json())
                    .then((data) => {
                        if (data.message === "Bad credentials") {
                            fetch("https://api.github.com/repos/" + user + "/" + repo)
                                .then((response) => response.json())
                                .then((data) => {
                                    if (data.message === undefined) {
                                        chrome.runtime.sendMessage({
                                            action: "setRepoCache",
                                            user: user,
                                            repo: repo,
                                            data: data
                                        }, () => {
                                            successCallback(data); 
                                        });
                                    }
                                    else {
                                        failCallback();
                                    }
                                });
                        }
                        else if (data.message === undefined) {
                            chrome.runtime.sendMessage({
                                action: "setRepoCache",
                                user: user,
                                repo: repo,
                                data: data
                            }, () => {
                                successCallback(data); 
                            });
                        }
                        else {
                            failCallback();
                        }
                    });
            });
        }
    });
}