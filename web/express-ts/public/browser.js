const listOfItems = items.map(item => {
    return itemTemplate(item);
});

document.getElementById('item-list').insertAdjacentHTML('beforeend', listOfItems.join(' '));

document.getElementById('create-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const item = formData.get('item');
    const { data } = await axios.post('/create-item', { item });
    document.getElementById('item-list').insertAdjacentHTML('beforeend', itemTemplate({ id: data.id, item }));
    e.target.reset();
    document.getElementById('create-form-field').focus();
});

document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-me')) {
        const isConfirmed = confirm('Do you really want to delete this item?');
        if (isConfirmed) {
            const id = e.target.getAttribute('data-id');
            await axios.post('/delete-item', { id });
            e.target.parentElement.parentElement.remove();
        }
    }

    if (e.target.classList.contains('edit-me')) {
        const userInput = prompt('Edit Me', e.target.parentElement.parentElement.querySelector('.item-text').innerHTML);
        if (userInput != null) {
            const id = e.target.getAttribute('data-id');
            await axios.post('/update-item', { item: userInput, id });
            e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = userInput;
        }
    }
});

function itemTemplate(todo) {
    return `
        <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${todo.item}</span>
            <div>
                <button data-id="${todo.id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                <button data-id="${todo.id}" class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
        </li>
    `;
}