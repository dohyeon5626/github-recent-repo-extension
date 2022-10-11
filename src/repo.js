let metaTag = document.querySelector("meta[name=octolytics-actor-login]");

if (metaTag != undefined) {
    let info = location.href.split('/');
    if (info.length <= 5) {
        let user = info[3];
        let repo = info[4];
        let languageTag = document.querySelector("a.d-inline-flex.flex-items-center.flex-nowrap.Link--secondary.no-underline.text-small.mr-3");
        let languageColor = languageTag != undefined ? languageTag.querySelector("svg.octicon.octicon-dot-fill.mr-2").style.color : undefined;
        let language = languageTag != undefined ? languageTag.querySelector("span.color-fg-default.text-bold.mr-1").textContent : undefined;

        let descriptionTag = document.querySelector("p.f4.my-3");
        let description = descriptionTag != undefined ? descriptionTag.textContent : undefined;
        let star = document.querySelector("a.Link--muted > strong").textContent;

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
            userUrlList.unshift({
                user: user,
                repo: repo,
                language: language,
                languageColor: languageColor,
                description: description,
                star: star
            });
            urlMap.set(watcher, userUrlList);

            chrome.storage.sync.set({history: Object.fromEntries(urlMap)});
        });
    }
}