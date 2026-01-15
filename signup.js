// Valid registration codes
const validRegistrationCodes = {
    'STORM2026': 'admin',
    'CHASE2026': 'staff',
    'RAZOR2026': 'staff',
    'WEATHER2026': 'staff'
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

// Initialize particles
createParticles();

// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
});

// Toggle confirm password visibility
const togglePasswordConfirm = document.getElementById('togglePasswordConfirm');
const confirmPasswordInput = document.getElementById('confirmPassword');

togglePasswordConfirm.addEventListener('click', () => {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    togglePasswordConfirm.textContent = type === 'password' ? '👁️' : '🙈';
});

// Handle form submission
const signupForm = document.getElementById('signupForm');
const signupBtn = document.getElementById('signupBtn');
const message = document.getElementById('message');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const registrationCode = document.getElementById('registrationCode').value.trim().toUpperCase();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;
    
    // Clear previous message
    message.classList.remove('show', 'success', 'error');
    
    // Add loading state
    signupBtn.classList.add('loading');
    signupBtn.querySelector('span').textContent = 'Creating Account';
    
    // Simulate processing delay
    setTimeout(() => {
        // Validate registration code
        if (!validRegistrationCodes[registrationCode]) {
            showMessage('❌ Invalid registration code. Please contact admin.', 'error');
            signupBtn.classList.remove('loading');
            signupBtn.querySelector('span').textContent = 'Create Account';
            shakeForm();
            return;
        }
        
        // Validate username length
        if (username.length < 3) {
            showMessage('❌ Username must be at least 3 characters long.', 'error');
            signupBtn.classList.remove('loading');
            signupBtn.querySelector('span').textContent = 'Create Account';
            shakeForm();
            return;
        }
        
        // Validate password length
        if (password.length < 6) {
            showMessage('❌ Password must be at least 6 characters long.', 'error');
            signupBtn.classList.remove('loading');
            signupBtn.querySelector('span').textContent = 'Create Account';
            shakeForm();
            return;
        }
        
        // Validate password match
        if (password !== confirmPassword) {
            showMessage('❌ Passwords do not match!', 'error');
            signupBtn.classList.remove('loading');
            signupBtn.querySelector('span').textContent = 'Create Account';
            shakeForm();
            return;
        }
        
        // Validate role selection
        if (!role) {
            showMessage('❌ Please select a role.', 'error');
            signupBtn.classList.remove('loading');
            signupBtn.querySelector('span').textContent = 'Create Account';
            shakeForm();
            return;
        }
        
        // Check if username already exists
        const existingUsers = JSON.parse(localStorage.getItem('staffUsers') || '{}');
        if (existingUsers[username]) {
            showMessage('❌ Username already exists. Please choose another.', 'error');
            signupBtn.classList.remove('loading');
            signupBtn.querySelector('span').textContent = 'Create Account';
            shakeForm();
            return;
        }
        
        // Save new user with pending status
        existingUsers[username] = {
            password: password,
            email: email,
            role: role,
            registrationCode: registrationCode,
            accessLevel: validRegistrationCodes[registrationCode],
            status: 'pending', // Requires admin approval
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('staffUsers', JSON.stringify(existingUsers));
        
        // Success
        signupBtn.classList.remove('loading');
        signupBtn.classList.add('success');
        signupBtn.querySelector('span').textContent = 'Account Created!';
        
        showMessage('✓ Account created successfully! Your account is pending admin approval. You will be able to login once approved.', 'success');
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
        
    }, 1200);
});

function showMessage(text, type) {
    message.textContent = text;
    message.classList.add('show', type);
}

function shakeForm() {
    signupForm.style.animation = 'shake 0.5s';
    setTimeout(() => {
        signupForm.style.animation = '';
    }, 500);
}

// Input focus effects
const inputs = document.querySelectorAll('input, select');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Check if already logged in
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('staffLoggedIn') || sessionStorage.getItem('staffLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'staff-panel.html';
    }
});
