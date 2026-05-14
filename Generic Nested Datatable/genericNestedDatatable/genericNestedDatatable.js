import { LightningElement, api, track } from 'lwc';
import GenericNestedDatatableRes from '@salesforce/resourceUrl/GenericNestedDatatableRes';
import { loadStyle } from "lightning/platformResourceLoader";
const CHILD_COLUMNS = [
    { label: 'Name', fieldName: 'name', wrapText: true },
    {
        label: 'Amount',
        fieldName: 'cost',
        type: 'text',
        cellAttributes: { alignment: 'right' }
    }
];
export default class GenericNestedDatatable extends LightningElement {

    @api heading = '';

    _rows = [];

    @api
    get rows() {
        return this._rows;
    }
    set rows(value) {
        this._rows = Array.isArray(value) ? value : [];
        this._sections = this._buildSections(this._rows);
    }

    _sections = [];

    /** When true, nested sections render lightning-datatable inside one table row. */
    @api useDatatableForChildren = false;

    connectedCallback() {
        loadStyle(this, GenericNestedDatatableRes + '/css/style.css');
        this._sections = this._buildSections(this._rows);
    }

    _buildSections(rows) {
        let stripe = 0;
        const sections = [];

        rows.forEach((raw, sectionIndex) => {
            const key = raw.id != null ? String(raw.id) : `sec-${sectionIndex}`;
            const haveChild = raw.haveChildTable === true;
            const title = raw.title ?? '';

            if (!haveChild) {
                sections.push({
                    key,
                    modeSimple: true,
                    modeChild: false,
                    title,
                    value: raw.value ?? '',
                    stripeClass: this._stripeClass(stripe++)
                });
                return;
            }

            const list = Array.isArray(raw.childList) ? raw.childList : [];
            const rowspan = Math.max(list.length, 1);

            if (!list.length) {
                const rowStripe = this._stripeClass(stripe++);
                sections.push({
                    key,
                    modeSimple: false,
                    modeChild: true,
                    title,
                    rowspan,
                    children: [
                        {
                            key: `${key}-0`,
                            name: '',
                            cost: '',
                            isFirst: true,
                            stripeClass: rowStripe
                        }
                    ],
                    datatableKey: `${key}-dt`,
                    childDatatableData: [],
                    childDatatableColumns: CHILD_COLUMNS,
                    datatableRowStripeClass: rowStripe
                });
                return;
            }

            const children = list.map((child, i) => ({
                key: `${key}-${i}`,
                name: child.name ?? '',
                cost: child.cost ?? '',
                isFirst: i === 0,
                stripeClass: this._stripeClass(stripe++)
            }));

            const childDatatableData = list.map((child, i) => ({
                id: `${key}-row-${i}`,
                name: child.name ?? '',
                cost: child.cost ?? ''
            }));

            sections.push({
                key,
                modeSimple: false,
                modeChild: true,
                title,
                rowspan,
                children,
                datatableKey: `${key}-dt`,
                childDatatableData,
                childDatatableColumns: CHILD_COLUMNS,
                datatableRowStripeClass: children[0].stripeClass
            });
        });

        return sections;
    }

    _stripeClass(index) {
        return index % 2 === 0 ? 'slds-theme_shade' : 'slds-theme_default';
    }
}
