// ========================================
// AUTH SYSTEM - localStorage (demo)
// ========================================

// REGISTRAZIONE
function registerUser(email, password, name = '') {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Controlla se l'email esiste già
    if (users.find(u => u.email === email)) {
        alert('⚠️ Questa email è già registrata.');
        return false;
    }
    
    // Salva utente (in produzione: hash della password!)
    users.push({
        email,
        password: btoa(password), // Base64 (NON sicuro, solo per demo)
        name: name || email.split('@')[0],
        createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    
    // Login automatico dopo registrazione
    loginUser(email, password);
    return true;
}

// LOGIN
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => 
        u.email === email && 
        u.password === btoa(password)
    );
    
    if (user) {
        const session = {
            email: user.email,
            name: user.name,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('userLogged', JSON.stringify(session));
        
        // Redirect alla dashboard
        window.location.href = '/privato/dashboard.html';
        return true;
    }
    
    alert('❌ Credenziali non valide. Riprova.');
    return false;
}

// CHECK AUTH (da chiamare su ogni pagina privata)
function checkAuth() {
    const userData = localStorage.getItem('userLogged');
    if (!userData) {
        // Non autenticato → redirect al login
        window.location.href = '/privato/index.html';
        return null;
    }
    
    try {
        return JSON.parse(userData);
    } catch (e) {
        logoutUser();
        return null;
    }
}

// LOGOUT
function logoutUser() {
    localStorage.removeItem('userLogged');
    window.location.href = '/';
}

// GET CURRENT USER (senza redirect)
function getCurrentUser() {
    const data = localStorage.getItem('userLogged');
    return data ? JSON.parse(data) : null;
}

// ========================================
// EVENT LISTENERS per pagine login/register
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            loginUser(email, password);
        });
    }
    
    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const name = document.getElementById('reg-name')?.value || '';
            registerUser(email, password, name);
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
});

// ========================================
// ESPORTA FUNZIONI (per uso globale)
// ========================================
window.registerUser = registerUser;
window.loginUser = loginUser;
window.checkAuth = checkAuth;
window.logoutUser = logoutUser;
window.getCurrentUser = getCurrentUser;