// --- WRAP ALL CODE IN DOMCONTENTLOADED TO ENSURE HTML IS READY ---
document.addEventListener('DOMContentLoaded', () => {

    // --- LENIS SMOOTH SCROLL INITIALIZATION ---
    const lenis = new Lenis({
        duration: 1.2, // Speed of the scroll animation
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function for a smooth effect
        smoothTouch: true // Enables smooth scrolling on touch devices
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    // --- END OF LENIS INITIALIZATION ---



    // --- MOBILE NAVIGATION LOGIC (from before) ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navContainer = document.querySelector('.nav-container');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    // Toggle mobile menu
    mobileNavToggle.addEventListener('click', () => {
        const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
        mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
        navContainer.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Toggle submenus on mobile
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation(); 
            
            const parentItem = toggle.closest('.has-submenu');
            const submenu = parentItem.querySelector('.submenu');
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            // Close other open submenus for a cleaner experience
            parentItem.closest('.nav-links').querySelectorAll('.has-submenu').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('active');
                    item.querySelector('.submenu').classList.remove('active');
                    item.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false');
                }
            });

            toggle.setAttribute('aria-expanded', !isExpanded);
            submenu.classList.toggle('active');
            parentItem.classList.toggle('active');
        });
    });
    // --- END OF MOBILE NAVIGATION LOGIC ---

});