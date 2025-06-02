// Liten to background actions
chrome.runtime.onMessage.addListener(
	function (request, sender){
		if (request.action == "get_citation"){
            parseCleanDOI();
		}
        else if(request.action == "show_on_sci_hub_popup"){
            injectPopupHTML();
        }
	}
);

/*function parseAndCopyCitation(citationText) {

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

function parseCleanDOI(){
	const doiDiv = document.getElementById("doi");
    const DOIString = doiDiv.innerText;
	fetchDOIMetaData(DOIString);
}
function fetchDOIMetaData(DOI){
    const apiURL = `https://api.crossref.org/works/${DOI}`;
    fetch(apiURL).then(response => response.json()).then(data => {
        /*const title = data.message.title[0];
        const year = data.message.issued["date-parts"][0][0];
        const author = data.message.author[0].family;
        const journal = data.message["container-title"][0];*//*

        const metadata = {
            year: data.message.issued["date-parts"][0][0],
            title: data.message.title[0],
            author: data.message.author[0].family,
            journal: data.message["container-title"][0],
            doi: DOI,
            url: `https://sci-hub.se/${DOI}`
        };
        console.log(metadata);
        return metadata;
    })
}
function copyDataToClipboard(year, title, author){

}*/

async function injectPopupHTML() {
    const url = chrome.runtime.getURL("popups/on_sci_hub_popup.html");
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

    const copyIcon = document.getElementById("sci-hop-copy-icon");
    copyIcon.src = chrome.runtime.getURL("icons/copy_icon.svg");
    const sciHopIcon = document.getElementById("sci-hop-icon");
    sciHopIcon.src = chrome.runtime.getURL("sci_hop_icon.png");
    const closeIcon = document.getElementById("sci-hop-close-icon");
    closeIcon.src = chrome.runtime.getURL("icons/close_icon.svg");


  // Load the popup script (e.g. popup/popup.js) if needed
  /*const script = document.createElement("script");
  script.src = chrome.runtime.getURL("popup/popup.js");
  document.body.appendChild(script);*/
}