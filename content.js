// Liten to background actions
chrome.runtime.onMessage.addListener(
	async function (request, sender){
        if(request.action == "show_on_sci_hub_popup"){
            await injectPopupHTML();
            injectOnSciHubPopupElements();
        }
        else if(request.action == "show_on_publisher_popup"){
            await injectPopupHTML();
            injectOnPublisherPopupElements();
        }
	}
);
// Listen to injected script messages
window.addEventListener( "message", function(event){
    if (event.source !== window) return;
	if (event.data.action == "sci-hop-current-window") {
		chrome.runtime.sendMessage({ action: event.data.action });
	}
});
// Inject popup window
async function injectPopupHTML() {
    const prevElement = document.getElementById("sci-hop-popup-container");
    if(prevElement){
        prevElement.remove();
    }
    const url = chrome.runtime.getURL("popups/sci_hop_popup.html");
    const response = await fetch(url);
    const html = await response.text();

    const container = document.createElement("div");
    container.id = "sci-hop-popup-container";
    container.innerHTML = html;
    document.body.appendChild(container);

    const styleURL = chrome.runtime.getURL("popups/style.css");

    const cssLinkElement = document.createElement("link");
    cssLinkElement.rel = "stylesheet";
    cssLinkElement.type = "text/css";
    cssLinkElement.href = styleURL;
    document.head.appendChild(cssLinkElement);

    const fontLinkElement1 = document.createElement("link");
    fontLinkElement1.rel = "preconnect";
    fontLinkElement1.href = "https://fonts.googleapis.com";
    document.head.appendChild(fontLinkElement1);

    const fontLinkElement2 = document.createElement("link");
    fontLinkElement2.rel = "preconnect";
    fontLinkElement2.href = "https://fonts.gstatic.com";
    fontLinkElement2.crossOrigin = "anonymus"
    document.head.appendChild(fontLinkElement2);

    const fontLinkElement3 = document.createElement("link");
    fontLinkElement3.rel = "stylesheet";
    fontLinkElement3.href = "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
    document.head.appendChild(fontLinkElement3);

    const sciHopIcon = document.getElementById("sci-hop-icon");
    sciHopIcon.src = chrome.runtime.getURL("sci_hop_icon.png");
    const closeIcon = document.getElementById("sci-hop-close-icon");
    closeIcon.src = chrome.runtime.getURL("icons/close_icon.svg");
}
// Inject sci-hub specific popup elements
function injectOnSciHubPopupElements(){
    
    const copyIcon = document.getElementById("sci-hop-button-icon");
    copyIcon.src = chrome.runtime.getURL("icons/copy_icon.svg");
    const popupScript = document.createElement("script");
    popupScript.src = chrome.runtime.getURL("popups/on_sci_hub_popup.js");
    document.body.appendChild(popupScript);

    const utilsScript = document.createElement("script");
    utilsScript.src = chrome.runtime.getURL("utils.js");
    document.body.appendChild(utilsScript);

    document.getElementById("sci-hop-doi").innerHTML = parseCleanDOI();
    document.getElementById("sci-hop-doi").style.display = "block";

    document.getElementById("sci-hop-article-ask").style.display = "none";

    document.getElementById("sci-hop-button-text").innerText = "copy Scitation";
}
// Inject publisher specific popup elements
function injectOnPublisherPopupElements(){
    const copyIcon = document.getElementById("sci-hop-button-icon");
    copyIcon.src = chrome.runtime.getURL("icons/new_tab_icon.svg");
    const popupScript = document.createElement("script");
    popupScript.src = chrome.runtime.getURL("popups/on_publisher_popup.js");
    document.body.appendChild(popupScript);

    const utilsScript = document.createElement("script");
    utilsScript.src = chrome.runtime.getURL("utils.js");
    document.body.appendChild(utilsScript);

    document.getElementById("sci-hop-doi").style.display = "none";
    document.getElementById("sci-hop-article-ask").style.display = "block";

    document.getElementById("sci-hop-button-text").innerText = "Sci-Hop this article";
}