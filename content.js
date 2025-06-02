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

function parseAndCopyCitation(citationText) {

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
        const journal = data.message["container-title"][0];*/

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

}

async function injectPopupHTML() {
  const url = chrome.runtime.getURL("popups/on_sci_hub_popup.html");
  const response = await fetch(url);
  const html = await response.text();

  const container = document.createElement("div");
  container.id = "popup-container";
  container.innerHTML = html;
  document.body.appendChild(container);

  // Load the popup script (e.g. popup/popup.js) if needed
  /*const script = document.createElement("script");
  script.src = chrome.runtime.getURL("popup/popup.js");
  document.body.appendChild(script);*/
}