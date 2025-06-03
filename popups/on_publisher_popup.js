const copyScitationButton = document.getElementById("sci-hop-action-button");

copyScitationButton.addEventListener("click", async function(){
    try {
        sendMessage("sci-hop-current-window");
    } catch (error) {
        alert(error);
    }
    
;})