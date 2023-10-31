# Copyright (c) 2023, Ibrahim Malinza and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ShopSettings(Document):
	def before_save(self):
		check_scheduler = frappe.db.get_value("Scheduled Job Type","send_email_reminder.send_rent_reminders","stopped")
		if self.notification_preference == "Allow":
			if check_scheduler == 1:
				frappe.db.set_value("Scheduled Job Type","send_email_reminder.send_rent_reminders","stopped",0)
		else:
			if check_scheduler == 0:
				frappe.db.set_value("Scheduled Job Type","send_email_reminder.send_rent_reminders","stopped",1)

		if self.payment_frequency < 1:
			frappe.throw("Payment Frequency can not be less than 1 Month")