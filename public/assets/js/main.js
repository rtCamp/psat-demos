document.addEventListener('DOMContentLoaded', function() {
    const isIframe = window.self !== window.top;

    if (isIframe) {
        const mainHeader = document.querySelector('.main-header');
        const mainFooter = document.querySelector('.main-footer');

        mainHeader?.remove(); 
        mainFooter?.remove(); 
    }
});