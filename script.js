(function() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Переключить тему');
    themeToggle.innerHTML = '🌙';
    document.body.appendChild(themeToggle);
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.innerHTML = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        themeToggle.innerHTML = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
})();

(function initInteractiveMenu() {
    const menuHTML = `
        <div class="interactive-menu">
            <div class="menu-title">Категории смартфонов</div>
            
            <div class="category-group">
                <button class="category-btn" data-category="budget">
                    <span>Бюджетные (до 20 000 руб)</span>
                    <span class="arrow">▼</span>
                </button>
                <div class="dropdown-content" data-dropdown="budget">
                    <a href="#" class="dropdown-item">Xiaomi Redmi Note</a>
                    <a href="#" class="dropdown-item">Samsung Galaxy A</a>
                    <a href="#" class="dropdown-item">Realme C series</a>
                    <a href="#" class="dropdown-item">Poco C series</a>
                </div>
            </div>
            
            <div class="category-group">
                <button class="category-btn" data-category="mid">
                    <span>Средний сегмент (20k - 50k руб)</span>
                    <span class="arrow">▼</span>
                </button>
                <div class="dropdown-content" data-dropdown="mid">
                    <a href="#" class="dropdown-item">Google Pixel 7a/8a</a>
                    <a href="#" class="dropdown-item">Xiaomi 13T/14T</a>
                    <a href="#" class="dropdown-item">Samsung Galaxy S23 FE</a>
                    <a href="#" class="dropdown-item">Nothing Phone (2)</a>
                    <a href="#" class="dropdown-item">OnePlus Nord 4</a>
                </div>
            </div>
            
            <div class="category-group">
                <button class="category-btn" data-category="flagship">
                    <span>Флагманы (50 000+ руб)</span>
                    <span class="arrow">▼</span>
                </button>
                <div class="dropdown-content" data-dropdown="flagship">
                    <a href="#" class="dropdown-item">iPhone 15/16 Pro Max</a>
                    <a href="#" class="dropdown-item">Samsung Galaxy S24 Ultra</a>
                    <a href="#" class="dropdown-item">Xiaomi 14 Ultra</a>
                    <a href="#" class="dropdown-item">Google Pixel 9 Pro</a>
                    <a href="#" class="dropdown-item">OnePlus 12</a>
                </div>
            </div>
            
            <div class="category-group">
                <button class="category-btn" data-category="gaming">
                    <span>Игровые смартфоны</span>
                    <span class="arrow">▼</span>
                </button>
                <div class="dropdown-content" data-dropdown="gaming">
                    <a href="#" class="dropdown-item">ASUS ROG Phone 8</a>
                    <a href="#" class="dropdown-item">Nubia RedMagic 9</a>
                    <a href="#" class="dropdown-item">Lenovo Legion</a>
                    <a href="#" class="dropdown-item">Black Shark 5/6</a>
                </div>
            </div>
            
            <div class="category-group">
                <button class="category-btn" data-category="camera">
                    <span>Камерофоны</span>
                    <span class="arrow">▼</span>
                </button>
                <div class="dropdown-content" data-dropdown="camera">
                    <a href="#" class="dropdown-item">Huawei P60 Pro</a>
                    <a href="#" class="dropdown-item">Vivo X100 Pro</a>
                    <a href="#" class="dropdown-item">Xiaomi 14 Ultra</a>
                    <a href="#" class="dropdown-item">iPhone 15 Pro Max</a>
                    <a href="#" class="dropdown-item">Samsung Galaxy S24 Ultra</a>
                </div>
            </div>
        </div>
    `;
    
    const mainElement = document.querySelector('main');
    if (mainElement) {
        const insertPoint = mainElement.querySelector('p') || mainElement.firstChild;
        if (insertPoint) {
            insertPoint.insertAdjacentHTML('afterend', menuHTML);
        } else {
            mainElement.insertAdjacentHTML('afterbegin', menuHTML);
        }
    }
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            const dropdown = document.querySelector(`.dropdown-content[data-dropdown="${category}"]`);
            const isActive = this.classList.contains('active');
            
            document.querySelectorAll('.category-btn').forEach(b => {
                if (b !== btn) {
                    b.classList.remove('active');
                    const otherDropdown = document.querySelector(`.dropdown-content[data-dropdown="${b.dataset.category}"]`);
                    if (otherDropdown) otherDropdown.classList.remove('open');
                }
            });
            
            if (!isActive) {
                this.classList.add('active');
                if (dropdown) dropdown.classList.add('open');
            } else {
                this.classList.remove('active');
                if (dropdown) dropdown.classList.remove('open');
            }
        });
    });
    
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const selection = this.textContent;
            alert(`Вы выбрали: ${selection}\nСкоро здесь будет подробный обзор`);
        });
    });
})();

(function restructureHTML() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const budgetUl = main.querySelector('ul');
    if (budgetUl) {
        const budgetDiv = document.createElement('div');
        budgetDiv.className = 'budget-options';
        const items = budgetUl.querySelectorAll('li');
        items.forEach(item => {
            const newItem = document.createElement('div');
            newItem.className = 'budget-item';
            newItem.innerHTML = item.innerHTML;
            budgetDiv.appendChild(newItem);
        });
        budgetUl.replaceWith(budgetDiv);
    }
    
    const aboutMain = document.querySelector('main .spec-card');
    if (aboutMain && aboutMain.parentElement) {
        const specContainer = document.createElement('div');
        specContainer.className = 'specs-grid';
        const cards = document.querySelectorAll('.spec-card');
        cards.forEach(card => {
            specContainer.appendChild(card.cloneNode(true));
            if (card.parentElement) card.remove();
        });
        const h1 = document.querySelector('main h1');
        if (h1 && h1.nextSibling) {
            h1.insertAdjacentElement('afterend', specContainer);
        }
    }
    
    const contactsMain = document.querySelector('.contact-item');
    if (contactsMain && contactsMain.parentElement) {
        const contactContainer = document.createElement('div');
        contactContainer.className = 'contacts-list';
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            contactContainer.appendChild(item.cloneNode(true));
            if (item.parentElement && item !== contactsMain) item.remove();
        });
        const emailsContainer = document.createElement('div');
        emailsContainer.className = 'emails-list';
        const emailPs = document.querySelectorAll('main p');
        emailPs.forEach(p => {
            if (p.textContent.includes('@')) {
                emailsContainer.appendChild(p.cloneNode(true));
                p.remove();
            }
        });
        const h2Elements = document.querySelectorAll('main h2');
        h2Elements.forEach(h2 => {
            if (h2.textContent.includes('Контакты') && h2.nextElementSibling) {
                h2.insertAdjacentElement('afterend', contactContainer);
            }
            if (h2.textContent.includes('Почта') && h2.nextElementSibling) {
                h2.insertAdjacentElement('afterend', emailsContainer);
            }
        });
    }
})();