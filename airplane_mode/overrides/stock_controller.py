import frappe


def custom_check_expense_account(self, item):
    # Your custom implementation here
    frappe.msgprint("Custom Function Executed Instead")