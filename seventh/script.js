// Шляхи до JSON-файлів
const JSON_PATHS = {
    categories: 'categories.json',
    toys:       'toys.json',
    gifts:      'gifts.json'
};

// Збереження даних
let categories = [];
const dataStore = {};

// Завантажити всі JSON-файли при старті
document.addEventListener('DOMContentLoaded', () => {
    // categories.json
    fetch(JSON_PATHS.categories)
        .then(res => res.json())
        .then(data => {
            categories = data;
            dataStore.categories = data;
        })
        .catch(err => console.error('Не вдалось завантажити categories.json:', err));

    // toys.json
    fetch(JSON_PATHS.toys)
        .then(res => res.json())
        .then(data => { dataStore.toys = data; })
        .catch(err => console.error('Не вдалось завантажити toys.json:', err));

    // gifts.json
    fetch(JSON_PATHS.gifts)
        .then(res => res.json())
        .then(data => { dataStore.gifts = data; })
        .catch(err => console.error('Не вдалось завантажити gifts.json:', err));

    // Навігація
    document.getElementById('homeLink').addEventListener('click', e => {
        e.preventDefault(); showHome();
    });
    document.getElementById('catalogLink').addEventListener('click', e => {
        e.preventDefault(); showCatalog();
    });
});

function showHome() {
    document.getElementById('content').innerHTML =
        '<h2>Ласкаво просимо!</h2><p>Оберіть категорію з меню.</p>';
}

function showCatalog() {
    const c = document.getElementById('content');
    let html = '<h2>Категорії</h2><ul class="list-group mb-3">';
    categories.forEach(cat => {
        html += `<li class="list-group-item">
                    <a href="#" data-short="${cat.shortname}" class="cat-link">${cat.name}</a>
                 </li>`;
    });
    html += '</ul><button id="specialsBtn" class="btn btn-warning">Specials</button>';
    c.innerHTML = html;

    document.querySelectorAll('.cat-link').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault(); loadCategory(e.target.dataset.short);
        });
    });
    document.getElementById('specialsBtn').addEventListener('click', () => {
        const rnd = categories[Math.floor(Math.random() * categories.length)];
        loadCategory(rnd.shortname);
    });
}

function loadCategory(shortname) {
    // Якщо дані вже в dataStore, беремо їх звідти, інакше робимо fetch
    const existing = dataStore[shortname];
    const render = items => {
        const cat = categories.find(c => c.shortname === shortname);
        let html = `<h2>${cat.name}</h2><p>${cat.notes}</p><div class="row">`;
        items.forEach(item => {
            html += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="https://place-hold.it/200x200?text=${encodeURIComponent(item.name)}"
                         class="card-img-top product-img" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <p class="card-text"><strong>Ціна:</strong> ${item.price}</p>
                    </div>
                </div>
            </div>`;
        });
        html += '</div>';
        document.getElementById('content').innerHTML = html;
    };

    if (existing) {
        render(existing);
    } else {
        fetch(`${shortname}.json`)
            .then(res => res.json())
            .then(items => {
                dataStore[shortname] = items;
                render(items);
            })
            .catch(err => console.error(`Не вдалось завантажити ${shortname}.json:`, err));
    }
}