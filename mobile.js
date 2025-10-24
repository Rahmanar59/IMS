// Mobile-specific JavaScript for Android app

// Wait for Cordova to be ready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Cordova is ready!');
    
    // Initialize mobile-specific features
    initializeMobileApp();
    
    // Setup status bar
    if (window.StatusBar) {
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString('#1a1a2e');
        StatusBar.styleLightContent();
    }
    
    // Setup splash screen
    if (window.navigator.splashscreen) {
        navigator.splashscreen.hide();
    }
    
    // Setup network monitoring
    setupNetworkMonitoring();
    
    // Setup mobile navigation
    setupMobileNavigation();
    
    // Setup touch gestures
    setupTouchGestures();
    
    // Setup mobile-specific features
    setupMobileFeatures();
}

function initializeMobileApp() {
    console.log('Initializing mobile app...');
    
    // Add mobile class to body
    document.body.classList.add('mobile-app');
    
    // Setup mobile-specific event listeners
    setupMobileEventListeners();
    
    // Initialize mobile calculator
    initializeMobileCalculator();
    
    // Setup mobile storage
    setupMobileStorage();
}

function setupMobileEventListeners() {
    // Prevent default touch behaviors
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        e.preventDefault();
    }, { passive: false });
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Recalculate layouts after orientation change
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });
    
    // Handle back button (Android)
    document.addEventListener('backbutton', function(e) {
        e.preventDefault();
        handleBackButton();
    }, false);
    
    // Handle menu button (Android)
    document.addEventListener('menubutton', function(e) {
        e.preventDefault();
        toggleMobileMenu();
    }, false);
}

function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

function setupTouchGestures() {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('.btn, .feature-card, .company-card');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.opacity = '0.8';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '1';
        });
        
        button.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '1';
        });
    });
}

function setupNetworkMonitoring() {
    if (window.navigator.connection) {
        const connection = navigator.connection;
        
        function updateConnectionStatus() {
            const status = document.getElementById('connectionStatus');
            if (status) {
                status.textContent = connection.effectiveType || 'Unknown';
            }
        }
        
        connection.addEventListener('change', updateConnectionStatus);
        updateConnectionStatus();
    }
}

function initializeMobileCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            calculateMobileShipping();
        });
    }
}

function calculateMobileShipping() {
    const origin = document.getElementById('originCountry').value;
    const destination = document.getElementById('destinationCountry').value;
    const weight = parseFloat(document.getElementById('packageWeight').value) || 0;
    const length = parseFloat(document.getElementById('length').value) || 0;
    const width = parseFloat(document.getElementById('width').value) || 0;
    const height = parseFloat(document.getElementById('height').value) || 0;
    const company = document.getElementById('shippingCompany').value;
    const speed = document.getElementById('shippingSpeed').value;
    
    if (!weight || !length || !width || !height) {
        showMobileAlert('Please fill in all package details');
        return;
    }
    
    // Calculate shipping costs (simplified algorithm)
    const baseCost = calculateBaseCost(weight, length, width, height);
    const distanceMultiplier = calculateDistanceMultiplier(origin, destination);
    const companyMultiplier = getCompanyMultiplier(company);
    const speedMultiplier = getSpeedMultiplier(speed);
    
    const totalCost = baseCost * distanceMultiplier * companyMultiplier * speedMultiplier;
    
    displayMobileResults(totalCost, company, speed);
    
    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function calculateBaseCost(weight, length, width, height) {
    const volume = (length * width * height) / 1000000; // Convert to cubic meters
    const weightCost = weight * 2.5; // $2.5 per kg
    const volumeCost = volume * 100; // $100 per cubic meter
    return Math.max(weightCost, volumeCost, 5); // Minimum $5
}

function calculateDistanceMultiplier(origin, destination) {
    const distances = {
        'USA-USA': 1.0,
        'UK-UK': 1.0,
        'Germany-Germany': 1.0,
        'Japan-Japan': 1.0,
        'Australia-Australia': 1.0,
        'Canada-Canada': 1.0,
        'France-France': 1.0,
        'Italy-Italy': 1.0,
        'Spain-Spain': 1.0,
        'Netherlands-Netherlands': 1.0
    };
    
    const key = `${origin}-${destination}`;
    return distances[key] || 2.5; // International shipping multiplier
}

function getCompanyMultiplier(company) {
    const multipliers = {
        'fedex': 1.2,
        'ups': 1.1,
        'dhl': 1.3,
        'usps': 0.9,
        'amazon': 1.0,
        'dpd': 1.1,
        'tnt': 1.2,
        'aramex': 1.4,
        'royal-mail': 1.0,
        'hermes': 0.8,
        'yodel': 0.9,
        'dpd-uk': 1.0,
        'evri': 0.9,
        'inpost': 0.8,
        'collectplus': 0.7
    };
    
    return multipliers[company] || 1.0;
}

function getSpeedMultiplier(speed) {
    const multipliers = {
        'standard': 1.0,
        'express': 1.5,
        'overnight': 2.0,
        'same-day': 3.0
    };
    
    return multipliers[speed] || 1.0;
}

function displayMobileResults(cost, company, speed) {
    const resultsContainer = document.getElementById('shippingResults');
    
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="shipping-result">
                <h4>Shipping Cost Estimate</h4>
                <div class="cost-display">
                    <span class="cost-amount">$${cost.toFixed(2)}</span>
                    <span class="cost-currency">USD</span>
                </div>
                <div class="shipping-details">
                    <p><strong>Company:</strong> ${company.toUpperCase()}</p>
                    <p><strong>Speed:</strong> ${speed.replace('-', ' ').toUpperCase()}</p>
                    <p><strong>Estimated Delivery:</strong> ${getDeliveryTime(speed)}</p>
                </div>
                <div class="shipping-actions">
                    <button class="btn btn-primary" onclick="bookShipping()">Book Now</button>
                    <button class="btn btn-secondary" onclick="compareRates()">Compare Rates</button>
                </div>
            </div>
        `;
    }
}

function getDeliveryTime(speed) {
    const times = {
        'standard': '5-7 business days',
        'express': '2-3 business days',
        'overnight': '1 business day',
        'same-day': 'Same day delivery'
    };
    
    return times[speed] || '5-7 business days';
}

function bookShipping() {
    showMobileAlert('Booking feature coming soon!');
}

function compareRates() {
    showMobileAlert('Rate comparison feature coming soon!');
}

function setupMobileStorage() {
    // Use localStorage for mobile data persistence
    if (typeof(Storage) !== "undefined") {
        console.log('Local storage is available');
        
        // Save app state
        window.addEventListener('beforeunload', function() {
            saveAppState();
        });
        
        // Load app state
        loadAppState();
    }
}

function saveAppState() {
    const appState = {
        timestamp: new Date().toISOString(),
        products: window.inventory ? window.inventory.getAllProducts() : [],
        settings: {
            theme: 'dark',
            language: 'en'
        }
    };
    
    localStorage.setItem('inventoryAppState', JSON.stringify(appState));
}

function loadAppState() {
    const savedState = localStorage.getItem('inventoryAppState');
    
    if (savedState) {
        try {
            const appState = JSON.parse(savedState);
            console.log('App state loaded:', appState);
            
            // Restore products if inventory system exists
            if (window.inventory && appState.products) {
                appState.products.forEach(product => {
                    window.inventory.addProduct(
                        product.code,
                        product.name,
                        product.quantity,
                        product.location
                    );
                });
            }
        } catch (e) {
            console.error('Error loading app state:', e);
        }
    }
}

function setupMobileFeatures() {
    // Add mobile-specific features
    addMobileNotifications();
    addMobileOfflineSupport();
    addMobilePerformanceOptimizations();
}

function addMobileNotifications() {
    // Request notification permission
    if (window.Notification && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function addMobileOfflineSupport() {
    // Add offline detection
    window.addEventListener('online', function() {
        showMobileAlert('Connection restored!');
    });
    
    window.addEventListener('offline', function() {
        showMobileAlert('You are now offline. Some features may be limited.');
    });
}

function addMobilePerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

function showMobileAlert(message) {
    // Create mobile-friendly alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'mobile-alert';
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 3000);
}

function handleBackButton() {
    // Handle Android back button
    const activeSection = document.querySelector('.section.active');
    
    if (activeSection && activeSection.id !== 'home') {
        showSection('home');
    } else {
        // Exit app
        if (navigator.app) {
            navigator.app.exitApp();
        }
    }
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

// Mobile-specific utility functions
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function getMobileOrientation() {
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
}

function addMobileCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-alert {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 10000;
            font-size: 1rem;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        
        .mobile-app {
            -webkit-overflow-scrolling: touch;
        }
        
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Initialize mobile CSS
addMobileCSS();

// Export functions for global access
window.mobileApp = {
    calculateMobileShipping,
    showMobileAlert,
    handleBackButton,
    toggleMobileMenu,
    isMobile,
    getMobileOrientation
};
