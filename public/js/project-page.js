document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('module-list');
    
    if (!container) {
        console.log('Контейнер module-list не найден');
        return;
    }

    container.textContent = 'Загрузка данных...';

    fetch('/api/modules')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка HTTP: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success' && Array.isArray(data.items)) {
                // Очищаем контейнер
                container.innerHTML = '';
                
                // Создаем карточки для каждого модуля
                data.items.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'module-card';
                    
                    const title = document.createElement('h4');
                    title.textContent = item.title;
                    
                    const description = document.createElement('p');
                    description.textContent = item.description;
                    
                    card.appendChild(title);
                    card.appendChild(description);
                    container.appendChild(card);
                });
            } else {
                container.textContent = 'Не удалось загрузить данные';
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            container.textContent = 'Ошибка загрузки данных с сервера: ' + error.message;
        });
});