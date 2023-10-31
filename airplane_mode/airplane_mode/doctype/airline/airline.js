// Copyright (c) 2023, Ibrahim Malinza and contributors
// For license information, please see license.txt

frappe.ui.form.on('Airline', {
	refresh: function(frm) {
		if (frm.doc.website){
		frm.add_web_link(`${frm.doc.website}`, __("Visit website"));
		}
		
	}
});
