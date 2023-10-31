# Copyright (c) 2023, Ibrahim Malinza and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator

class AirplaneFlight(WebsiteGenerator):
	def on_submit(self):
		self.status = "Completed"
		linked_tickets = frappe.get_all("Airplane Ticket",filters={"flight":self.name},fields="name")
		for linked_ticket in linked_tickets:
			doc = frappe.get_doc("Airplane Ticket",linked_ticket.name)
			doc.status = "Boarded"
			doc.save()
			doc.submit()
	
	def before_save(self):
		self.route = f"flights/{self.name}"
