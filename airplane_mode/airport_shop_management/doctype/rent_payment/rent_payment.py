# Copyright (c) 2023, Ibrahim Malinza and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class RentPayment(Document):
	def before_submit(self):
		check_limit_no = frappe.db.get_single_value("Shop Settings","payment_frequency")
		act_total = self.actual_amount * check_limit_no
		if act_total != self.paid_amount:
			frappe.throw(f"You can not submit since the Expected amount is {act_total} for {check_limit_no} Month(s)")

		self.status = "Paid"
