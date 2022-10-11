let getRepoTag = (user, repo, repoDescription, repoLanguageColor, repoLanguage, repoStarAmount) => {
    let descriptionTag = "";
    if (repoDescription != undefined) {
        descriptionTag = `
            <div class="dashboard-break-word color-fg-muted mt-1 mb-0 repo-description">
                <p>${repoDescription}</p>
            </div>
        `;
    }

    let languageTag = "";
    if (repoLanguage != undefined) {
        languageTag = `
            <span class="d-inline-block color-fg-muted mr-3">
                <span class="ml-0">
                    <span class="repo-language-color" style="background-color: ${repoLanguageColor}"></span>
                    <span itemprop="programmingLanguage">${repoLanguage}</span>
                </span>
            </span>
        `;
    }

    return `
    <div id="box-${user}-${repo}" class="py-2">
        <div class="Box p-3">
            <div>
                <div class="f4 lh-condensed text-bold color-fg-default">
                    <a class="Link--primary text-bold no-underline wb-break-all d-inline-block" href="/${user}/${repo}">${user}/${repo}</a>
                    <button id="delete-${user}-${repo}" class="d-flex BtnGroup float-right js-toggler-container SelectMenu-closeButton js-social-container" type="button" aria-label="Close menu">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
                            <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
                        </svg>
                    </button>
                </div>
                ${descriptionTag}
                <p class="f6 color-fg-muted mt-2 mb-0">
                    ${languageTag}
                    <span class="d-inline-block mr-3">
                        <a class="Link--muted" href="/${user}/${repo}/stargazers">
                            <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                                <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                            </svg>
                            ${repoStarAmount}
                        </a>
                    </span>
                </p>
            </div>
        </div>
    </div>
    `;
}

let metaTag = document.querySelector("meta[name=octolytics-actor-login]");
if (metaTag != undefined) {
    let li = document.createElement('li');
    li.setAttribute("role", "presentation");
    li.setAttribute("data-view-component", "true");
    li.classList.add("d-inline-flex");

    let button = document.createElement('button');
    button.innerText = "History";
    button.id = "feed-history";
    button.setAttribute("type", "button");
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", "panel-3");
    li.setAttribute("data-view-component", "true");
    button.classList.add("UnderlineNav-item");
    button.onclick = () => {
        document.querySelector("div.UnderlineNav-actions.js-feedback-link.d-flex").hidden = true;
    }
    li.setAttribute("aria-selected", "false");
    li.setAttribute("tabindex", "-1");
    li.appendChild(button);
    document.querySelector("ul.UnderlineNav-body.list-style-none").appendChild(li);

    let panel = document.createElement('div');
    panel.id = "panel-3";
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("tabindex", "0");
    panel.hidden = true;
    panel.setAttribute("labelledby", "feed-history");
    panel.setAttribute("data-view-component", "true");

    let watcher = metaTag.content;
    chrome.storage.sync.get(['history'], (result) => {
        let urlMap = result.history != undefined ? new Map(Object.entries(result.history)) : new Map();
        let userUrlList = urlMap.get(watcher);
        userUrlList = userUrlList != undefined ? userUrlList : [];

        if (userUrlList != undefined && userUrlList.length != 0) {
            let listHtml = `
            <div id="date-clear-box" class="d-flex flex-items-baseline" style="padding-top:16px; padding-bottom:8px; justify-content: space-between">
                <div style="disply: inline">
                    Updated on
                    <b>${
                        new Date().toLocaleDateString("en-us", {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })
                    }</b>
                </div>
                <button id="clear-button" class="btn btn-sm ml-2 btn-danger">clear</button>
            </div>
            `;

            for (let i=0; i<userUrlList.length; i++) {
                let user = userUrlList[i].user;
                let repo = userUrlList[i].repo;
                let repoDescription = userUrlList[i].description;
                let repoLanguageColor = userUrlList[i].languageColor;
                let repoLanguage = userUrlList[i].language;
                let repoStarAmount = userUrlList[i].star;
                listHtml += getRepoTag(user, repo, repoDescription, repoLanguageColor, repoLanguage, repoStarAmount);
            }
            panel.innerHTML = listHtml;
            document.querySelector("tab-container").appendChild(panel);
            document.getElementById("clear-button").onclick = () => {
                chrome.storage.sync.get(['history'], (result) => {
                    let keys = Object.keys(result);
                    chrome.storage.sync.remove(keys, () => {
                        panel.innerHTML = "";
                    });
                });
            };
            for (let i=0; i<userUrlList.length; i++) {
                let user = userUrlList[i].user;
                let repo = userUrlList[i].repo;
                document.getElementById("delete-" + user + "-" + repo).onclick = () => {
                    chrome.storage.sync.get(['history'], function(result) {
                        let urlMap = result.history != undefined ? new Map(Object.entries(result.history)) : new Map();
            
                        let userUrlList = urlMap.get(watcher);
                        userUrlList.splice(i, 1);
                        urlMap.set(watcher, userUrlList);
            
                        chrome.storage.sync.set({history: Object.fromEntries(urlMap)}, () => {
                            document.getElementById("box-" + user + "-" + repo).replaceWith("");
                            if (userUrlList.length == 0) {
                                document.getElementById("date-clear-box").replaceWith("");
                            }
                        });
                    });
                }
            }
        }
    });
}