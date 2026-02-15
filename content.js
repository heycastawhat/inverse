const zapped = JSON.parse(localStorage.getItem('inverse-zapped') || '[]');
if (zapped.length > 0) {
    document.querySelectorAll("img").forEach(img => {
        if (zapped.includes(img.src)) {
            img.style.display = 'none';
            img.setAttribute('data-zapped', 'true');
        }
    });
}
