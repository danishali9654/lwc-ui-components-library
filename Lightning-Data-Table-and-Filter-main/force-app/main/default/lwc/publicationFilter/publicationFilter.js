import { LightningElement, track } from 'lwc';

export default class PublicationFilter extends LightningElement {
    @track selectedMonth = '';
    @track selectedYear = '';
    @track companyName = '';

    get monthOptions() {
        return [
            { label: 'All Months', value: 'All' },
            { label: 'January', value: 'January' },
            { label: 'February', value: 'February' },
            { label: 'March', value: 'March' },
            { label: 'April', value: 'April' },
            { label: 'May', value: 'May' },
            { label: 'June', value: 'June' },
            { label: 'July', value: 'July' },
            { label: 'August', value: 'August' },
            { label: 'September', value: 'September' },
            { label: 'October', value: 'October' },
            { label: 'November', value: 'November' },
            { label: 'December', value: 'December' }
        ];
    }


    get yearOptions() {
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 10 }, (_, i) => {
            const year = currentYear - i;
            return { label: year.toString(), value: year.toString() };
        });
        return [{ label: 'All Years', value: 'All' }, ...years];
    }



    handleCompanyChange(event) {
        this.companyName = event.target.value;
        this.dispatchFilterEvent();
    }

    handleMonthChange(event) {
        this.selectedMonth = event.detail.value;
        this.dispatchFilterEvent();
    }


    handleYearChange(event) {
        this.selectedYear = event.detail.value;
        this.dispatchFilterEvent();
    }


    dispatchFilterEvent() {
        const filterDetails = {
            companyName: this.companyName,
            month: this.selectedMonth === 'All' ? null : this.selectedMonth,
            year: this.selectedYear === 'All' ? null : this.selectedYear
        };
        this.dispatchEvent(new CustomEvent('filterchange', { detail: filterDetails }));
    }

}