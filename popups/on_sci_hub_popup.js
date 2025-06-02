const copyScitationButton = document.getElementById("sci-hop-copy-scitation-button");

copyScitationButton.addEventListener("click", async function(){
    const DOI = parseCleanDOI();
    const metadata = await fetchDOIMetaData(DOI);
    copyDataToClipboard(metadata);
;})

const closeOnSciHopPopupButton = document.getElementById("sci-hop-close-icon");

closeOnSciHopPopupButton.addEventListener("click", function(){
    document.getElementById("sci-hop-popup-container").style.display = "none";
})
