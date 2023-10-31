# Copyright (c) 2023, Ibrahim Malinza and contributors
# For license information, please see license.txt

import frappe

def get_chart_data(data):
	labels = [item['airline'] for item in data]
	datasets = [
		{"name": "Revenue","values": [item['revenue'] for item in data]}
	]
	chart = {"data": {"labels": labels, "datasets": datasets}, "type": "donut"}
	return chart

def get_report_summary(data):
	total = 0.00
	for row in data:
		total += row.get("revenue")
	report_summary = [
			{"value": total, "label": "Total Revenue", "datatype": "Currency"}
	]
	return report_summary

def execute(filters=None):
	columns, data, chart, report_summary = [], [], [], []

	columns = [
		{
			"fieldname": 'airline',
			"label": 'Airline',
			"fieldtype": 'Link',
			"options": 'Airline',
			"width": '150px',
		},
		{
			"fieldname": 'revenue',
			"label": 'Revenue',
			"fieldtype": 'Currency',
			"width": '150px',
		},
	]
	airlines = frappe.get_all("Airline",fields="name")
	for row in airlines:
		get_airline = frappe.db.sql(
			"""
				SELECT SUM(total_amount) as revenue,airplane.airline as airline FROM `tabAirplane Flight` flight 
				INNER JOIN `tabAirplane Ticket` ticket ON ticket.flight = flight.name
				LEFT JOIN `tabAirplane` airplane ON airplane.name = flight.airplane
				WHERE airplane.airline = %s
				GROUP BY airplane.airline
			""",(row.name),as_dict=True)
		if get_airline:
			for item in get_airline:
				data.append({
					"airline":item.airline,
					"revenue":item.revenue
				})
		else:
			data.append({
				"airline":row.name,
				"revenue": 0.00
			})
	
	chart = get_chart_data(data)
	report_summary = get_report_summary(data)
	return columns, data, None, chart, report_summary
