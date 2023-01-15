chrome.commands.onCommand.addListener((command) => {
    if(command === "move-history") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                setFeed(tabs[0].id, "feed-history");
                chrome.tabs.update(tabs[0].id, {url: "https://github.com"});
            });
        });
    }
});