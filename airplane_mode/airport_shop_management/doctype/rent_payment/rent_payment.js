// Copyright (c) 2023, Ibrahim Malinza and contributors
// For license information, please see license.txt

frappe.ui.form.on('Rent Payment', {
	refresh: function(frm) {
		frm.refresh_field("contract");
			frm.set_query("contract", function () {
				return {
					filters: {
						docstatus: 1
					}
				};
			});
		var daten = new Date(frm.doc.payment_date);
		frappe.db.get_single_value("Shop Settings", "payment_frequency").then(function(paymentFrequency) {
			if (!isNaN(paymentFrequency) && frm.doc.docstatus == 0) {
				var year = daten.getFullYear();
				var month = daten.getMonth() + paymentFrequency;
				var day = daten.getDate();
				
				if (month > 11) {
					year += Math.floor(month / 12);
					month = month % 12;
				}
				
				month += 1;

				var formattedDaten = [year, month.toString().padStart(2, '0'), day.toString().padStart(2, '0')].join('-');
				if (frm.doc.next_due_date != formattedDaten) {
					frm.set_value("next_due_date",formattedDaten)
					frm.refresh_field("next_due_date")
				}
			}
		});
	}
	
});
