const zapped = JSON.parse(localStorage.getItem('inverse-zapped') || '[]');

function hideZapped(img) {
    if (zapped.includes(img.src)) {
        img.style.display = 'none';
        img.setAttribute('data-zapped', 'true');
    }
}

if (zapped.length > 0) {
    document.querySelectorAll("img").forEach(hideZapped);

    new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeName === 'IMG') hideZapped(node);
                if (node.querySelectorAll) {
                    node.querySelectorAll('img').forEach(hideZapped);
                }
            }
        }
    }).observe(document.body, { childList: true, subtree: true });
}
