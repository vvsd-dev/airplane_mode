// Copyright (c) 2023, Ibrahim Malinza and contributors
// For license information, please see license.txt

frappe.ui.form.on('Testing', {
	refresh: function(frm) {
		frm.add_custom_button(__('Upload'), function() {
			frappe.call({
				method: 'airplane_mode.airplane_mode.doctype.testing.testing.attach_file_to_doctype',
				args: {
					docname: frm.doc.name
				},
				callback: function(response) {
					cur_frm.reload_doc();
				}
			});
		});
	}
});
