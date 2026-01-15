// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('staffLoggedIn') || sessionStorage.getItem('staffLoggedIn');
    const username = localStorage.getItem('staffUsername') || sessionStorage.getItem('staffUsername');
    
    if (isLoggedIn !== 'true') {
        // Not logged in, redirect to login page
        window.location.href = 'login.html';
        return false;
    }
    
    // Update user info in header if element exists
    const userInfoElement = document.querySelector('.user-info span');
    if (userInfoElement && username) {
        userInfoElement.textContent = username.charAt(0).toUpperCase() + username.slice(1);
    }
    
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar && username) {
        userAvatar.textContent = username.charAt(0).toUpperCase();
    }
    
    return true;
}

// Run auth check on page load
checkAuth();

// Update logout button to clear session
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('staffLoggedIn');
            localStorage.removeItem('staffUsername');
            sessionStorage.removeItem('staffLoggedIn');
            sessionStorage.removeItem('staffUsername');
            window.location.href = 'login.html';
        }
    });
}


// Delete chase functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-chase-btn')) {
        const chaseId = parseInt(e.target.getAttribute('data-id'));
        if (confirm('Are you sure you want to delete this storm chase? This action cannot be undone.')) {
            const row = e.target.closest('tr');
            row.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                ChaseManager.deleteChase(chaseId);
                loadChases();
                alert('✓ Storm chase deleted successfully!');
            }, 300);
        }
    }
});

// Load chases in admin panel
function loadChases() {
    const tbody = document.getElementById('chasesTableBody');
    if (!tbody) return;

    const chases = ChaseManager.getChases();
    tbody.innerHTML = '';

    chases.forEach(chase => {
        const row = document.createElement('tr');
        const statusClass = chase.status === 'Active' ? 'badge-active' : 'badge-scheduled';
        row.innerHTML = `
            <td>${chase.date}</td>
            <td>${chase.location}</td>
            <td><span class="badge ${statusClass}">${chase.status}</span></td>
            <td>${chase.participants}</td>
            <td>
                <button class="btn-small edit-chase-btn" data-id="${chase.id}">Edit</button>
                <button class="btn-small btn-danger delete-chase-btn" data-id="${chase.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add new chase
document.getElementById('addChaseBtn')?.addEventListener('click', () => {
    const date = prompt('Enter chase date (e.g., "May 30, 2026"):');
    if (!date) return;

    const location = prompt('Enter location (e.g., "Dallas, TX"):');
    if (!location) return;

    const participants = prompt('Enter number of participants:', '0');
    if (participants === null) return;

    ChaseManager.addChase({
        date: date,
        location: location,
        status: 'Scheduled',
        participants: parseInt(participants) || 0
    });

    loadChases();
    alert('✓ Storm chase added successfully!');
});

// Edit chase
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-chase-btn')) {
        const chaseId = parseInt(e.target.getAttribute('data-id'));
        const chase = ChaseManager.getChase(chaseId);
        if (!chase) return;

        const date = prompt('Enter new date:', chase.date);
        if (date === null) return;

        const location = prompt('Enter new location:', chase.location);
        if (location === null) return;

        const participants = prompt('Enter number of participants:', chase.participants);
        if (participants === null) return;

        ChaseManager.updateChase(chaseId, {
            date: date || chase.date,
            location: location || chase.location,
            participants: parseInt(participants) || chase.participants
        });

        loadChases();
        alert('✓ Storm chase updated successfully!');
    }
});

// Search chases
document.getElementById('chaseSearch')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const chases = ChaseManager.getChases();
    const filtered = chases.filter(chase => 
        chase.date.toLowerCase().includes(searchTerm) ||
        chase.location.toLowerCase().includes(searchTerm) ||
        chase.status.toLowerCase().includes(searchTerm)
    );

    const tbody = document.getElementById('chasesTableBody');
    tbody.innerHTML = '';

    filtered.forEach(chase => {
        const row = document.createElement('tr');
        const statusClass = chase.status === 'Active' ? 'badge-active' : 'badge-scheduled';
        row.innerHTML = `
            <td>${chase.date}</td>
            <td>${chase.location}</td>
            <td><span class="badge ${statusClass}">${chase.status}</span></td>
            <td>${chase.participants}</td>
            <td>
                <button class="btn-small edit-chase-btn" data-id="${chase.id}">Edit</button>
                <button class="btn-small btn-danger delete-chase-btn" data-id="${chase.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
});

// Load chases when switching to chases section
const chasesNavBtn = document.querySelector('[data-section="chases"]');
if (chasesNavBtn) {
    chasesNavBtn.addEventListener('click', loadChases);
}
