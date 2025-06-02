// Main extension button - open article on sci-hub
chrome.action.onClicked.addListener(function() {
	sciHopCurrentURL();
});
// Main extension shortcut - open article on sci-hub
chrome.commands.onCommand.addListener((command) => {
  if (command === "sci_hop") {
	sciHopCurrentURL();
  }
});
// Get current URL and search it on sci-hub
function sciHopCurrentURL(){
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url;
      searchDOI(currentUrl);
    });
}
// Open given DOI on sci-hub
function searchDOI(DOI){
	targetURL = encodeURI("https://sci-hub.se/" + DOI);
	chrome.tabs.create({
		"url": targetURL
	});
}


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("sci-hub")) {
    //chrome.action.setPopup({ tabId: tabId, popup: "popups/on_sci_hub_popup.html" });
	chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tab){
        chrome.tabs.sendMessage(
            tab[0].id, {action: "show_on_sci_hub_popup"}
        );
    });
  } else {
    //chrome.action.setPopup({ tabId: tabId, popup: "" });
  }
});
/*
// Right click selected and open article on sci-hub
chrome.contextMenus.create({
	title: 'Sci-Hop this → %s',
	contexts: ['selection'],
	onclick: searchSelectedDOI
});

// Right click and copy citation
chrome.contextMenus.create({
	title: 'Copy Scitation',
	contexts: ['all'],
	onclick: copyCitation
});

// Listen to found citation message
/*chrome.runtime.onMessage.addListener(
	function (request, sender) {
		if (request.citationText) {
			console.log("citation text is: " + request.citationText);
		}
	}
);*/
/*
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("sci-hub")) {
    //chrome.action.setPopup({ tabId: tabId, popup: "popups/on_sci_hub_popup.html" });
	chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tab){
        chrome.tabs.sendMessage(
            tab[0].id, {action: "show_on_sci_hub_popup"}
        );
    });
  } else {
    //chrome.action.setPopup({ tabId: tabId, popup: "" });
  }
});

// FUNCTIONS
function searchSelectedDOI(info){
	searchDOI(info.selectionText);
}*/

/*
function copyCitation(ocClickData, tab){
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tab){
        chrome.tabs.sendMessage(
            tab[0].id, {action: "get_citation"}
        );
    });  
}*/

