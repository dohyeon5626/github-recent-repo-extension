chrome.omnibox.onInputChanged.addListener(
    (text, suggest) => {
        getUserRepoList((repoList) => {
            let repoSuggest = [];
            for (let i=0; i<repoList.length; i++) {
                let repo = repoList[i].repo;
                let user = repoList[i].user;

                if (user.toUpperCase().includes(text.toUpperCase()) || repo.toUpperCase().includes(text.toUpperCase())) {
                    repoSuggest.push(
                        {content: `https://github.com/${user}/${repo}`, description: `${user} / ${repo}`}
                    )
                }
            }
            suggest(repoSuggest);
        })
    });

chrome.omnibox.onInputEntered.addListener((text) => {
    if (text.includes("https://github.com")) {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.update(tabs[0].id, {url: text});
        });
    }
    else {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.update(tabs[0].id, {url: "https://github.com/dohyeon5626/recent-repo-extension"});
        });
    }
});