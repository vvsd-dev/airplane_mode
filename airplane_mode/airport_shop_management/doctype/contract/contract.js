// Copyright (c) 2023, Ibrahim Malinza and contributors
// For license information, please see license.txt

frappe.ui.form.on('Contract', {
	refresh: function(frm) {
		frm.refresh_field("shop");
			frm.set_query("shop", function () {
				return {
					filters: {
						status: "Available"
					}
				};
			});
	}
});
