let metaTag = document.querySelector("meta[name=octolytics-actor-login]");
if (metaTag != undefined) {
    let button = getFeedButtonTagElement("History");
    appendFeedLiTagElement(button);
    let panel = getPanelTagElement();
    let watcher = metaTag.content;

    getUserRepoList(watcher, (infoMap, userRepoInfoList) => {
        panel.innerHTML = getRepoListTag(userRepoInfoList);
        document.querySelector("tab-container").appendChild(panel);
        if (userRepoInfoList.length != 0) {
            applyClearButtonEvent(panel, watcher);
            applyDeleteButtonEvent(userRepoInfoList, watcher);
        }
    })
}