
📅 **Custom Range Datepicker for LWC**</br>
This project provides a fully customizable Date Range Picker component built using Lightning Web Components (LWC), designed to replicate the native SLDS </br>
(Salesforce Lightning Design System) styling and provide functionality for selecting start and end dates within a user-friendly calendar interface.


✨**Features**</br>
📆 Custom calendar UI inspired by SLDS datepicker</br>
📅 Start & End date selection with range highlighting</br>
🚫 Disabled past dates (configurable logic)</br>
🔁 Month navigation with year dropdown</br>
🎯 Single-date and range support</br>
⚙️ Two-way communication using custom events (rangeapply, rangeclear)</br>
🔍 Clean parent-child component architecture</br>
📦 Easily embeddable inside lightning-card, lightning-input, or custom UI</br>
</br>
🧩 **Component Structure**</br>
customrangedatepicker: Main datepicker component with calendar UI</br>
parent: Wrapper/consumer component using lightning-input and displaying the date range</br>
</br>
📤 **Events**</br>
rangeapply: Fires when user clicks Apply, returns startDate and endDate</br>
rangeclear: Fires when user clicks Clear, resets the selection</br>
closepicker: Optional event for manual closure from parent</br>
</br>
🧠 **How it Works**</br>
The calendar UI is rendered with dynamic month/year and weekday headers.</br>
Users can click to select a start date, and then an end date. Selected range is highlighted.</br>
Navigation allows moving across months and years.</br>
Selected range is formatted (DD-MM-YYYY) and shown in the parent input.</br>
</br>
🚀 **Installation**</br>
Clone or download this repository</br>
Deploy the component to your Salesforce org via VS Code + SFDX</br>
Add <c-custom-range-datepicker> inside any parent LWC</br>
</br>
🔧 **TODO / Future Enhancements**</br>
Add keyboard navigation support</br>
Option to disable weekends</br>
Time range picker</br>
Localization (month and day names)</br>
