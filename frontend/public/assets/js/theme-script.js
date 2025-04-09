(function() {
    function initTheme() {
        const darkMode = localStorage.getItem('darkMode');
        const themeClass = darkMode === 'enabled' ? 'dark' : 'light';
        document.documentElement.className = themeClass;

        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupThemeButtons);
        } else {
            setupThemeButtons();
        }
    }

    function setupThemeButtons() {
        const darkBtn = document.getElementById('dark-mode-toggle');
        const lightBtn = document.getElementById('light-mode-toggle');

        if (!darkBtn || !lightBtn) {
            console.warn('Boutons de thème non trouvés - Vérifiez vos IDs');
            return;
        }

        const toggleMode = (isDarkMode) => {
            document.documentElement.className = isDarkMode ? 'dark' : 'light';
            localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
            updateButtons(isDarkMode);
        };

        const updateButtons = (isDarkMode) => {
            darkBtn.classList.toggle('hidden', isDarkMode);
            lightBtn.classList.toggle('hidden', !isDarkMode);
        };

        // Initialisation
        const isDark = document.documentElement.className === 'dark';
        updateButtons(isDark);

        // Écouteurs d'événements
        darkBtn.addEventListener('click', () => toggleMode(true));
        lightBtn.addEventListener('click', () => toggleMode(false));
    }

    initTheme();
})();