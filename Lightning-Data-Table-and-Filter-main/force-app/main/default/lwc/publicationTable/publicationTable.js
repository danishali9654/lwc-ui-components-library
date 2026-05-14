import LightningDatatable from 'lightning/datatable';
import combinedTemplate from './combinedField.html';

export default class PublicationTable extends LightningDatatable {
    static customTypes = {
        combined: {
            template: combinedTemplate,
            standardCellLayout: true,
            typeAttributes: []
        }
    };
    // No HTML file needed!
    // All props are handled by LightningDatatable base class.
}