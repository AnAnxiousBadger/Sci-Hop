// Main extension button
chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tab) {
		SearchDOI(tab[0].url)
    });
});

// Right click selected
chrome.contextMenus.create({
	title: 'Sci-Hop this: %s',
	contexts: ['selection'],
	onclick: SearchDOI
});

// Right click and copy citation
chrome.contextMenus.create({
	title: 'Copy Scitation',
	contexts: ['all'],
	onclick: CopyCitation
});

// Liten to copy citation menu click message
chrome.runtime.onMessage.addListener(
	function (request, sender){
		if (request.line == "get_citation"){
			var citation = document.getElementById("citation");
			if (citation != null) {
				chrome.runtime.sendMessage({ citationText: ParseAndCopyCitation(citation.innerText) });
			} else {
				alert("No citation found");
			}
		}
	}
);

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
	SearchDOI(info.selectionText);
}
function SearchDOI(DOI){
	targetURL = encodeURI("https://sci-hub.se/" + DOI);
	chrome.tabs.create({
		"url": targetUrl
	});
}

function CopyCitation(ocClickData, tab){
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tab){
        chrome.tabs.sendMessage(
            tab[0].id, {line: "get_citation"}
        );
    });  
}

function ParseAndCopyCitation(citationText) {

    const yearMatch = citationText.match(/\((\d{4})\)/);
    const year = yearMatch ? yearMatch[1] : '';

    const titleMatch = citationText.match(/\)\. (.*?)\. /);
    const title = titleMatch ? titleMatch[1] : '';

    const authorMatch = citationText.match(/^(.*?),/);
    const lastName = authorMatch ? authorMatch[1].split(' ')[0] : '';

    const formattedText = `${year}\t${title}\t${lastName}`;

    navigator.clipboard.writeText(formattedText).then(() => {
        console.log("Citation: [" + formattedText + "] copied to clipboard!");
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}