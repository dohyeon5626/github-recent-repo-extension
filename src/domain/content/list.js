let button = getFeedButtonTagElement("History");
appendFeedLiTagElement(button);
let panel = getPanelTagElement();
applyFeedButtonClick();

getUserRepoList((repoList) => {
    panel.innerHTML = getNoRenderingRepoListTag(repoList);
    document.querySelector("tab-container").appendChild(panel);
    replaceNoRenderingRepoListTag(repoList);
    applyRepoHistorySearch(repoList);

    if (repoList.length != 0) {
        applyClearButtonEvent(panel);
    }
})