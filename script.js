document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const matchContainer = document.getElementById('match-container');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultDiv = document.getElementById('result');

    let draggedItem = null;
    let matches = [];
    let usedYears = new Set();

    items.forEach(item => {
        item.addEventListener('dragstart', () => {
            if (!item.classList.contains('used')) {
                draggedItem = item;
                setTimeout(() => {
                    item.style.opacity = '0.5';
                }, 0);
            }
        });

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                if (draggedItem) {
                    draggedItem.style.opacity = '1';
                    draggedItem = null;
                }
            }, 0);
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        item.addEventListener('dragenter', (e) => {
            e.preventDefault();
            if (!item.classList.contains('used')) {
                item.style.backgroundColor = '#f0f0f0';
            }
        });

        item.addEventListener('dragleave', () => {
            if (!item.classList.contains('used')) {
                item.style.backgroundColor = '#fff';
            }
        });

        item.addEventListener('drop', () => {
            if (draggedItem !== item && !item.classList.contains('used') && !draggedItem.classList.contains('used')) {
                const draggedValue = draggedItem.getAttribute('data-value');
                const targetValue = item.getAttribute('data-value');

                if (draggedItem.parentElement.classList.contains('years') && item.parentElement.classList.contains('milestones')) {
                    const match = document.createElement('div');
                    match.className = 'match';
                    match.innerHTML = `
                        <span>${item.textContent}</span>
                        <span>${draggedItem.textContent}</span>
                    `;
                    matchContainer.appendChild(match);
                    matches.push({ milestone: item.getAttribute('data-value'), year: draggedValue });
                    usedYears.add(draggedValue);
                    draggedItem.classList.add('used');
                    item.classList.add('used');
                }
            }
        });
    });

    submitBtn.addEventListener('click', () => {
        const correctMatches = {
            'A': '3',
            'B': '4',
            'C': '5',
            'D': '2',
            'E': '1'
        };

        let allCorrect = true;

        matches.forEach(match => {
            if (correctMatches[match.milestone] !== match.year) {
                allCorrect = false;
            }
        });

        if (allCorrect) {
            resultDiv.textContent = 'All matches are correct!';
            resultDiv.style.color = 'green';
        } else {
            resultDiv.textContent = 'Some matches are incorrect. Please try again.';
            resultDiv.style.color = 'red';
        }
    });

    resetBtn.addEventListener('click', () => {
        matches = [];
        usedYears.clear();
        matchContainer.innerHTML = '';
        resultDiv.textContent = '';
        document.querySelectorAll('.item').forEach(item => {
            item.classList.remove('used');
        });
    });
});
