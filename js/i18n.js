/* ============ i18n — Song ngữ Tiếng Việt / English ============ */
const I18N = {
  vi: {
    'nav.dashboard': 'Tổng quan', 'nav.orders': 'Đơn hàng', 'nav.inventory': 'Kho hàng',
    'nav.recipes': 'Công thức', 'nav.team': 'Nhân sự & Công việc', 'nav.reports': 'Báo cáo', 'nav.settings': 'Cài đặt',

    'dash.morning': 'Chào buổi sáng', 'dash.afternoon': 'Chào buổi trưa', 'dash.evening': 'Chào buổi tối',
    'dash.subtitle': 'Đây là tình hình hôm nay tại {cafe}.',
    'stat.sales': 'Doanh thu hôm nay', 'stat.orders': 'Đơn hàng hôm nay', 'stat.avgValue': 'Giá trị đơn TB', 'stat.returning': 'Khách quay lại',
    'stat.vsYesterday': 'so với hôm qua',
    'dash.todaysTasks': 'Công việc hôm nay', 'dash.completed': 'hoàn thành',
    'dash.lowStock': 'Cảnh báo sắp hết hàng', 'dash.left': 'còn lại',
    'dash.salesSummary': 'Doanh thu 7 ngày', 'dash.viewAllTasks': 'Xem tất cả công việc →',
    'dash.viewInventory': 'Xem kho hàng →', 'dash.viewFullReport': 'Xem báo cáo đầy đủ →',
    'dash.openingChecklist': 'Checklist mở cửa', 'dash.featuredRecipe': 'Công thức', 'dash.teamTasks': 'Nhân sự & Công việc',
    'dash.ingredients': 'Nguyên liệu', 'dash.steps': 'Các bước', 'dash.editRecipe': 'Sửa công thức →',
    'dash.viewFullSchedule': 'Xem toàn bộ lịch →', 'dash.viewAllInventory': 'Xem tất cả kho hàng →',
    'dash.allDone': 'Tất cả đã xong 🎉', 'dash.min': 'phút trước',

    'common.today': 'Hôm nay', 'common.add': 'Thêm', 'common.save': 'Lưu', 'common.cancel': 'Hủy',
    'common.delete': 'Xóa', 'common.edit': 'Sửa', 'common.close': 'Đóng', 'common.name': 'Tên', 'common.status': 'Trạng thái',
    'common.confirmDelete': 'Bạn chắc chắn muốn xóa?', 'common.total': 'Tổng cộng', 'common.time': 'Thời gian',

    'orders.title': 'Đơn hàng', 'orders.newOrder': '+ Tạo đơn hàng', 'orders.code': 'Mã đơn', 'orders.time': 'Giờ',
    'orders.items': 'Món', 'orders.cashier': 'Thu ngân', 'orders.total': 'Thành tiền',
    'orders.filter.today': 'Hôm nay', 'orders.filter.week': '7 ngày', 'orders.filter.all': 'Tất cả',
    'orders.ordersToday': 'Số đơn hôm nay', 'orders.revenueToday': 'Doanh thu hôm nay',
    'orders.selectRecipe': 'Chọn món', 'orders.qty': 'SL', 'orders.addLine': '+ Thêm món',
    'orders.placeOrder': 'Xác nhận đơn', 'orders.empty': 'Chưa có đơn hàng nào.', 'orders.orderLines': 'Chi tiết đơn',
    'orders.waiter': 'Nhân viên',

    'inv.title': 'Kho hàng', 'inv.item': 'Nguyên liệu / Vật tư', 'inv.stock': 'Tồn kho',
    'inv.low': 'Sắp hết', 'inv.good': 'Đủ dùng', 'inv.medium': 'Cần chú ý',
    'inv.restock': 'Nhập thêm', 'inv.addItem': '+ Thêm nguyên liệu', 'inv.lowAt': 'Ngưỡng cảnh báo',
    'inv.restockTitle': 'Nhập thêm hàng', 'inv.amount': 'Số lượng nhập', 'inv.note': 'Khi tạo đơn hàng, số lượng nguyên liệu sẽ tự động trừ khỏi tồn kho theo công thức.',
    'inv.nameVI': 'Tên (tiếng Việt)', 'inv.nameEN': 'Name (English)', 'inv.unit': 'Đơn vị',

    'recipe.title': 'Công thức', 'recipe.new': '+ Công thức mới', 'recipe.ingredients': 'Nguyên liệu',
    'recipe.steps': 'Cách pha', 'recipe.price': 'Giá bán', 'recipe.size': 'Độ lớn', 'recipe.detail': 'Chi tiết công thức',
    'recipe.ingredient': 'Nguyên liệu', 'recipe.amount': 'Định lượng', 'recipe.create': 'Tạo công thức',
    'recipe.namePlaceholder': 'VD: Latte', 'recipe.descPlaceholder': 'Mô tả ngắn về món',
    'recipe.stepsPlaceholder': 'Mỗi bước một dòng:\nPush 2 shots of espresso.\nSteam milk to 140°F.',
    'recipe.deleted': 'Đã xóa công thức', 'recipe.perCup': 'mỗi ly',

    'team.title': 'Nhân sự & Công việc', 'team.staff': 'Nhân viên', 'team.role': 'Chức vụ',
    'team.newTask': '+ Thêm công việc', 'team.taskName': 'Tên công việc', 'team.assignee': 'Người phụ trách',
    'team.opening': 'Checklist mở cửa', 'team.progress': 'Tiến độ hôm nay', 'team.noTask': 'Chưa có công việc',
    'role.manager': 'Quản lý', 'role.barista': 'Barista', 'role.cashier': 'Thu ngân',
    'team.addTitle': 'Thêm công việc mới', 'team.done': 'Hoàn thành',

    'rep.title': 'Báo cáo', 'rep.range': '14 ngày qua', 'rep.totalRevenue': 'Tổng doanh thu',
    'rep.totalOrders': 'Tổng số đơn', 'rep.avgOrders': 'Số đơn/ngày', 'rep.bestDay': 'Ngày doanh thu cao nhất',
    'rep.revenueChart': 'Doanh thu theo ngày', 'rep.ordersChart': 'Số đơn theo ngày',
    'rep.topRecipes': 'Món bán chạy', 'rep.sold': 'Số ly bán ra', 'rep.revenue': 'Doanh thu', 'rep.rank': '#',

    'set.title': 'Cài đặt', 'set.language': 'Ngôn ngữ hiển thị', 'set.cafeName': 'Tên quán',
    'set.ownerName': 'Tên quản lý', 'set.currency': 'Đơn vị tiền', 'set.save': 'Lưu cài đặt',
    'set.data': 'Dữ liệu', 'set.export': 'Tải dữ liệu (JSON)', 'set.import': 'Nhập dữ liệu',
    'set.reset': 'Xóa & đặt lại dữ liệu mẫu', 'set.resetDesc': 'Khôi phục toàn bộ dữ liệu về trạng thái ban đầu (mẫu demo).',
    'set.resetConfirm': 'Tất cả dữ liệu hiện tại sẽ bị xóa và thay bằng dữ liệu mẫu. Tiếp tục?',
    'set.saved': 'Đã lưu cài đặt',

    'toast.orderPlaced': 'Đã tạo đơn hàng & trừ nguyên liệu trong kho',
    'toast.restocked': 'Đã nhập thêm hàng', 'toast.taskAdded': 'Đã thêm công việc', 'toast.recipeSaved': 'Đã lưu công thức',
    'toast.itemAdded': 'Đã thêm nguyên liệu mới', 'toast.imported': 'Đã nhập dữ liệu', 'toast.badFile': 'Tệp dữ liệu không hợp lệ',
    'toast.lowStockWarn': 'Cảnh báo: một số nguyên liệu đã chạm ngưỡng thấp',
  },
  en: {
    'nav.dashboard': 'Dashboard', 'nav.orders': 'Orders', 'nav.inventory': 'Inventory',
    'nav.recipes': 'Recipes', 'nav.team': 'Team & Tasks', 'nav.reports': 'Reports', 'nav.settings': 'Settings',

    'dash.morning': 'Good morning', 'dash.afternoon': 'Good afternoon', 'dash.evening': 'Good evening',
    'dash.subtitle': 'Here\'s what\'s happening at {cafe}.',
    'stat.sales': 'Sales', 'stat.orders': 'Orders', 'stat.avgValue': 'Average Order Value', 'stat.returning': 'Returning Customers',
    'stat.vsYesterday': 'vs yesterday',
    'dash.todaysTasks': 'Today\'s Tasks', 'dash.completed': 'completed',
    'dash.lowStock': 'Low Stock Alerts', 'dash.left': 'left',
    'dash.salesSummary': 'Sales Summary', 'dash.viewAllTasks': 'View all tasks →',
    'dash.viewInventory': 'View inventory →', 'dash.viewFullReport': 'View full report →',
    'dash.openingChecklist': 'Opening Checklist', 'dash.featuredRecipe': 'Recipe', 'dash.teamTasks': 'Team & Tasks',
    'dash.ingredients': 'Ingredients', 'dash.steps': 'Steps', 'dash.editRecipe': 'Edit recipe →',
    'dash.viewFullSchedule': 'View full schedule →', 'dash.viewAllInventory': 'View all inventory →',
    'dash.allDone': 'All done 🎉', 'dash.min': 'mins ago',

    'common.today': 'Today', 'common.add': 'Add', 'common.save': 'Save', 'common.cancel': 'Cancel',
    'common.delete': 'Delete', 'common.edit': 'Edit', 'common.close': 'Close', 'common.name': 'Name', 'common.status': 'Status',
    'common.confirmDelete': 'Are you sure you want to delete?', 'common.total': 'Total', 'common.time': 'Time',

    'orders.title': 'Orders', 'orders.newOrder': '+ New Order', 'orders.code': 'Order', 'orders.time': 'Time',
    'orders.items': 'Items', 'orders.cashier': 'Cashier', 'orders.total': 'Total',
    'orders.filter.today': 'Today', 'orders.filter.week': '7 days', 'orders.filter.all': 'All',
    'orders.ordersToday': 'Orders today', 'orders.revenueToday': 'Revenue today',
    'orders.selectRecipe': 'Select item', 'orders.qty': 'Qty', 'orders.addLine': '+ Add item',
    'orders.placeOrder': 'Place order', 'orders.empty': 'No orders yet.', 'orders.orderLines': 'Order lines',
    'orders.waiter': 'Staff',

    'inv.title': 'Inventory', 'inv.item': 'Item', 'inv.stock': 'Stock',
    'inv.low': 'Low', 'inv.good': 'Good', 'inv.medium': 'Medium',
    'inv.restock': 'Restock', 'inv.addItem': '+ New Item', 'inv.lowAt': 'Low threshold',
    'inv.restockTitle': 'Restock item', 'inv.amount': 'Amount to add', 'inv.note': 'When an order is placed, ingredients are automatically deducted from stock based on the recipe.',
    'inv.nameVI': 'Tên (tiếng Việt)', 'inv.nameEN': 'Name (English)', 'inv.unit': 'Unit',

    'recipe.title': 'Recipes', 'recipe.new': '+ New recipe', 'recipe.ingredients': 'Ingredients',
    'recipe.steps': 'Steps', 'recipe.price': 'Price', 'recipe.size': 'Size', 'recipe.detail': 'Recipe',
    'recipe.ingredient': 'Ingredient', 'recipe.amount': 'Amount', 'recipe.create': 'Create recipe',
    'recipe.namePlaceholder': 'e.g. Latte', 'recipe.descPlaceholder': 'Short description',
    'recipe.stepsPlaceholder': 'One step per line:\nPush 2 shots of espresso.\nSteam milk to 140°F.',
    'recipe.deleted': 'Recipe deleted', 'recipe.perCup': 'per cup',

    'team.title': 'Team & Tasks', 'team.staff': 'Staff', 'team.role': 'Role',
    'team.newTask': '+ New task', 'team.taskName': 'Task name', 'team.assignee': 'Assignee',
    'team.opening': 'Opening checklist', 'team.progress': 'Today\'s progress', 'team.noTask': 'No tasks yet',
    'role.manager': 'Manager', 'role.barista': 'Barista', 'role.cashier': 'Cashier',
    'team.addTitle': 'New task', 'team.done': 'Done',

    'rep.title': 'Reports', 'rep.range': 'Last 14 days', 'rep.totalRevenue': 'Total revenue',
    'rep.totalOrders': 'Total orders', 'rep.avgOrders': 'Orders / day', 'rep.bestDay': 'Best sales day',
    'rep.revenueChart': 'Revenue by day', 'rep.ordersChart': 'Orders by day',
    'rep.topRecipes': 'Top selling items', 'rep.sold': 'Cups sold', 'rep.revenue': 'Revenue', 'rep.rank': '#',

    'set.title': 'Settings', 'set.language': 'Language', 'set.cafeName': 'Cafe name',
    'set.ownerName': 'Manager name', 'set.currency': 'Currency', 'set.save': 'Save settings',
    'set.data': 'Data', 'set.export': 'Download data (JSON)', 'set.import': 'Import data',
    'set.reset': 'Reset demo data', 'set.resetDesc': 'Restore all data back to the original demo state.',
    'set.resetConfirm': 'All current data will be deleted and replaced with demo data. Continue?',
    'set.saved': 'Settings saved',

    'toast.orderPlaced': 'Order placed & ingredients deducted from stock',
    'toast.restocked': 'Stock updated', 'toast.taskAdded': 'Task added', 'toast.recipeSaved': 'Recipe saved',
    'toast.itemAdded': 'Item added', 'toast.imported': 'Data imported', 'toast.badFile': 'Invalid data file',
    'toast.lowStockWarn': 'Warning: some items just hit their low-stock threshold',
  }
};

function t(key, vars) {
  const lang = (typeof Store !== 'undefined' && Store.data && Store.data.settings.lang) || 'vi';
  let s = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  if (vars) for (const k in vars) s = s.replace('{' + k + '}', vars[k]);
  return s;
}
/* pick bilingual field: L({vi:'...', en:'...'}) */
function L(obj) {
  const lang = (typeof Store !== 'undefined' && Store.data && Store.data.settings.lang) || 'vi';
  if (obj == null) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.vi || obj.en || '';
}
