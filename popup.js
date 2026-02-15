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
                const zapped = JSON.parse(localStorage.getItem('inverse-zapped') || '[]');
                zapped.push(this.src);
                localStorage.setItem('inverse-zapped', JSON.stringify(zapped));
            }, 300);
        }, { once: true, capture: true });

        img.style.outline = "2px solid red";
        img.style.cursor = "pointer";
    });

    const zapped = JSON.parse(localStorage.getItem('inverse-zapped') || '[]');
    document.querySelectorAll("img").forEach(img => {
        if (zapped.includes(img.src)) {
            img.style.display = 'none';
            img.setAttribute('data-zapped', 'true');
        }
    });
}

function restoreImages() {
    localStorage.removeItem('inverse-zapped');
    document.querySelectorAll('img[data-zapped="true"]').forEach(img => {
        img.style.display = '';
        img.style.opacity = '';
        img.removeAttribute('data-zapped');
    });
}
