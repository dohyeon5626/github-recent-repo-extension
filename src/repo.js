fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json")
    .then((response) => response.json())
    .then((data) => {
        let color = data;
        let metaTag = document.querySelector("meta[name=octolytics-actor-login]");

        if (metaTag != undefined) {
            let info = location.href.split('/');
            let user = info[3];
            let repo = info[4];
            let watcher = metaTag.content;

            chrome.storage.sync.get(['history'], function(result) {
                let urlMap = result.history != undefined ? new Map(Object.entries(result.history)) : new Map();

                let userUrlList = urlMap.get(watcher);
                userUrlList = userUrlList != undefined ? userUrlList : [];
                for (let i=0; i<userUrlList.length; i++) {
                    if (userUrlList[i].user == user && userUrlList[i].repo == repo) {
                        userUrlList.splice(i, 1);
                    }
                }
                fetch("https://api.github.com/repos/" + user + "/" + repo)
                    .then((response) => response.json())
                    .then((data) => {
                        let languageColor = color[data.language];
                        userUrlList.unshift({
                            user: user,
                            repo: repo,
                            language: data.language,
                            languageColor: languageColor != undefined ? languageColor.color : undefined,
                            description: data.description,
                            star: data.stargazers_count
                        });
                        urlMap.set(watcher, userUrlList);
            
                        chrome.storage.sync.set({history: Object.fromEntries(urlMap)});
                    });
            });
        }
    });