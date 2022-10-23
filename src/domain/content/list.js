let metaTag = document.querySelector("meta[name=octolytics-actor-login]");
if (metaTag != undefined) {
    let button = getFeedButtonTagElement("History");
    appendFeedLiTagElement(button);
    let panel = getPanelTagElement();
    applyFeedButtonClick();
    let watcher = metaTag.content;

    getUserRepoList(watcher, (infoMap, userRepoInfoList) => {
        panel.innerHTML = getNoRenderingRepoListTag(userRepoInfoList);
        document.querySelector("tab-container").appendChild(panel);
        applyRepoHistorySearch(userRepoInfoList);
        getLanguageColor((color) => replaceNoRenderingRepoListTag(userRepoInfoList, color, watcher));

        if (userRepoInfoList.length != 0) {
            applyClearButtonEvent(panel, watcher);
        }
    })
}