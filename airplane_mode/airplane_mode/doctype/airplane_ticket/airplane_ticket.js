// Copyright (c) 2023, Ibrahim Malinza and contributors
// For license information, please see license.txt

frappe.ui.form.on('Airplane Ticket', {
	refresh: function(frm) {
		frm.add_custom_button(__('Assign Seat'), function() {
            var d = new frappe.ui.Dialog({
                title: __('Select Seat Number'),
                fields: [
                    {
                        label: 'Seat Number',
                        fieldname: 'seat',
                        fieldtype: 'Data',
                        reqd: 1
                    }
                ],
                primary_action: function() {
                    var values = d.get_values();
                    if (values && values.seat) {
                        frm.set_value('seat', values.seat);
                    }
                    d.hide();
                }
            });
    
            d.show();
        },'Actions');
	}
});
