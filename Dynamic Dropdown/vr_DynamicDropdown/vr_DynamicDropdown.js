import { LightningElement, api, track } from 'lwc';
import ProcessFlowNew from '@salesforce/resourceUrl/ProcessFlowNew';
const icons = {
    dropDownArrow : ProcessFlowNew + '/SVG/dropdownarrow.svg',
}
export default class Vr_DynamicDropdown extends LightningElement {
    @api label = '';
    @api placeholder = 'Select option';
    @api fieldApiName = '';
    @api isRequired = false;

    @track _options = [];
    _selectedValue = '';
    @track selectedLabel = '';
    @track isOpen = false;
    @track hasError = false;
    icons=icons;
    @api
    set options(val) {
        if (val && Array.isArray(val) && val.length > 0) {
            let foundLabel = this.selectedLabel;
            this._options = val.map(item => {
                let isSelected = (this._selectedValue === item.value) || (this._selectedValue === item.label);
                if (isSelected) {
                    let constructedLabel = [];
                    if (item.label) constructedLabel.push(item.label);
                    if (item.linkLabel) constructedLabel.push(item.linkLabel);
                    if (item.extraText) constructedLabel.push(item.extraText);
                    foundLabel = constructedLabel.join(' ');
                }
                return {
                    ...item,
                    checked: isSelected,
                    extraTextClass: item.extraTextClass ? item.extraTextClass : 'cstm-extra-text',
                    containerClass: `slds-media slds-listbox__option slds-listbox__option_plain slds-media_small cstm-optns ${isSelected ? 'slds-is-selected slds-has-focus' : ''}`
                };
            });
            this.selectedLabel = foundLabel;
        } else {
            this._options = [];
            this.selectedLabel = '';
        }
    }

    get options() {
        return this._options;
    }

    @api
    set selectedValue(value) {
        this._selectedValue = value;
        if (this._options && this._options.length > 0) {
            let foundLabel = '';
            this._options = this._options.map(item => {
                let isSelected = (value === item.label) || (value === item.value);
                if (isSelected) {
                    item.checked = true;
                    let constructedLabel = [];
                    if (item.label) constructedLabel.push(item.label);
                    if (item.linkLabel) constructedLabel.push(item.linkLabel);
                    if (item.extraText) constructedLabel.push(item.extraText);
                    foundLabel = constructedLabel.join(' ');
                } else {
                    item.checked = false;
                }
                item.containerClass = `slds-media slds-listbox__option slds-listbox__option_plain slds-media_small cstm-optns ${isSelected ? 'slds-is-selected slds-has-focus' : ''}`;
                return item;
            });
            this.selectedLabel = foundLabel;
        }
    }

    get selectedValue() {
        return this._selectedValue;
    }

    get dropdownClass() {
        return `slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ${this.isOpen ? 'slds-is-open' : ''}`;
    }

    get formElementClass() {
        return `slds-form-element ${this.hasError ? 'slds-has-error' : ''}`;
    }

    // get inputStyle() {
    //     return this.hasError ? 'color: red !important; border: 2px solid red; ' : 'color: #474747 !important;border: 2px solid #EBEBEB;';
    // }

    toggleDropdown(event) {
        this.isOpen = !this.isOpen;
    }

    handleBlur() {
        // Use timeout to allow click on dropdown item to register before closing
        this._blurTimeout = setTimeout(() => {
            this.isOpen = false;
        }, 200);
    }

    handleDropdownMouseDown(event) {
        // Prevent blur when clicking inside the dropdown
        event.preventDefault();
    }

    handleSelect(event) {
        if (this._blurTimeout) {
            clearTimeout(this._blurTimeout);
        }
        const selectedValue = event.currentTarget.dataset.value;
        const selectedItem = this._options.find(item => item.value === selectedValue);

        if (selectedItem) {
            this.selectedValue = selectedItem.value;
            let constructedLabel = [];
            if (selectedItem.label) constructedLabel.push(selectedItem.label);
            if (selectedItem.linkLabel) constructedLabel.push(selectedItem.linkLabel);
            if (selectedItem.extraText) constructedLabel.push(selectedItem.extraText);
            this.selectedLabel = constructedLabel.join(' ');
            this.hasError = false;
            
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    fieldApiName: this.fieldApiName,
                    value: this.selectedValue,
                    item: selectedItem
                }
            }));
        }
        this.isOpen = false;
    }

    handleLinkClick(event) {
        // If it's a link, we let it navigate but still capture the selection
        event.stopPropagation();
        
        const liElement = event.currentTarget.closest('li');
        if (liElement) {
            const selectedValue = liElement.dataset.value;
            const selectedItem = this._options.find(item => item.value === selectedValue);
            if (selectedItem) {
                this.selectedValue = selectedItem.value;
                let constructedLabel = [];
                if (selectedItem.label) constructedLabel.push(selectedItem.label);
                if (selectedItem.linkLabel) constructedLabel.push(selectedItem.linkLabel);
                if (selectedItem.extraText) constructedLabel.push(selectedItem.extraText);
                this.selectedLabel = constructedLabel.join(' ');
                this.hasError = false;
                
                this.dispatchEvent(new CustomEvent('change', {
                    detail: {
                        fieldApiName: this.fieldApiName,
                        value: this.selectedValue,
                        item: selectedItem
                    }
                }));
            }
        }
        this.isOpen = false;
    }

    @api
    checkValidity() {
        if (this.isRequired) {
            if (!this.selectedValue || this.selectedValue === 'Select option' || this.selectedValue === 'Select City' || this.selectedValue === 'Select Country' || this.selectedValue === '--None--') {
                this.hasError = true;
                return { isValid: false, fieldApiName: this.fieldApiName };
            } else {
                this.hasError = false;
                return { isValid: true, fieldApiName: this.fieldApiName };
            }
        }
        return { isValid: true, fieldApiName: this.fieldApiName };
    }
}