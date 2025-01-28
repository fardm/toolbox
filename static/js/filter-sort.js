// فیلتر کردن با دکمه‌های دسته‌بندی
document.getElementById('filterButtons').addEventListener('click', function (event) {
    const selectedButton = event.target.closest('button');
    if (!selectedButton) return; // اطمینان از کلیک بر روی دکمه‌های دسته‌بندی

    const selectedCategory = selectedButton.getAttribute('data-category');
    const items = document.querySelectorAll('.gallery-item');

    // حذف کلاس active از همه دکمه‌ها
    document.querySelectorAll('#filterButtons button').forEach(button => {
        button.classList.remove('active');
    });

    // اضافه کردن کلاس active به دکمه‌ای که کلیک شده است
    selectedButton.classList.add('active');

    // فیلتر کردن آیتم‌ها
    items.forEach(item => {
        const itemCategories = item.getAttribute('data-category').split(" ");
        
        if (selectedCategory === 'all' || itemCategories.includes(selectedCategory)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// تابع مرتب‌سازی
function sortItems(attribute, order) {
    const container = document.querySelector('.gallery-container');
    const items = Array.from(container.querySelectorAll('.gallery-item'));

    items.sort((a, b) => {
        let aValue = a.getAttribute('data-' + attribute).toLowerCase();
        let bValue = b.getAttribute('data-' + attribute).toLowerCase();

        // اگر attribute برابر rating باشد، طول رشته را برای مقایسه استفاده می‌کنیم
        if (attribute === 'rating') {
            aValue = aValue.length;
            bValue = bValue.length;
        }

        let comparison = 0;
        if (aValue < bValue) comparison = -1;
        if (aValue > bValue) comparison = 1;

        return order === 'asc' ? comparison : -comparison; // ترتیب صعودی یا نزولی
    });

    // مرتب‌سازی آیتم‌ها در DOM
    items.forEach(item => container.appendChild(item));
}

// رویداد مرتب‌سازی بر اساس انتخاب منوی بازشونده
document.getElementById('sortOption').addEventListener('change', function () {
    const sortAttribute = this.value;
    const sortOrder = document.getElementById('sortOrder').value;
    sortItems(sortAttribute, sortOrder);
});

// رویداد مرتب‌سازی بر اساس ترتیب صعودی/نزولی
document.getElementById('sortOrder').addEventListener('change', function () {
    const sortAttribute = document.getElementById('sortOption').value;
    const sortOrder = this.value;
    sortItems(sortAttribute, sortOrder);
});
