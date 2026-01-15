// Valid credentials (in production, this should be handled server-side)
const validCredentials = {
    'admin': 'storm2026',
    'staff': 'razorback2026'
};

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        const startX = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Load custom background if set
function loadCustomBackground() {
    const customBg = localStorage.getItem('loginBackground');
    if (customBg) {
        const loginBg = document.querySelector('.login-background');
        loginBg.style.backgroundImage = `url('${customBg}')`;
        loginBg.style.backgroundSize = '110%';
        loginBg.style.backgroundPosition = 'center';
        loginBg.style.backgroundRepeat = 'no-repeat';
        document.body.classList.add('custom-bg');
    }
}

// Initialize particles and background
createParticles();
loadCustomBackground();

// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
});

// Handle form submission
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const loginBtn = document.getElementById('loginBtn');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Clear previous error
    errorMessage.classList.remove('show');
    
    // Add loading state
    loginBtn.classList.add('loading');
    loginBtn.querySelector('span').textContent = 'Authenticating';
    
    // Simulate authentication delay
    setTimeout(() => {
        let isValid = false;
        let isPending = false;
        
        // Check default credentials
        if (validCredentials[username] && validCredentials[username] === password) {
            isValid = true;
        } else {
            // Check custom registered users
            const customUsers = JSON.parse(localStorage.getItem('staffUsers') || '{}');
            if (customUsers[username] && customUsers[username].password === password) {
                // Check if account is approved
                if (customUsers[username].status === 'pending') {
                    isPending = true;
                } else if (customUsers[username].status === 'approved') {
                    isValid = true;
                }
            }
        }
        
        if (isPending) {
            // Account pending approval
            loginBtn.classList.remove('loading');
            loginBtn.querySelector('span').textContent = 'Login to Dashboard';
            
            errorMessage.style.color = '#f59e0b';
            errorMessage.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)';
            errorMessage.style.border = '2px solid rgba(245, 158, 11, 0.3)';
            errorMessage.textContent = '⏳ Your account is pending admin approval. Please wait for approval to login.';
            errorMessage.classList.add('show');
            
            // Shake the form
            loginForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                loginForm.style.animation = '';
            }, 500);
        } else if (isValid) {
            // Success
            loginBtn.classList.remove('loading');
            loginBtn.classList.add('success');
            loginBtn.querySelector('span').textContent = 'Success!';
            
            if (rememberMe) {
                localStorage.setItem('staffLoggedIn', 'true');
                localStorage.setItem('staffUsername', username);
            } else {
                sessionStorage.setItem('staffLoggedIn', 'true');
                sessionStorage.setItem('staffUsername', username);
            }
            
            // Show success message
            errorMessage.style.color = '#10b981';
            errorMessage.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)';
            errorMessage.style.border = '2px solid rgba(16, 185, 129, 0.3)';
            errorMessage.textContent = '✓ Login successful! Redirecting to dashboard...';
            errorMessage.classList.add('show');
            
            // Redirect to staff panel
            setTimeout(() => {
                window.location.href = 'staff-panel.html';
            }, 1500);
        } else {
            // Failed
            loginBtn.classList.remove('loading');
            loginBtn.querySelector('span').textContent = 'Login to Dashboard';
            
            errorMessage.style.color = '#dc3545';
            errorMessage.style.background = 'linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(185, 28, 28, 0.1) 100%)';
            errorMessage.style.border = '2px solid rgba(220, 53, 69, 0.3)';
            errorMessage.textContent = '✗ Invalid username or password. Please try again.';
            errorMessage.classList.add('show');
            
            // Shake the form
            loginForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                loginForm.style.animation = '';
            }, 500);
        }
    }, 1200);
});

// Check if already logged in
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('staffLoggedIn') || sessionStorage.getItem('staffLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'staff-panel.html';
    }
    
    // Pre-fill username if coming from signup
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        document.getElementById('username').value = decodeURIComponent(username);
        document.getElementById('password').focus();
    }
});

// Forgot password handler
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    alert('🔐 Password Reset\n\nPlease contact the administrator to reset your password.\n\n📧 Email: admin@razorbackstormchasing.com\n📱 Phone: (555) 123-4567');
});

// Enter key support
document.getElementById('username').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('password').focus();
    }
});

// Input focus effects
const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});


// Signup Modal functionality
const signupModal = document.getElementById('signupModal');
const showSignupBtn = document.getElementById('showSignup');
const closeSignupBtn = document.getElementById('closeSignup');
const signupForm = document.getElementById('signupForm');
const signupMessage = document.getElementById('signupMessage');

// Show signup modal
showSignupBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.classList.add('show');
});

// Close signup modal
closeSignupBtn?.addEventListener('click', () => {
    signupModal.classList.remove('show');
    signupForm.reset();
    signupMessage.classList.remove('show');
});

// Close modal when clicking outside
signupModal?.addEventListener('click', (e) => {
    if (e.target === signupModal) {
        signupModal.classList.remove('show');
        signupForm.reset();
        signupMessage.classList.remove('show');
    }
});

// Handle signup form submission
signupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
    const role = document.getElementById('signupRole').value;
    
    // Clear previous messages
    signupMessage.classList.remove('show', 'success', 'error');
    
    // Validation
    if (username.length < 3) {
        showSignupMessage('Username must be at least 3 characters long.', 'error');
        return;
    }
    
    if (password.length < 6) {
        showSignupMessage('Password must be at least 6 characters long.', 'error');
        return;
    }
    
    if (password !== passwordConfirm) {
        showSignupMessage('Passwords do not match!', 'error');
        return;
    }
    
    if (!role) {
        showSignupMessage('Please select a role.', 'error');
        return;
    }
    
    // Check if username already exists
    const existingUsers = JSON.parse(localStorage.getItem('staffUsers') || '{}');
    if (existingUsers[username]) {
        showSignupMessage('Username already exists. Please choose another.', 'error');
        return;
    }
    
    // Save new user
    existingUsers[username] = {
        password: password,
        email: email,
        role: role,
        createdAt: new Date().toISOString()
    };
    localStorage.setItem('staffUsers', JSON.stringify(existingUsers));
    
    // Show success message
    showSignupMessage('✓ Account created successfully! You can now login.', 'success');
    
    // Reset form and close modal after 2 seconds
    setTimeout(() => {
        signupModal.classList.remove('show');
        signupForm.reset();
        signupMessage.classList.remove('show');
        
        // Pre-fill username in login form
        document.getElementById('username').value = username;
    }, 2000);
});

function showSignupMessage(message, type) {
    signupMessage.textContent = message;
    signupMessage.classList.add('show', type);
}
