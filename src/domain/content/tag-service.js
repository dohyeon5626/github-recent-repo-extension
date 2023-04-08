let appendFeedLiTagElement = (feedButton) => {
    let li = document.createElement('li');
    li.setAttribute("role", "presentation");
    li.setAttribute("data-view-component", "true");
    li.classList.add("d-inline-flex");
    li.appendChild(feedButton);
    document.querySelector("ul.UnderlineNav-body.list-style-none").appendChild(li);
}

let getFeedButtonTagElement = (buttonText) => {
    let button = document.createElement('button');
    button.innerText = buttonText;
    button.id = "feed-history";
    button.setAttribute("type", "button");
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", "panel-3");
    button.setAttribute("data-view-component", "true");
    button.classList.add("UnderlineNav-item");
    button.setAttribute("aria-selected", "false");
    button.setAttribute("tabindex", "-1");
    return button;
}

let getPanelTagElement = () => {
    let panel = document.createElement('div');
    panel.id = "panel-3";
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("tabindex", "0");
    panel.hidden = true;
    panel.setAttribute("labelledby", "feed-history");
    panel.setAttribute("data-view-component", "true");
    return panel;
}

let applyFeedButtonClick = () => {
    document.getElementById("feed-original").onclick = () => {
        chrome.runtime.sendMessage({
            action: "setFeed",
            value: "feed-original"
        });
    };
    document.getElementById("feed-next").onclick = () => {
        chrome.runtime.sendMessage({
            action: "setFeed",
            value: "feed-next"
        });
    };
    document.getElementById("feed-history").onclick = () => {
        chrome.runtime.sendMessage({
            action: "setFeed",
            value: "feed-history"
        });
        document.querySelector("div.UnderlineNav-actions.js-feedback-link.d-flex").hidden = true;
    };
    chrome.runtime.sendMessage({
        action: "getFeed"
    }, (id) => {
        let button = document.getElementById(id);
        button.style.border = "none";
        button.style.outline = "none";
        button.click();
    });
}

let getDateClearBoxTag = () => `
    <div id="date-clear-box" class="d-flex flex-items-baseline" style="display: none!important; padding-top:16px; padding-bottom:8px; justify-content: space-between">
        <input type="text" id="repo-history-search" class="form-control input-block" placeholder="Find a recent repository history…">
        <button id="clear-button" class="btn btn-sm ml-2 btn-danger" style="height: 32px">clear</button>
    </div>
    `;

let applyRepoHistorySearch = (userRepoInfoList) => {
    let input = document.getElementById("repo-history-search");
    if (input != undefined) {
        input.onkeyup = () => {
            for (let i=0; i<userRepoInfoList.length; i++) {
                let user = userRepoInfoList[i].user;
                let repo = userRepoInfoList[i].repo;
                let repoTag = document.getElementById(`box-${user}-${repo}`);
                if (repoTag != undefined) {
                    if (user.toUpperCase().includes(input.value.toUpperCase()) || repo.toUpperCase().includes(input.value.toUpperCase())) {
                        repoTag.style.display = "block";
                    }
                    else {
                        repoTag.style.display = "none";
                    }
                }
            }
        }
    }
}

let getRepoDescriptionTag = (repoDescription) =>
    repoDescription != undefined ? `
        <div class="dashboard-break-word color-fg-muted mt-1 mb-0 repo-description">
            <p>${repoDescription}</p>
        </div>
    ` : "";

let getRepoLanguageTag = (repoLanguageColor, repoLanguage) =>
    repoLanguage != undefined ? `
        <span class="d-inline-block color-fg-muted mr-3">
            <span class="ml-0">
                <span class="repo-language-color" style="background-color: ${repoLanguageColor}"></span>
                <span itemprop="programmingLanguage">${repoLanguage}</span>
            </span>
        </span>
    ` : "";

let getPublicRepoTag = (user, repo, repoDescription, repoLanguageColor, repoLanguage, repoStarAmount) =>
    user != undefined && repo != undefined ? `
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
                    ${getRepoDescriptionTag(repoDescription)}
                    <p class="f6 color-fg-muted mt-2 mb-0">
                        ${getRepoLanguageTag(repoLanguageColor, repoLanguage)}
                        <span class="d-inline-block mr-3">
                            <a class="Link--muted" href="/${user}/${repo}/stargazers">
                                <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                </svg>
                                ${abbreviateNumber(repoStarAmount)}
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    ` : "";

let getNoRenderingRepoTag = (user, repo) =>
    user != undefined && repo != undefined ? `
        <div id="box-${user}-${repo}" class="py-2"></div>
    ` : "";

let getNoRenderingRepoListTag = (userRepoInfoList) => {
    let list = userRepoInfoList.length != 0 ? getDateClearBoxTag() : "";
    for (let i=0; i<userRepoInfoList.length; i++) {
        let user = userRepoInfoList[i].user;
        let repo = userRepoInfoList[i].repo;
        list += getNoRenderingRepoTag(user, repo);
    }
    return list;
}

let getEmojiTag = (repoInfo) => `
    <g-emoji class="g-emoji" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/${repoInfo.unicode}.png">
        ${repoInfo.emoji}
    </g-emoji>`;

let replaceNoRenderingRepoListTag = (userRepoInfoList) => {
    document.getElementById("feed-history").onclick = () => {
        let length = userRepoInfoList.length;
        let clearBox = document.getElementById("date-clear-box");
        for (let i=0; i<length; i++) {
            let user = userRepoInfoList[i].user;
            let repo = userRepoInfoList[i].repo;
            getRepoInfo(user, repo, (repoInfo) => {
                    clearBox.style.display = "flex";
                    let languageColor = getColor(repoInfo.language);
                    let description = repoInfo.description;
                    if (description != undefined) {
                        let emojis = description.match(/:.*:/g);
                        if (emojis != null) {
                            for (let i=0; i<emojis.length; i++) {
                                let emoji = getEmoji(emojis[i]);
                                if (emoji != undefined) {
                                    description = description.replace(emojis[i], getEmojiTag(emoji));
                                }
                            }
                        }
                    }

                    document.getElementById("box-" + user + "-" + repo).outerHTML = getPublicRepoTag(user, repo, description, languageColor, repoInfo.language, repoInfo.stargazers_count);
                    document.getElementById("delete-" + user + "-" + repo).onclick = () => {
                        removeRepo(user, repo, () => {
                            length--;
                            document.getElementById("box-" + user + "-" + repo).replaceWith("");
                            if (length == 0) {
                                document.getElementById("date-clear-box").replaceWith("");
                            }
                        });
                    }
                },
                () => {
                    length--;
                    document.getElementById("box-" + user + "-" + repo).outerHTML = "";
                    if (length == 0) {
                        document.getElementById("date-clear-box").replaceWith("");
                    }
                }
            );
        }  
    };
}

let applyClearButtonEvent = (panel) => {
    document.getElementById("clear-button").onclick = () => {
        getUserRepoList(() => {
            setUserRepoList([], () => {
                panel.innerHTML = "";
            });
        });
    };
}

let abbreviateNumber = (value) => {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}