import { LightningElement, api } from 'lwc';
export default class CstmModal extends LightningElement {
@api isOpen = false;
@api modalTitle = 'Modal Title';
@api customModal; // Property to receive class name from parent component.
@api modalClass; // Property to receive class name from parent component.
@api showCloseButton = false; 

        get customModal() {
            return this.isOpen ? `modal open ${this.modalClass}` : `modal closed ${this.modalClass}`;
        }
    handleClose(){
        this.dispatchEvent(new CustomEvent('close'));
    }
}