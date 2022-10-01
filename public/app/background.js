// activate extension when host is www.website.com
chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
				conditions: [new chrome.declarativeContent.PageStateMatcher({
					pageUrl: {hostEquals: 'www.amazon.com'},
				})
			],
		    actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
   // Send a message to the active tab
   chrome.tabs.query({active: true, currentWindow:true},function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
        chrome.tabs.executeScript(activeTab.id,{file: './app/getAveragePrices.js', allFrames: true}, (averagePriceDOM) => {
         chrome.tabs.sendMessage(activeTab.id, {
            "message": "getSource",
            source: averagePriceDOM
        });
      });
   });
});
