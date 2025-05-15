document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const matchContainer = document.getElementById('match-container');

    let draggedItem = null;

    items.forEach(item => {
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.style.opacity = '0.5';
            }, 0);
        });

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.opacity = '1';
                draggedItem = null;
            }, 0);
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        item.addEventListener('dragenter', (e) => {
            e.preventDefault();
            item.style.backgroundColor = '#3e8e41';
        });

        item.addEventListener('dragleave', () => {
            item.style.backgroundColor = '#4CAF50';
        });

        item.addEventListener('drop', () => {
            if (draggedItem !== item) {
                const draggedValue = draggedItem.getAttribute('data-value');
                const targetValue = item.getAttribute('data-value');

                if (draggedItem.parentElement.classList.contains('milestones') && item.parentElement.classList.contains('years')) {
                    const match = document.createElement('div');
                    match.className = 'match';
                    match.innerHTML = `
                        <span>${draggedItem.textContent}</span>
                        <span>${item.textContent}</span>
                    `;
                    matchContainer.appendChild(match);
                } else if (draggedItem.parentElement.classList.contains('years') && item.parentElement.classList.contains('milestones')) {
                    const match = document.createElement('div');
                    match.className = 'match';
                    match.innerHTML = `
                        <span>${item.textContent}</span>
                        <span>${draggedItem.textContent}</span>
                    `;
                    matchContainer.appendChild(match);
                }
            }
        });
    });
});