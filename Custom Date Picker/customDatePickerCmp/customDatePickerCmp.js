import { LightningElement, track, api } from 'lwc';

export default class CustomDatePickerCmp extends LightningElement {

    @track showCalendar = false;
    @track selectedDate;

    current = new Date();

    weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    @api minDate;
    @api maxDate;
    @api minYear;
    @api maxYear;
    @api daysDisabled = [];


    get formattedDate() {
        if (!this.selectedDate) return 'Select Date';
        const d = new Date(this.selectedDate);
        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    }

    get inputClass() {
        return this.selectedDate ? 'value' : 'placeholder';
    }

    get monthLabel() {
        return this.current.toLocaleString('default', { month: 'long' });
    }

    get yearOptions() {
        let years = [];
        const currentYear = new Date().getFullYear();
        const min = this.minYear ? this.minYear : currentYear - 100;
        const max = this.maxYear ? this.maxYear : currentYear + 20;

        for (let i = min; i <= max; i++) {
            years.push({
                label: i,
                value: i,
                selected: i === this.current.getFullYear()
            });
        }
        return years;
    }

    get calendarDays() {
        const year = this.current.getFullYear();
        const month = this.current.getMonth();

        const firstDay = new Date(year, month, 1);
        const startDay = firstDay.getDay();

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();

        let days = [];

        // previous month
        for (let i = startDay - 1; i >= 0; i--) {
            const d = prevMonthDays - i;
            days.push(this.buildDay(year, month - 1, d, true));
        }

        // current month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(this.buildDay(year, month, i, false));
        }

        // next month
        let nextDays = 42 - days.length;
        for (let i = 1; i <= nextDays; i++) {
            days.push(this.buildDay(year, month + 1, i, true));
        }

        return days;
    }


    stripTime(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }


    buildDay(year, month, day, isMuted) {
        const date = new Date(year, month, day);


        const currentDate = this.stripTime(date);
        const min = this.minDate ? this.stripTime(this.minDate) : null;
        const max = this.maxDate ? this.stripTime(this.maxDate) : null;

        const isOutOfRange =
            (min && currentDate < min) ||
            (max && currentDate > max);

        const dayOfWeek = date.getDay();
        const isWeekDayDisabled = this.daysDisabled ? this.daysDisabled.includes(dayOfWeek) : 0;

        const isDisabled = isOutOfRange || isWeekDayDisabled;

        return {
            key: date.getTime(),
            label: day,
            fullDate: date.toISOString(),
            isDisabled: isOutOfRange,
            class:
                'day ' +
                (isMuted ? 'muted ' : '') +
                (isDisabled ? 'disabled ' : '') +
                (this.isSelected(date) ? 'selected' : '')
        };
    }


    isSelected(date) {
        if (!this.selectedDate) return false;
        return new Date(this.selectedDate).toDateString() === date.toDateString();
    }

    selectDate(event) {
        const isDisabled = event.currentTarget.classList.contains('disabled');
        if (isDisabled) return;

        this.selectedDate = event.currentTarget.dataset.date;

        this.dispatchEvent(new CustomEvent('dateselect', {
            detail: {
                value: this.selectedDate,
                formattedDate: this.formattedDate
            }
        }));
    }


    prevMonth() {
        this.current = new Date(this.current.setMonth(this.current.getMonth() - 1));
    }

    nextMonth() {
        this.current = new Date(this.current.setMonth(this.current.getMonth() + 1));
    }

    handleYearChange(event) {
        const year = Number(event.target.value);
        if (isNaN(year)) return;

        this.current = new Date(
            year,
            this.current.getMonth(),
            1
        );
    }

    goToday() {
        this.current = new Date();
        this.selectedDate = new Date().toISOString();
        this.dispatchEvent(new CustomEvent('todaydateselect', {
            detail: {
                value: this.selectedDate,
                formattedDate: this.formattedDate
            }
        }));
    }

    toggleCalendar(event) {
        event.stopPropagation();
        this.showCalendar = !this.showCalendar;
    }


    handleCalendarClick(event) {
        event.stopPropagation();
    }


    connectedCallback() {
        this._outsideClickHandler = this.handleOutsideClick.bind(this);
        document.addEventListener('click', this._outsideClickHandler);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._outsideClickHandler);
    }


    handleOutsideClick(event) {
        if (!this.template.contains(event.target)) {
            this.showCalendar = false;
        }
    }

    get isPrevDisabled() {
        if (!this.minDate) return false;

        const prevMonth = new Date(
            this.current.getFullYear(),
            this.current.getMonth() - 1,
            1
        );

        const min = this.stripTime(this.minDate);

        // disable if full previous month is before minDate
        return new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0) < min;
    }

    get isNextDisabled() {
        if (!this.maxDate) return false;

        const nextMonth = new Date(
            this.current.getFullYear(),
            this.current.getMonth() + 1,
            1
        );

        const max = this.stripTime(this.maxDate);

        // disable if next month starts after maxDate
        return nextMonth > max;
    }

    showYearDropdown = false;

    toggleYearDropdown() {
        this.showYearDropdown = !this.showYearDropdown;
    }

    selectYear(event) {
        const year = Number(event.currentTarget.dataset.value);

        this.current = new Date(year, this.current.getMonth(), 1);
        this.showYearDropdown = false;
    }

    get currentYear() {
        return this.current.getFullYear();
    }

    
handleDateSelect(event) {

    const selected = event.target.dataset.date;
    this.selectedDate = selected;

    const formatted = this.formattedDate;
    console.log('formatted==>', formatted);
    //Send to parent
    this.dispatchEvent(new CustomEvent('dateselect', {
        detail: {
            value: this.selectedDate,
            formattedDate: formatted
        }
    }));
}


}