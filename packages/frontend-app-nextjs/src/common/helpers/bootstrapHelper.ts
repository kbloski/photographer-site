export function manualDropModalBootstrap( modalElement : HTMLElement){
    modalElement?.classList.remove('show');
    const modalBackDrop = document.querySelectorAll('.modal-backdrop');
    modalElement.style.display = 'none'
    for(const element of modalBackDrop){
        element.remove();
    }
}