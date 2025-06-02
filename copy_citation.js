chrome.runtime.onMessage.addListener(
	function (request, sender){
		if (request.line == "getcitation"){
			var citation = document.getElementById("citation");
			if (citation != null) {
				chrome.runtime.sendMessage({ cit: parseAndCopy(citation.innerText) });
			} else {
				alert("No citation found");
			}
		}
	}
);

function parseAndCopy(text) {

    const yearMatch = text.match(/\((\d{4})\)/);
    const year = yearMatch ? yearMatch[1] : '';

    const titleMatch = text.match(/\)\. (.*?)\. /);
    const title = titleMatch ? titleMatch[1] : '';

    const authorMatch = text.match(/^(.*?),/);
    const lastName = authorMatch ? authorMatch[1].split(' ')[0] : '';

    const formattedText = `${year}\t${title}\t${lastName}`;

    navigator.clipboard.writeText(formattedText).then(() => {
        console.log("Citation: [" + formattedText + "] copied to clipboard!");
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}