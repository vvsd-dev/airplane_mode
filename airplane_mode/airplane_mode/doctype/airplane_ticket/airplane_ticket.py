# Copyright (c) 2023, Ibrahim Malinza and contributors
# For license information, please see license.txt

import frappe
import random
import string
from frappe.model.document import Document

class AirplaneTicket(Document):
	def validate(self):
		unique_add_ons = {}
		for row in self.add_ons:
			item = row.get("item")
			if item in unique_add_ons:
				frappe.msgprint("Duplicate entry {0} found and it will be removed".format(item))
			else:
				unique_add_ons[item]= row
		
		self.add_ons = {}
		self.add_ons = list(unique_add_ons.values())

	def before_save(self):
		total = 0.00
		if self.add_ons:
			for row in self.add_ons:
				total += row.get("amount")
		self.total_amount = float(self.flight_price) + total

	def before_submit(self):
		if self.status != "Boarded":
			frappe.throw("Airplane Ticket can only be submitted when the status is 'Boarded'.")
		
	def before_insert(self):
		self.validate_seat_capacity()
		self.set_seat_number()

	def validate_seat_capacity(self):
		airplane_name = frappe.get_value("Airplane Flight",self.flight,'airplane')
		seat_capacity = frappe.get_value("Airplane", airplane_name,'capacity')

		existing_tickets_count = frappe.get_value(
			"Airplane Ticket",
			filters={"flight": self.flight},
			fieldname="count(name)",
		)

		if existing_tickets_count >= seat_capacity:
			frappe.throw(
				f"Cannot create a new Airplane Ticket for this flight. The seat capacity of {seat_capacity} Passenger(s) has been reached."
			)

	def set_seat_number(self):
		random_integer = random.randint(1, 99)
		random_alphabet = random.choice(string.ascii_uppercase[:5])
		self.seat = str(random_integer) + random_alphabet
