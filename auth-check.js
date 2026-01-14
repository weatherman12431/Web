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
