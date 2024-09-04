// Copyright (c) 2023, Ibrahim Malinza and contributors
// For license information, please see license.txt

frappe.ui.form.on('Airline', {
	refresh: function(frm) {
		if (frm.doc.website){
		frm.add_web_link(`${frm.doc.website}`, __("Visit website"));
		}
		frm.add_custom_button(__('Print with 2 Copies'), function() {
			printWithTwoCopies(frm);
		});

        frm.add_custom_button(__('Print Copies'), function() {
            openCustomPrint(frm);
        });
	}
});

function openCustomPrint(frm) {
    let d = new frappe.ui.Dialog({
        title: __('Custom Print Dialog'),
        fields: [
            {
                label: __('Number of Copies'),
                fieldname: 'num_copies',
                fieldtype: 'Int',
                default: 2,
                read_only: 1 // Make the number of copies field read-only
            },
            {
                label: __('Document Path'),
                fieldname: 'doc_path',
                fieldtype: 'Data',
                default: 'C:\\Path\\To\\Your\\Document.pdf'
            }
        ],
        primary_action_label: __('Print'),
        primary_action(values) {
            let num_copies = values.num_copies;
            let doc_path = values.doc_path;

            // Trigger the custom protocol to call the Java application
            let protocolUrl = `vsd://print?docname=${encodeURIComponent(doc_path)}&copies=${num_copies}`;
            window.location.href = protocolUrl;

            d.hide();
        }
    });

    d.show();
}

function openCustomPrintDialog(frm) {
    let dialog = new frappe.ui.Dialog({
        title: 'Custom Print Settings',
        fields: [
            {
                label: 'Number of Copies',
                fieldname: 'num_copies',
                fieldtype: 'Int',
                default: 2,
                read_only: 1, // Make the field read-only
            },
            {
                label: 'Printer',
                fieldname: 'printer',
                fieldtype: 'Select',
                options: getPrinters(), // Function to fetch available printers
            }
        ],
        primary_action_label: 'Print',
        primary_action(values) {
            // Call the print function with the selected values
            triggerPrint(frm, values.printer, values.num_copies);
            dialog.hide();
        }
    });

    dialog.show();
}

function getPrinters() {
    // This function should return a list of available printers
    // For demo purposes, returning a static list
    return ['Printer 1', 'Printer 2', 'Printer 3'];
}
function triggerPrint(frm, printer, num_copies) {
    // For this example, we'll just use window.print
    // In a real scenario, you might send this information to the server to handle printing

    // Open the print preview with a specific print format
    let print_format = "Standard"; // Replace with your print format name
    let url = frappe.urllib.get_full_url("/printview?doctype=" + encodeURIComponent(frm.doc.doctype)
        + "&name=" + encodeURIComponent(frm.doc.name)
        + "&trigger_print=1"
        + "&format=" + print_format
        + "&no_letterhead=0"
        + "&letterhead=0"
        + "&print_orientation=1");

    // Open the print preview in a new window
    let print_window = window.open(url);

    print_window.onload = function() {
        // Use JavaScript to trigger the print dialog and enforce 2 copies
        // Note: This is just a simulation; actual control over copies might need server-side logic
        print_window.print();
        print_window.print(); // Trigger printing twice as a workaround
    };
}

function printWithTwoCopies(frm) {
    // Open the print preview dialog
    var print_format = "Standard"; // Replace with your print format name
    var url = frappe.urllib.get_full_url("/printview?doctype=" + encodeURIComponent(frm.doc.doctype)
        + "&name=" + encodeURIComponent(frm.doc.name)
        + "&trigger_print=1"
        + "&format=" + print_format
        + "&no_letterhead=0"
        + "&letterhead=0"
        + "&print_orientation=1");

    // Open the print preview in a new window
    var print_window = window.open(url);

    // Wait for the print preview to load
    print_window.onload = function() {
        // Access the print iframe and set the number of copies to 2
        var iframe = print_window.document.querySelector("iframe");
        if (iframe) {
            iframe.focus();
            iframe.contentWindow.print();
            iframe.contentWindow.print(); // Print again for the second copy
        }
    };
}
