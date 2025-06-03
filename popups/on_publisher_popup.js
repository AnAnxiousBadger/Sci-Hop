const copyScitationButton = document.getElementById("sci-hop-action-button");

copyScitationButton.addEventListener("click", async function(){
    try {
        sendMessage("sci-hop-current-window");
    } catch (error) {
        alert(error);
    }
;})

const closeOnSciHopPopupButton = document.getElementById("sci-hop-close-icon");

closeOnSciHopPopupButton.addEventListener("click", function(){
    document.getElementById("sci-hop-popup-container").style.display = "none";
})