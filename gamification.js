// gamification.js

class GameSystem {
    constructor() {
        this.score = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.badges = [];
        this.loadProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem('rafikimaths_progress');
        if (saved) {
            const data = JSON.parse(saved);
            this.score = data.score || 0;
            this.maxStreak = data.maxStreak || 0;
            this.badges = data.badges || [];
        }
    }

    saveProgress() {
        const data = {
            score: this.score,
            maxStreak: this.maxStreak,
            badges: this.badges
        };
        localStorage.setItem('rafikimaths_progress', JSON.stringify(data));
    }

    addPoints(points) {
        this.score += points;
        this.updateScoreDisplay();
        this.saveProgress();
    }

    incrementStreak() {
        this.streak++;
        if (this.streak > this.maxStreak) {
            this.maxStreak = this.streak;
        }
        this.updateStreakDisplay();
        this.checkBadges();
        this.saveProgress();
    }

    resetStreak() {
        this.streak = 0;
        this.updateStreakDisplay();
    }

    checkBadges() {
        const newBadges = [];
        
        // First steps badge
        if (this.score >= 10 && !this.badges.includes('first-steps')) {
            newBadges.push('first-steps');
            this.badges.push('first-steps');
        }
        
        // Streak master badge
        if (this.streak >= 5 && !this.badges.includes('streak-master')) {
            newBadges.push('streak-master');
            this.badges.push('streak-master');
        }
        
        // Perfect ten badge
        if (this.maxStreak >= 10 && !this.badges.includes('perfect-ten')) {
            newBadges.push('perfect-ten');
            this.badges.push('perfect-ten');
        }
        
        // Math whiz badge
        if (this.score >= 100 && !this.badges.includes('math-whiz')) {
            newBadges.push('math-whiz');
            this.badges.push('math-whiz');
        }

        if (newBadges.length > 0) {
            this.showBadgeEarned(newBadges);
        }
    }

    showBadgeEarned(badges) {
        const badgeNames = {
            'first-steps': '🌟 First Steps!',
            'streak-master': '🔥 Streak Master!',
            'perfect-ten': '💎 Perfect Ten!',
            'math-whiz': '🧠 Math Whiz!'
        };

        badges.forEach(badge => {
            const badgeElement = document.createElement('div');
            badgeElement.className = 'badge-notification';
            badgeElement.innerHTML = `
                <div class="badge-content">
                    <h3>Badge Earned!</h3>
                    <p>${badgeNames[badge]}</p>
                </div>
            `;
            document.body.appendChild(badgeElement);

            setTimeout(() => {
                badgeElement.remove();
            }, 3000);
        });
    }

    updateScoreDisplay() {
        const scoreElement = document.getElementById('score-display');
        if (scoreElement) {
            scoreElement.textContent = `Score: ${this.score}`;
        }
    }

    updateStreakDisplay() {
        const streakElement = document.getElementById('streak-display');
        if (streakElement) {
            streakElement.textContent = `Streak: ${this.streak} 🔥`;
        }
    }

    getBadgesHTML() {
        const badgeIcons = {
            'first-steps': '🌟',
            'streak-master': '🔥',
            'perfect-ten': '💎',
            'math-whiz': '🧠'
        };

        return this.badges.map(badge => 
            `<span class="badge-icon" title="${badge}">${badgeIcons[badge]}</span>`
        ).join('');
    }

    initializeDisplay() {
        this.updateScoreDisplay();
        this.updateStreakDisplay();
        
        const badgesContainer = document.getElementById('badges-display');
        if (badgesContainer) {
            badgesContainer.innerHTML = this.getBadgesHTML();
        }
    }
}

// Global game system instance
window.gameSystem = new GameSystem();