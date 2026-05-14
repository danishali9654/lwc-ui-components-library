import { LightningElement, track, api } from 'lwc';

export default class parent extends LightningElement {
    @api startDate;
    @api endDate;
    @track selectedRange = ''; // For tab A
    showCustomDatePicker = false;

    updateLabel() {
        const selectedRange = this.selectedRange;
        const dateLabel = this.template.querySelector('.dateLabel');
        if (selectedRange && dateLabel) {
            dateLabel.textContent = selectedRange;
        }
    }


    connectedCallback() {
        // Ensure internal state is set from API properties when component is created
        if (this.startDate) {
            this._startDate = this.startDate;
        }
        if (this.endDate) {
            this._endDate = this.endDate;
        }
    }
    handleRangeApply(event) {
        debugger
        const { startDate, endDate } = event.detail;
        // Helper to format date as DD-MM-YYYY
        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const d = new Date(dateStr);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        };

        let rangeString = '';
        if (startDate && endDate && startDate !== endDate) {
            rangeString = `${formatDate(startDate)} to ${formatDate(endDate)}`;
        } else if (startDate) {
            rangeString = formatDate(startDate);
        }
        this.selectedRange = rangeString;
        this.startDate = startDate;
        this.endDate = endDate;
        this.showCustomDatePicker = false;
        // this.dipatchFiltersEventTomain('filterchange');
        this.updateLabel();
    }
    handleRangeClear() {
        this.selectedRange = '';
        this.startDate = '';
        this.endDate = '';
        this.showCustomDatePicker = false;
        // this.dispatchFiltersEventToMain('filterchange');
    }
    // updateLabel(event) {
    //     const selectedRange = event.target.value; // Now expecting a range string
    //     console.log(`Selected Range is ${selectedRange}`);
    //     const dateLabel = this.template.querySelector('.dateLabel');
    //     if (selectedRange && dateLabel) {
    //         dateLabel.textContent = selectedRange;
    //     }
    // }

    openDate(event) {
        event.preventDefault();
        event.stopPropagation();
        this.showCustomDatePicker = !this.showCustomDatePicker;
    }
    closeCustomDatePicker() {
        this.showCustomDatePicker = false;
    }

}