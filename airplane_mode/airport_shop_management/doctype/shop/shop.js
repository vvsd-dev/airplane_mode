// Copyright (c) 2023, Ibrahim Malinza and contributors
// For license information, please see license.txt

frappe.ui.form.on('Shop', {
	refresh: function(frm) {
		if (frm.doc.status != "Rented"){
		frm.add_custom_button(__('Update Status'), function() {
			if (frm.doc.status != "Available"){
				var options = ['Available','Under Renovation', 'Closed']
			}else{
				var options = ['Under Renovation', 'Closed']
			}
            var d = new frappe.ui.Dialog({
                title: __('Update Shop Status'),
                fields: [
                    {
                        label: __('Select Shop Status'),
                        fieldname: 'shop_status',
                        fieldtype: 'Select',
						options: options,
                        reqd: 1,
                    }
                ],
                primary_action: function() {
                    var values = d.get_values();
                    if (values && values.shop_status) {
                        frm.set_value('status', values.shop_status);
						frm.save();
                    }
                    d.hide();
                }
            });
    
            d.show();
        },'Actions');
	}
	
	}
});
