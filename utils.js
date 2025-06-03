// Get clean DOI from sci-hub page
function parseCleanDOI(){
	const doiDiv = document.getElementById("doi");
    const DOIString = doiDiv.innerText;
    return DOIString;
}
// Get metadata of article
async function fetchDOIMetaData(DOI){
    const apiURL = `https://api.crossref.org/works/${DOI}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    const metadata = {
            year: data.message.issued["date-parts"][0][0],
            title: data.message.title[0],
            author: data.message.author[0].family,
            journal: data.message["container-title"][0],
            doi: DOI,
            url: `https://sci-hub.se/${DOI}`
        };
        return metadata;
}
// Copy the metadata to clipboard
function copyDataToClipboard(metadata){
    const clipboardText = `${metadata.year}\t${metadata.title}\t${metadata.author}\t${metadata.journal}`;
    navigator.clipboard.writeText(clipboardText);
}