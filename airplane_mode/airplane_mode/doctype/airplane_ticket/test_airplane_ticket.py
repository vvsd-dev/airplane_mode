# Copyright (c) 2023, Ibrahim Malinza and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase

class TestAirplaneTicket(FrappeTestCase):
    def test_unique_add_ons(self):
        ticket = frappe.new_doc("Airplane Ticket")
        ticket.flight_price = 1000
        ticket.add_ons = [
            {"item": "Meal", "amount": 50},
            {"item": "Extra Baggage", "amount": 30},
            {"item": "Meal", "amount": 50},
        ]
        ticket.validate()
        self.assertEqual(len(ticket.add_ons), 2)

    def test_total_amount_calculation(self):
        ticket = frappe.new_doc("Airplane Ticket")
        ticket.flight_price = 1000
        ticket.add_ons = [
            {"item": "Meal", "amount": 50},
            {"item": "Extra Baggage", "amount": 30},
        ]
        ticket.before_save()
        self.assertEqual(ticket.total_amount, 1080.0)

