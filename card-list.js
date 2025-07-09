const addCard = document.getElementById('add-card');
const deleteCard = document.getElementById('delete-card');
const cardContainer = document.querySelector('#card-list');

window.addEventListener('DOMContentLoaded', loadCardsFromStorage);

addCard.addEventListener("click", () => {
    const cardData = {
        title: "",
        text: "",
        id: Date.now()
    };  
    const cardElement = createCardElement(cardData);
    cardElement.classList.add('custom-card-display-add');
    cardContainer.appendChild(cardElement);
    savedCard(cardData);
});

deleteCard.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll('#card-list .checkbox-1');
    let cards = getSavedCards();
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const li = checkbox.closest('li');
            const cardId = li.dataset.cardId;
            li.classList.add('custom-card-display-delete');
            li.addEventListener('animationend', () => {
                li.remove();
            });
            cards = cards.filter(c => c.id != cardId);
        }
    });
    localStorage.setItem('cards', JSON.stringify(cards));
});

function createCardElement(cardData) {
    const li = document.createElement('li');
    li.dataset.cardId = cardData.id;
    li.innerHTML = `
        <div class="card custom-card" id="custom-card">
            <div class="card-body">
                <div class="d-flex flex-row gap-2 align-items-center">
                    <h2>
                        <input type="text" placeholder="Title" class="card-title w-100 m-0">
                    </h2>
                    <div class="d-flex flex-column my-auto delete-box">
                        <input type="checkbox" name="delete" id="delete" class="checkbox-1">
                        <label for="delete" class="delete-label">Delete</label>
                    </div>
                </div>
                <textarea name="" id="" rows="6" class="card-text w-100" placeholder="Add text"></textarea>
            </div>
        </div>
    `;

    // Populate saved values
    const titleInput = li.querySelector('.card-title');
    const textArea = li.querySelector('.card-text');
    titleInput.value = cardData.title;
    textArea.value = cardData.text;

    // Add input listeners to save updates
    titleInput.addEventListener('input', () => updateCardData(li));
    textArea.addEventListener('input', () => updateCardData(li));

    //Change card background when checked for delete
    const checkbox = li.querySelector('.checkbox-1');
    const card = li.querySelector('.custom-card');

    checkbox.addEventListener('change', () => {
        if(checkbox.checked) {
            card.classList.add('delete-card');
            
        } else {
            card.classList.remove('delete-card');
        }
    });

    return li;
}

function updateCardData(li) {
    const cards = getSavedCards();
    const id = parseInt(li.dataset.cardId);
    const title = li.querySelector('.card-title').value;
    const text = li.querySelector('.card-text').value;

    const cardIndex = cards.findIndex(c => c.id === id);
    if (cardIndex !== -1) {
        cards[cardIndex].title = title;
        cards[cardIndex].text = text;
        localStorage.setItem('cards', JSON.stringify(cards));
    }
}

function savedCard(cardData) {
    const cards = getSavedCards();
    cards.push(cardData);
    localStorage.setItem('cards', JSON.stringify(cards));
}

function getSavedCards() {
    return JSON.parse(localStorage.getItem('cards')) || [];
}

function loadCardsFromStorage() {
    const cards = getSavedCards();
    cards.forEach(cardData => {
        const cardElement = createCardElement(cardData);
        cardContainer.appendChild(cardElement);
    })
}






    