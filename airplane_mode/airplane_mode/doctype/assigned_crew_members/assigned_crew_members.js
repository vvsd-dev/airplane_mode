// Copyright (c) 2023, Ibrahim Malinza and contributors
// For license information, please see license.txt

frappe.ui.form.on('Assigned Crew Members', {
	refresh: function(frm) {
			frm.refresh_field("crew_member");
			frm.set_query("crew_member", function () {
				return {
					filters: {
						airline: frm.doc.airline
					}
				};
			});
	}
});
