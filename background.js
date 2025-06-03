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
// Determine page by url and show popup 
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if(tab.url && changeInfo.status == "complete"){
		if(tab.url.includes("sci-hub")){
			sendActionMessage("show_on_sci_hub_popup");
		}
		else if(isPusblisherURL(tab.url)){
			sendActionMessage("show_on_publisher_popup");
		}
	}
});
// Check is page url is a publisher
function isPusblisherURL(url){
	if(url.includes("wiley") || url.includes("sciencedirect") || url.includes("mdpi") || url.includes("nature")|| url.includes("hindawi")|| url.includes("tandf")){
		if(url.includes("sci-hub") || url.includes("google.")){
			return false;
		}
		return true;
	}
	return false;
}
// Right click selected and open article on sci-hub
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "sciHopSelection",
		title: "Sci-Hop this → %s",
		contexts: ["selection"]
	});
});
// Send message when context menu clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
	if(info.menuItemId == "sciHopSelection"){
		searchDOI(info.selectionText);
	}
});
// Send messages
function sendActionMessage(message, data = ""){
	chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tab){
        chrome.tabs.sendMessage(
            tab[0].id, {action: message, cargo: data}
        );
    });
}
// Listen to messages
chrome.runtime.onMessage.addListener((request, sender) => {
	if (request.action == "sci-hop-current-window") {
		sciHopCurrentURL();
	}
});
