// Main extension button - open article on sci-hub
chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tab) {
		SearchDOI(tab[0].url)
    });
});

// Right click selected and open article on sci-hub
chrome.contextMenus.create({
	title: 'Sci-Hop this → %s',
	contexts: ['selection'],
	onclick: SearchSelectedDOI
});

// Right click and copy citation
chrome.contextMenus.create({
	title: 'Copy Scitation',
	contexts: ['all'],
	onclick: CopyCitation
});

// Listen to found citation message
chrome.runtime.onMessage.addListener(
	function (request, sender) {
		if (request.citationText) {
			console.log("citation text is: " + request.citationText);
		}
	}
);

// FUNCTIONS
function SearchSelectedDOI(info){
	console.log("clicked on icon");
	SearchDOI(info.selectionText);
}
function SearchDOI(DOI){
	targetURL = encodeURI("https://sci-hub.se/" + DOI);
	chrome.tabs.create({
		"url": targetURL
	});
}

function CopyCitation(ocClickData, tab){
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tab){
        chrome.tabs.sendMessage(
            tab[0].id, {action: "get_citation"}
        );
    });  
}

