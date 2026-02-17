const zapped = JSON.parse(localStorage.getItem('inverse-zapped') || '[]');
const blockedSites = JSON.parse(localStorage.getItem('inverse-blocked-sites') || '[]');
const siteBlocked = blockedSites.includes(location.hostname);

function shouldHide(img) {
    return siteBlocked || zapped.includes(img.src);
}

function hideImg(img) {
    if (shouldHide(img)) {
        img.style.display = 'none';
        img.setAttribute('data-zapped', 'true');
    }
}

function scanAll() {
    document.querySelectorAll("img").forEach(hideImg);
}

if (siteBlocked || zapped.length > 0) {
    scanAll();

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === 'attributes' && mutation.target.nodeName === 'IMG') {
                hideImg(mutation.target);
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.nodeName === 'IMG') hideImg(node);
                if (node.querySelectorAll) {
                    node.querySelectorAll('img').forEach(hideImg);
                }
            }
        }
    });

    const target = document.body || document.documentElement;
    observer.observe(target, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src']
    });

    // catch SPAs that rebuild the DOM after navigation
    window.addEventListener('load', scanAll);
    document.addEventListener('DOMContentLoaded', scanAll);
}
