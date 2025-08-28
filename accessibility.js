// accessibility.js

const translations = {
    en: {
        title: "Rafiki Maths",
        subtitle: "Let's have some fun!",
        score: "Score",
        streak: "Streak",
        challengeMode: "Challenge Mode ⚡",
        time: "Time",
        selectLevel: "Select Level:",
        selectTopic: "Select Topic:",
        submit: "Submit",
        correct: "Correct!",
        incorrect: "Incorrect. The correct answer was",
        congratulations: "Congratulations! You have completed the exercises.",
        bonusPoints: "bonus points!",
        sessionComplete: "Session Complete! 📊",
        accuracy: "Accuracy:",
        questions: "Questions:",
        bestStreak: "Best Streak:",
        sessionTime: "Session Time:",
        recommendations: "Recommendations:",
        continuelearning: "Continue Learning",
        highContrast: "High Contrast"
    },
    es: {
        title: "Rafiki Matemáticas",
        subtitle: "¡Vamos a divertirnos!",
        score: "Puntuación",
        streak: "Racha",
        challengeMode: "Modo Desafío ⚡",
        time: "Tiempo",
        selectLevel: "Seleccionar Nivel:",
        selectTopic: "Seleccionar Tema:",
        submit: "Enviar",
        correct: "¡Correcto!",
        incorrect: "Incorrecto. La respuesta correcta era",
        congratulations: "¡Felicitaciones! Has completado los ejercicios.",
        bonusPoints: "puntos de bonificación!",
        sessionComplete: "¡Sesión Completa! 📊",
        accuracy: "Precisión:",
        questions: "Preguntas:",
        bestStreak: "Mejor Racha:",
        sessionTime: "Tiempo de Sesión:",
        recommendations: "Recomendaciones:",
        continuelearning: "Continuar Aprendiendo",
        highContrast: "Alto Contraste"
    }
};

class AccessibilityManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('rafikimaths_language') || 'en';
        this.highContrast = localStorage.getItem('rafikimaths_high_contrast') === 'true';
        this.init();
    }

    init() {
        // Set up language toggle
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = this.currentLanguage;
            languageSelect.addEventListener('change', () => {
                this.setLanguage(languageSelect.value);
            });
        }

        // Set up high contrast toggle
        const highContrastToggle = document.getElementById('high-contrast-toggle');
        if (highContrastToggle) {
            highContrastToggle.checked = this.highContrast;
            highContrastToggle.addEventListener('change', () => {
                this.toggleHighContrast();
            });
        }

        // Apply current settings
        this.updateLanguage();
        if (this.highContrast) {
            this.enableHighContrast();
        }
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('rafikimaths_language', lang);
        this.updateLanguage();
    }

    updateLanguage() {
        const t = translations[this.currentLanguage];
        
        // Update static text elements
        const elements = {
            'app h1': t.title,
            'app > div:nth-child(2)': t.subtitle
        };

        Object.keys(elements).forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = elements[selector];
            }
        });

        // Update labels
        const labels = document.querySelectorAll('label');
        labels.forEach(label => {
            const text = label.textContent.trim();
            if (text.includes('Challenge Mode')) {
                label.innerHTML = label.innerHTML.replace(/Challenge Mode ⚡/, t.challengeMode);
            }
            if (text.includes('High Contrast')) {
                label.innerHTML = label.innerHTML.replace(/High Contrast/, t.highContrast);
            }
        });

        // Update select labels
        const levelLabel = document.querySelector('label[for="level-select"]');
        if (levelLabel) levelLabel.textContent = t.selectLevel;
        
        const topicLabel = document.querySelector('label[for="topic-select"]');
        if (topicLabel) topicLabel.textContent = t.selectTopic;
    }

    toggleHighContrast() {
        this.highContrast = !this.highContrast;
        localStorage.setItem('rafikimaths_high_contrast', this.highContrast.toString());
        
        if (this.highContrast) {
            this.enableHighContrast();
        } else {
            this.disableHighContrast();
        }
    }

    enableHighContrast() {
        document.body.classList.add('high-contrast');
    }

    disableHighContrast() {
        document.body.classList.remove('high-contrast');
    }

    translate(key) {
        return translations[this.currentLanguage][key] || translations.en[key] || key;
    }
}

// Global accessibility manager
window.accessibilityManager = new AccessibilityManager();