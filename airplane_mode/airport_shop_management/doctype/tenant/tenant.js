// Copyright (c) 2023, Ibrahim Malinza and contributors
// For license information, please see license.txt

frappe.ui.form.on('Tenant', {
    refresh: function(frm) {
        frm.add_custom_button(__('Add New Subform'), function() {
            createSubform(frm);
        });
    }
});

// Function to create the new subform
function createSubform(frm) {
    // Create a new div element for the subform
    const subformDiv = document.createElement('div');
    subformDiv.classList.add('col-lg-2', 'layout-side-section', 'subform-section');
    subformDiv.classList.add('form-page');

    // Find the layout-main-section and insert the new subform after it
    const layoutMainSection = document.querySelector('.layout-main-section-wrapper');
    if (layoutMainSection) {
        layoutMainSection.parentNode.insertBefore(subformDiv, layoutMainSection.nextSibling);
    }

    // Fetch fields of the "Shop" doctype
    frappe.call({
        method: 'frappe.client.get',
        args: {
            doctype: 'DocType',
            name: 'Shop'
        },
        callback: function(response) {
            const fields = response.message.fields;
            let formHTML = '<div class="form-section">';

            // Generate form fields based on the "Shop" doctype fields
            fields.forEach(field => {
                // Exclude readonly fields
                if (field.read_only) {
                    return;
                }

                // Determine if field is required
                const isRequired = field.reqd ? 'required' : '';

                // Generate form field HTML
                if (['Data', 'Int', 'Float', 'Date', 'Datetime', 'Time', 'Link', 'Text', 'Small Text', 'Check'].includes(field.fieldtype)) {
                    formHTML += `
                        <div class="form-group">
                            <label for="${field.fieldname}">${field.label}</label>
                            <div class="link-field" id="${field.fieldname}"></div>
                        </div>
                    `;
                }
            });

            formHTML += '</div>';
            subformDiv.innerHTML = formHTML;

            // Initialize any link fields
            fields.forEach(field => {
                    frappe.ui.form.make_control({
                        df: {
                            fieldtype: field.fieldtype,
                            options: field.options,
                            label: field.label,
                            fieldname: field.fieldname,
                            reqd: field.reqd
                        },
                        parent: subformDiv.querySelector(`#${field.fieldname}`),
                        frm: frm
                    }).make_input();
                });
        }
    });
}


