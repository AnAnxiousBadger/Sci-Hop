// Liten to copy citation menu click message
chrome.runtime.onMessage.addListener(
	function (request, sender){
		if (request.action == "get_citation"){
            ParseCleanDOI();
			/*var citation = document.getElementById("citation");
			if (citation != null) {
				chrome.runtime.sendMessage({ citationText: ParseAndCopyCitation(citation.innerText) });
			} else {
				alert("No citation found");
			}*/
		}
	}
);

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

function ParseCleanDOI(){
	const doiDiv = document.getElementById("doi");
    const DOIString = doiDiv.innerText;
	FetchDOIMetaData(DOIString);
}
function FetchDOIMetaData(DOI){
    const apiURL = `https://api.crossref.org/works/${DOI}`;
    fetch(apiURL).then(response => response.json()).then(data => {
        const title = data.message.title[0];
        const year = data.message.issued["date-parts"][0][0];
        console.log(year);
    })
}
function CopyDataToClipboard(year, title, author){

}