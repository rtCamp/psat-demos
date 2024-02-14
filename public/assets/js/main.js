document.addEventListener('DOMContentLoaded', function() {
    const isIframe = window.self !== window.top;

    if (isIframe) {
        const mainHeader = document.querySelector('.main-header');
        const mainFooter = document.querySelector('.main-footer');
        const internalPageHeader = document.querySelector('.internal-page-header');

        mainHeader?.remove(); 
        mainFooter?.remove();
        internalPageHeader?.remove('hidden');
    }
});