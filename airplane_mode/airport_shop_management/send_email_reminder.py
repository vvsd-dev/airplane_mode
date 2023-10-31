import frappe

def send_rent_reminders():
    today = frappe.utils.now_datetime()
    due_date = today.date()
    tenants = frappe.get_all("Rent Payment", filters={"docstatus": 1, "next_due_date": [">", due_date]}, fields=["tenant", "next_due_date"])

    for tenant in tenants:
        # Compose and send email reminders to tenants
        subject = "Rent Payment Reminder"
        message = f"Dear {tenant.tenant},\n\nThis is a reminder to pay your rent for this month. Please ensure that your payment is made by the due date of {tenant.next_due_date}.\n\nThank you."
        tenant_email = frappe.db.get_value("Tenant",tenant.tenant,"email")
        frappe.sendmail(
            recipients=tenant_email,
            subject=subject,
            message=message,
        )
