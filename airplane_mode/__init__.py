
__version__ = '0.0.1'

from erpnext.controllers.stock_controller import StockController

from airplane_mode.overrides.stock_controller import custom_check_expense_account

StockController.check_expense_account = custom_check_expense_account