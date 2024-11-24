// Пример данных - замените на ваши реальные данные
const suppliers = [
    { id: 1, name: "Поставщик 1", details: [{ id: 1, name: "Товар 1", image: "https://via.placeholder.com/150" }, { id: 2, name: "Товар 2", image: "https://via.placeholder.com/150" }, { id: 3, name: "Товар 3", image: "https://via.placeholder.com/150" }] },
    { id: 2, name: "Поставщик 2", details: [{ id: 4, name: "Товар 4", image: "https://via.placeholder.com/150" }, { id: 5, name: "Товар 5", image: "https://via.placeholder.com/150" }, { id: 6, name: "Товар 6", image: "https://via.placeholder.com/150" }] },
    { id: 3, name: "Поставщик 3", details: [{ id: 7, name: "Товар 7", image: "https://via.placeholder.com/150" }, { id: 8, name: "Товар 8", image: "https://via.placeholder.com/150" }, { id: 9, name: "Товар 9", image: "https://via.placeholder.com/150" }] },
    { id: 4, name: "Поставщик 4", details: [{ id: 10, name: "Товар 10", image: "https://via.placeholder.com/150" }, { id: 11, name: "Товар 11", image: "https://via.placeholder.com/150" }, { id: 12, name: "Товар 12", image: "https://via.placeholder.com/150" }] },
    { id: 5, name: "Поставщик 5", details: [{ id: 13, name: "Товар 13", image: "https://via.placeholder.com/150" }, { id: 14, name: "Товар 14", image: "https://via.placeholder.com/150" }, { id: 15, name: "Товар 15", image: "https://via.placeholder.com/150" }] },
    // Добавьте больше поставщиков и товаров, если нужно
];

const itemsPerPage = 3;
let currentPage = 1;

function renderSuppliers(page) {
    const grid = document.getElementById('suppliersGrid');
    grid.innerHTML = ''; // Очистить предыдущие элементы

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentSuppliers = suppliers.slice(start, end);

    currentSuppliers.forEach(supplier => {
        const supplierDiv = document.createElement('div');
        supplierDiv.className = 'supplier';
        supplierDiv.innerHTML = `<h3>${supplier.name}</h3>`;
        
        supplier.details.forEach(detail => {
            const detailDiv = document.createElement('div');
            detailDiv.className = 'detail';
            detailDiv.innerHTML = `
                <img src="${detail.image}" alt="${detail.name}" class="detail-image">
                <a href="#"><strong>${detail.name}</strong></a>
            `;
            supplierDiv.appendChild(detailDiv);
        });

        grid.appendChild(supplierDiv);
    });

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Очистить предыдущие элементы

    const totalPages = Math.ceil(suppliers.length / itemsPerPage);
    
    if (currentPage > 1) {
        const prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.textContent = '« Предыдущая';
        prevLink.onclick = (e) => {
            e.preventDefault();
            currentPage--;
            renderSuppliers(currentPage);
        };
        pagination.appendChild(prevLink);
    }

    const pageInfo = document.createElement('span');
    pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
    pagination.appendChild(pageInfo);

    if (currentPage < totalPages) {
        const nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.textContent = 'Следующая »';
        nextLink.onclick = (e) => {
            e.preventDefault();
            currentPage++;
            renderSuppliers(currentPage);
        };
        pagination.appendChild(nextLink);
    }
}

// Инициализация
renderSuppliers(currentPage);