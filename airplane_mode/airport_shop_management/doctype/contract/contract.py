# Copyright (c) 2023, Ibrahim Malinza and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Contract(Document):
	def before_submit(self):
		frappe.set_value("Shop",self.shop,"status","Rented")
		self.status = "Active"

	def on_cancel(self):
		self.status = "Terminated"
		frappe.set_value("Shop",self.shop,"status","Available")
