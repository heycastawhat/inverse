// image go bye bye
document.getElementById("zapClick").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: enableClickToZap
    });

window.close();
});

// image go hi hi
document.getElementById("resetClick").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: restoreImages
    });

window.close();
});

function enableClickToZap() {
    document.body.style.cursor = "crosshair";

    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.transition = 'opacity 0.3s';
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.display = 'none';
                this.setAttribute('data-zapped', 'true');
            }, 300);
        }, { once: true, capture: true });

        img.style.outline = "2px solid red";
        img.style.cursor = "pointer";
    });
}





// issues (found by amp) FIX 
// The function `enableZap` is passed to executeScript but is not defined in this file. This will cause a ReferenceError at runtime.
// Fix: Define `function enableZap() { ... }` within this file before referencing it.