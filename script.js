const fetchButton = document.getElementById('fetchUsers');
const userContainer = document.getElementById('userContainer');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');

const API_URL = 'https://jsonplaceholder.typicode.com/users';

async function fetchUsers() {
    try {
        showLoading(true);
        hideError();
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        return users;
    } catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
}

function displayUsers(users) {
    userContainer.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'user-grid';
    
    users.forEach(user => {
        const userCard = createUserCard(user);
        gridContainer.appendChild(userCard);
    });
    
    userContainer.appendChild(gridContainer);
}

function createUserCard(user) {
    const card = document.createElement('div');
    card.className = 'user-card';
    
    const nameElement = document.createElement('div');
    nameElement.className = 'user-name';
    nameElement.textContent = user.name;
    
    const emailElement = document.createElement('div');
    emailElement.className = 'user-email';
    emailElement.textContent = `📧 ${user.email}`;
    
    const cityElement = document.createElement('div');
    cityElement.className = 'user-city';
    cityElement.textContent = `📍 ${user.address.city}`;
    
    card.appendChild(nameElement);
    card.appendChild(emailElement);
    card.appendChild(cityElement);
    
    return card;
}

function showLoading(show) {
    if (show) {
        loadingElement.classList.remove('hidden');
    } else {
        loadingElement.classList.add('hidden');
    }
}

function showError(message) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function hideError() {
    errorElement.classList.add('hidden');
    errorElement.textContent = '';
}

async function handleFetchUsers() {
    try {
        userContainer.innerHTML = '';
        
        const users = await fetchUsers();
        
        showLoading(false);
        displayUsers(users);
        
    } catch (error) {
        showLoading(false);
        showError(error.message);
        console.error('Error in handleFetchUsers:', error);
    }
}

function init() {
    fetchButton.addEventListener('click', handleFetchUsers);
}

document.addEventListener('DOMContentLoaded', init);