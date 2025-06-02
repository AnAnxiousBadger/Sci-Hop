// Main extension button
chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tab) {
        targetUrl = "https://sci-hub.se/" + tab[0].url;
        chrome.tabs.create({
            "url": targetUrl
        });
    });
});

// Right click selected
chrome.contextMenus.create({
	title: 'Sci-Hop this: %s',
	contexts: ['selection'],
	onclick: searchSelection
});
function searchSelection(info){
	var myQuery = encodeURI("https://sci-hub.se/" + info.selectionText);
	chrome.tabs.create({
		url: myQuery
	});
}

function SearchDOI(DOI){
	targetURL = encodeURI("https://sci-hub.se/" + DOI);
	chrome.tabs.create({
		"url": targetUrl
	});
}

// Right click and copy citation
chrome.contextMenus.create({
	title: 'Copy Scitation',
	contexts: ['all'],
	onclick: copyCitation
});

function copyCitation(){
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tab){
        chrome.tabs.sendMessage(
            tab[0].id, {line: "getcitation"}
        );
    });  
}

chrome.runtime.onMessage.addListener(
	function (request, sender) {
		if (request.cit) {
			console.log("cit is: " + request.cit);
		}
	}
);