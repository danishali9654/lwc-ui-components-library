import { LightningElement, track } from 'lwc';
import Visa_Request_LWC from "@salesforce/resourceUrl/Visa_Request_LWC";
import { loadStyle } from 'lightning/platformResourceLoader';
import ICONS from '@salesforce/resourceUrl/ProcessFlowNew';
export default class TestingParent extends LightningElement {
    validationError;
    FilteredData;

//stat code for visa bulk upload
showSingleEditModal = false;
// showBulkEditForm = false;
@track showremoveConfirm = false;
//stat code for visa bulk upload

editRecord = {};
    bulkEditRecords = [];

    deleteRedIcon = ICONS + '/SVG/delete-red.svg';

     showcloseDeleteModal(){
        this.showDeleteModal = false;
        this.deleteIds = null; 
        }
    showdeleteFile(){
        this.showremoveConfirm = false;
        this.deleteIds = null;  
    }
    
 // Under bulk visa employee table js

    pageSize = 5;       // rows per page
    currentPage = 1;

    get filteredEmployees() {
        return this.employees.filter(emp => {
            const matchesSearch =
                emp.name.toLowerCase().includes(this.searchKey) ||
                emp.passport.toLowerCase().includes(this.searchKey);

            const matchesStatus =
                this.completionFilter === 'All'
                    ? true
                    : emp.status === this.completionFilter;

            return matchesSearch && matchesStatus;
        });
    }


    get totalPages() {
        return Math.ceil(this.filteredEmployees.length / this.pageSize);
    }


    get paginatedEmployees() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;

        return this.filteredEmployees.slice(start, end).map(emp => ({
            ...emp,
            rowClass: emp.status === 'Pending' ? 'row-pending' : ''
        }));
    }

    get pageNumbers() {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }


    get pageButtons() {
        return this.pageNumbers.map(p => ({
            number: p,
            variant: p === this.currentPage ? 'brand' : 'neutral',
             className: p === this.currentPage ? 'active-page' : ''
        }));
    }


    handlePageSizeSelect(event) {
        this.pageSize = Number(event.detail.value);
        this.currentPage = 1; // reset to first page
    }

    get pageStatus() {
        const total = this.filteredEmployees.length;
        const shown = Math.min(
            this.currentPage * this.pageSize,
            total
        );
        return `${shown} of ${total}`;
    }


    get isFirstPage() {
        return this.currentPage === 1;
    }

    get isLastPage() {
        return this.currentPage === this.totalPages;
    }


    handlePrev() {
        if (this.currentPage > 1) this.currentPage--;
    }


    handleNext() {
        if (this.currentPage < this.totalPages) this.currentPage++;
    }


    goToPage(event) {
        this.currentPage = Number(event.target.dataset.page);
    }

    handlePageSizeChange(event) {
        this.pageSize = Number(event.detail.value);
        this.currentPage = 1;
    }

    pageSizeOptions = [
        { label: '5', value: '5' },
        { label: '10', value: '10' },
        { label: '20', value: '20' }
    ];


  @track employees = [
    {
        id: '1',
        name: 'John Carter',
        passport: 'P10001',
        nationality: 'UAE',
        status: 'Completed',
        statusIcon: 'utility:success',
        statusClass: 'completed',
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '2',
        name: 'Ali Khan',
        passport: 'P10002',
        nationality: 'India',
        status: 'Pending',
        progress: 20,
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '3',
        name: 'Sarah Wilson',
        passport: 'P10003',
        nationality: 'UK',
        status: 'Completed',
        statusIcon: 'utility:success',
        statusClass: 'completed',
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '4',
        name: 'Mohammed Faisal',
        passport: 'P10004',
        nationality: 'KSA',
        status: 'Pending',
        progress: 40,
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '5',
        name: 'Emily Brown',
        passport: 'P10005',
        nationality: 'USA',
        status: 'Completed',
        statusIcon: 'utility:success',
        statusClass: 'completed',
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '6',
        name: 'Rajesh Kumar',
        passport: 'P10006',
        nationality: 'India',
        status: 'Pending',
        progress: 60,
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '7',
        name: 'Fatima Noor',
        passport: 'P10007',
        nationality: 'UAE',
        status: 'Completed',
        statusIcon: 'utility:success',
        statusClass: 'completed',
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '8',
        name: 'Daniel Smith',
        passport: 'P10008',
        nationality: 'Canada',
        status: 'Pending',
        progress: 80,
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '9',
        name: 'Ayesha Malik',
        passport: 'P10009',
        nationality: 'Pakistan',
        status: 'Completed',
        statusIcon: 'utility:success',
        statusClass: 'completed',
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '10',
        name: 'Michael Scott',
        passport: 'P10010',
        nationality: 'USA',
        status: 'Pending',
        progress: 30,
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '11',
        name: 'Noura Al Saud',
        passport: 'P10011',
        nationality: 'KSA',
        status: 'Completed',
        statusIcon: 'utility:success',
        statusClass: 'completed',
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '12',
        name: 'Peter Evans',
        passport: 'P10012',
        nationality: 'Australia',
        status: 'Pending',
        progress: 55,
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '13',
        name: 'Yusuf Ahmed',
        passport: 'P10013',
        nationality: 'Egypt',
        status: 'Completed',
        statusIcon: 'utility:success',
        statusClass: 'completed',
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '14',
        name: 'Olivia Taylor',
        passport: 'P10014',
        nationality: 'UK',
        status: 'Pending',
        progress: 70,
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '15',
        name: 'Hassan Raza',
        passport: 'P10015',
        nationality: 'Pakistan',
        status: 'Completed',
        statusIcon: 'utility:success',
        statusClass: 'completed',
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '16',
        name: 'Sophia Martinez',
        passport: 'P10016',
        nationality: 'Spain',
        status: 'Pending',
        progress: 90,
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '17',
        name: 'Abdul Rahman',
        passport: 'P10017',
        nationality: 'UAE',
        status: 'Completed',
        statusIcon: 'utility:success',
        statusClass: 'completed',
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '18',
        name: 'Lucas Muller',
        passport: 'P10018',
        nationality: 'Germany',
        status: 'Pending',
        progress: 25,
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '19',
        name: 'Chloe Dupont',
        passport: 'P10019',
        nationality: 'France',
        status: 'Completed',
        statusIcon: 'utility:success',
        statusClass: 'completed',
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    },
    {
        id: '20',
        name: 'Samuel Lee',
        passport: 'P10020',
        nationality: 'South Korea',
        status: 'Pending',
        progress: 50,
        image: ICONS + '/SVG/jpgformat.svg',
        selected: false
    }
];

    
    searchKey = '';
    completionFilter = 'All';
    showDeleteModal = false;
    deleteIds = [];

        completionOptions = [
        { label: 'Completion : All', value: 'All' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Pending', value: 'Pending' }
        ];

    get isBulkDisabled() {
        return !this.employees.some(e => e.selected);
    }
    connectedCallback() {
        console.log('visaType ', this.visaType);
        console.log('applicationType ', this.applicationType);
        console.log('autoSubmit', this.autoSubmit);
        Promise.all([
            loadStyle(this, ICONS + '/css/bulkVisa.css'),
            // loadStyle(this, ICONS + '/css/imageStyle.css'),
            // loadStyle(this, Visa_Request_LWC),
        ]).then(() => {
            console.log('resource loaded');

        }).catch(err => {
            console.log('error while loading resources', err);

        })
    }
        renderedCallback() {
        console.log(JSON.stringify(this.employees));
        console.log(
            'page',
            this.currentPage,
            'records',
            JSON.stringify(this.paginatedEmployees)
        );

    }


// COUNTS
    get filteredCount() {
        return this.filteredEmployees.length;
    }

 get selectedCount() {
        return this.filteredEmployees.filter(e => e.selected).length;
    }

 handleSearch(event) {
        this.searchKey = event.target.value.toLowerCase();
    }

   handleCompletionFilter(event) {
        this.completionFilter = event.detail.value;
    }

handleRowSelect(event) {
    const { id, selected } = event.detail;

    this.employees = this.employees.map(emp => {
        return emp.id === id
            ? { ...emp, selected }
            : emp;
    });
}

 handleAddEmployee() {
        console.log('Add Employee Clicked');
    }

renderedCallback() {
    console.log(JSON.stringify(this.employees));
}
handleSelectAll(event) {
    const checked = event.detail.checked;

    this.employees = this.employees.map(emp => ({
        ...emp,
        selected: checked
    }));
}

    handleDelete(event) {
        console.log('Delete', event.detail);
        this.deleteIds = [event.detail];
        this.showDeleteModal = true;
    }

    handleBulkDelete() {
        this.deleteIds = this.employees.filter(e => e.selected).map(e => e.id);
        this.showDeleteModal = true;
    }

    confirmDeleteEmp() {
        this.employees = this.employees.filter(
            e => !this.deleteIds.includes(e.id)
        );
        this.showDeleteModal = false;
        this.closeModal();
        this.showremoveConfirm = true;
    }

handleEdit(event) {
    console.log('Edit', event.detail);
    const recordId = event.detail;

    const selectedRecords = this.employees.filter(e => e.selected);

    // Case 1: No checkbox or only this row selected
    if (selectedRecords.length <= 1) {
        this.editRecord = this.employees.find(e => e.id === recordId);
        this.showSingleEditModal = true;
        this.showBulkEditForm = false;
    }
}

closeEdit() {
    this.showSingleEditModal = false;
}

cancelBulkEdit() {
    this.showBulkEditForm = false;
}
handleBulkEdit() {
    const selectedRecords = this.employees.filter(e => e.selected);

    if (selectedRecords.length > 1) {
        this.bulkEditRecords = selectedRecords;
        this.showBulkEditForm = true;
        this.showSingleEditModal = false;
    }
}

    closeModal() {
        this.showDeleteModal = false;
        this.deleteIds = [];
    }
}