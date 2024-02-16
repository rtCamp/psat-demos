document.addEventListener('DOMContentLoaded', function() {
    const isIframe = window.self !== window.top;

    if (isIframe) {
        const mainHeader = document.querySelector('.main-header');
        const mainFooter = document.querySelector('.main-footer');
        const internalPageHeader = document.querySelector('.internal-page-header');
        const themeContainer = document.getElementById('theme-container');

        mainHeader?.remove(); 
        mainFooter?.remove();
        internalPageHeader?.remove('hidden');
        themeContainer?.classList.add('h-screen');
    }
});