import { LightningElement, api } from 'lwc';

export default class EmployeeVisaList extends LightningElement {
    _records = [];

    @api
    get records() {
        return this._records;
    }


    set records(value) {
        this._records = (value || []).map(emp => ({
            ...emp,
            isPending: emp.status === 'Pending',
            progress: emp.progress || 0,
            animatedProgress: 0
        }));
        this.animateProgress();
    }

    // handleSelect(event) {
    //     this.dispatchEvent(new CustomEvent('rowselect', {
    //         detail: {
    //             id: event.target.dataset.id,
    //             selected: event.target.checked
    //         }
    //     }));
    // }


    animateProgress() {
        this._records.forEach(emp => {
            if (!emp.isPending) {
                return;
            }

            const interval = setInterval(() => {
                if (emp.animatedProgress < emp.progress) {
                    emp.animatedProgress += 1;
                    this._records = [...this._records];
                } else {
                    clearInterval(interval);
                }
            }, 12);
        });
    }


    handleSelect(event) {
        this.dispatchEvent(
            new CustomEvent('rowselect', {
                detail: {
                    id: event.target.dataset.id,
                    selected: event.target.checked
                },
                bubbles: true
            })
        );
    }


    handleSelectAll(event) {
        this.dispatchEvent(
            new CustomEvent('selectall', {
                detail: { checked: event.target.checked },
                bubbles: true
            })
        );
    }

    handleEdit(event) {
        this.dispatchEvent(new CustomEvent('edit', {
            detail: event.currentTarget.dataset.id,
            bubbles: true
        }));
    }

    handleDelete(event) {
        this.dispatchEvent(new CustomEvent('delete', {
            detail: event.currentTarget.dataset.id,
            bubbles: true
        }));
    }


}