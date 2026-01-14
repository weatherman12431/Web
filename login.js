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
        // Check credentials
        if (validCredentials[username] && validCredentials[username] === password) {
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
