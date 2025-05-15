document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const matchContainer = document.getElementById('match-container');
    const submitBtn = document.getElementById('submit-btn');
    const resultDiv = document.getElementById('result');

    let draggedItem = null;
    let matches = [];

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
                    matches.push({ milestone: draggedValue, year: targetValue });
                } else if (draggedItem.parentElement.classList.contains('years') && item.parentElement.classList.contains('milestones')) {
                    const match = document.createElement('div');
                    match.className = 'match';
                    match.innerHTML = `
                        <span>${item.textContent}</span>
                        <span>${draggedItem.textContent}</span>
                    `;
                    matchContainer.appendChild(match);
                    matches.push({ milestone: item.getAttribute('data-value'), year: draggedValue });
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
});
