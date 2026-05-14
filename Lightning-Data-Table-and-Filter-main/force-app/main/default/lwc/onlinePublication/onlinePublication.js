import { LightningElement, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import tablestylesheet from "@salesforce/resourceUrl/datatable";

export default class OnlinePublication extends LightningElement {
    @track data = [];
    @track paginatedData = [];
    @track currentPage = 1;
    @track pageSize = 8;
    @track sortedBy = 'Date_of_Publication';
    @track sortedDirection = 'asc';
    @track filteredData = [];
    @track selectedFilters = { companyName: '', month: '', year: '' };

    columns = [
        { 
            label: 'اسم الشركة / نوع الرخصة\nCompany Name / License Type', 
            fieldName: 'Company_License', 
            type: 'combined', 
            wrapText: true 
        },
        { label: `تاريخ النشر \nDate of Publication`, fieldName: 'Date_of_Publication', type: 'text', sortable: true, initialWidth: 250 },
        { label: 'اسم الشركة\nCompany Name', fieldName: 'Company_Name', type: 'text' },
        { label: 'التغيير المطلـوب – الإسم\nRequired Change - Name', fieldName: 'Required_Change', type: 'text' },
        { label: 'نوع الرخصة\nLicense Type', fieldName: 'License_Type', type: 'text' }
    ];


    connectedCallback() {
        this.data = this.generateMockData(30);
        this.filteredData = [...this.data];
        this.updatePaginatedData();
        loadStyle(this, tablestylesheet + '/css/newspaper.css');
    }

    generateMockData(count) {
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        const years = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
        return Array.from({ length: count }, (_, i) => {
            const day = String((i % 28) + 1).padStart(2, '0');
            const month = months[i % months.length];
            const year = years[i % years.length];
            return {
                id: i + 1,
                Date_of_Publication: `${day}-${month}-${year}`,
                Trade_Name: `Trade ${i + 1}`,
                Company_Name: `Company ${i % 5 + 1}`,
                Month: month,
                Year: year,
                Required_Change: `Change ${i + 1}`,
                License_Type: `Type ${i + 1}`,
                Company_License: {
                    company: `Company ${i % 5 + 1}`,
                    type: `Type ${i + 1}`
                }
            };
        });
    }

    get totalRecords() {
        return this.filteredData.length;
    }

    get pageNumbers() {
        const totalPages = Math.ceil(this.totalRecords / this.pageSize);
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    get startRecord() {
        return (this.currentPage - 1) * this.pageSize + 1;
    }

    get endRecord() {
        return Math.min(this.startRecord + this.pageSize - 1, this.totalRecords);
    }

    updatePaginatedData() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.paginatedData = this.filteredData.slice(start, end);
    }

    handlePageChange(event) {
        this.currentPage = parseInt(event.target.dataset.id, 10);
        this.updatePaginatedData();
    }

    handleLastPage() {
        this.currentPage = this.pageNumbers.length;
        this.updatePaginatedData();
    }

    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        this.sortedBy = fieldName;
        this.sortedDirection = sortDirection;
        this.sortData(fieldName, sortDirection);
    }

    sortData(fieldName, sortDirection) {
        let isReverse = sortDirection === 'desc' ? -1 : 1;
        let dataToSort = [...this.filteredData];
        dataToSort.sort((a, b) => {
            let valA = a[fieldName] ? a[fieldName].toString().toLowerCase() : '';
            let valB = b[fieldName] ? b[fieldName].toString().toLowerCase() : '';
            return valA.localeCompare(valB) * isReverse;
        });
        this.filteredData = dataToSort;
        this.updatePaginatedData();
    }

    handleFilterChange(event) {
        const { companyName, month, year } = event.detail;
        this.selectedFilters = { companyName, month, year };
        const monthMap = {
            January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
            July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
        };
        const selectedMonthNumber = month ? monthMap[month] : null;
        this.filteredData = this.data.filter(record => {
            const matchesCompany = companyName
                ? record.Company_Name?.toLowerCase().includes(companyName.toLowerCase())
                : true;
            const matchesMonth = selectedMonthNumber !== null
                ? parseInt(record.Month) === selectedMonthNumber
                : true;
            const matchesYear = year
                ? record.Year === year
                : true;
            return matchesCompany && matchesMonth && matchesYear;
        });
        this.currentPage = 1;
        this.updatePaginatedData();
    }
}