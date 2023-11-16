# Copyright (c) 2023, Ibrahim Malinza and contributors
# For license information, please see license.txt

import frappe
import shutil
from frappe import _
from frappe.model.document import Document
from frappe.utils import get_site_path
from frappe.utils import get_bench_path
import os

class Testing(Document):
	pass

@frappe.whitelist()
def attach_file_to_doctype(docname):
    file_path = frappe.db.get_value("Testing", docname, 'file_url')

    if file_path:
        site_path = os.path.join(get_bench_path(), 'sites', get_site_path()[2:])
        target_folder = os.path.join(site_path, 'public', 'files')

        new_file_path = shutil.copy(file_path, target_folder)
        relative_path = os.path.relpath(new_file_path, os.path.join(site_path, 'public'))
        
        file_doc = frappe.get_doc({
            'doctype': 'File',
            'file_url': '/' + relative_path,
            'attached_to_doctype': "Testing",
            'attached_to_name': docname,
            'attached_to_field': "attachments"
        })

        file_doc.insert(ignore_permissions=True)
        return frappe.msgprint(_("File attached successfully"))
    else:
        frappe.msgprint(_("No file path found in the specified field"))

