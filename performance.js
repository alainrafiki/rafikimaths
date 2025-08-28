// performance.js

class PerformanceTracker {
    constructor() {
        this.currentSession = {
            startTime: null,
            totalQuestions: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            averageTime: 0,
            topicStats: {},
            streakRecord: 0
        };
        this.allTimeStats = this.loadAllTimeStats();
    }

    loadAllTimeStats() {
        const saved = localStorage.getItem('rafikimaths_alltime_stats');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            totalSessions: 0,
            totalQuestions: 0,
            totalCorrect: 0,
            averageAccuracy: 0,
            favoriteTopics: {},
            weakAreas: {},
            bestStreak: 0,
            totalPlayTime: 0
        };
    }

    saveAllTimeStats() {
        localStorage.setItem('rafikimaths_alltime_stats', JSON.stringify(this.allTimeStats));
    }

    startSession() {
        this.currentSession = {
            startTime: Date.now(),
            totalQuestions: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            averageTime: 0,
            topicStats: {},
            streakRecord: 0
        };
    }

    recordAnswer(isCorrect, topic, timeSpent) {
        this.currentSession.totalQuestions++;
        
        if (isCorrect) {
            this.currentSession.correctAnswers++;
        } else {
            this.currentSession.incorrectAnswers++;
        }

        // Track topic performance
        if (!this.currentSession.topicStats[topic]) {
            this.currentSession.topicStats[topic] = { correct: 0, total: 0 };
        }
        this.currentSession.topicStats[topic].total++;
        if (isCorrect) {
            this.currentSession.topicStats[topic].correct++;
        }

        // Update average time (simplified)
        this.currentSession.averageTime = 
            (this.currentSession.averageTime * (this.currentSession.totalQuestions - 1) + timeSpent) 
            / this.currentSession.totalQuestions;
    }

    updateStreak(currentStreak) {
        if (currentStreak > this.currentSession.streakRecord) {
            this.currentSession.streakRecord = currentStreak;
        }
    }

    endSession() {
        const sessionDuration = Date.now() - this.currentSession.startTime;
        
        // Update all-time stats
        this.allTimeStats.totalSessions++;
        this.allTimeStats.totalQuestions += this.currentSession.totalQuestions;
        this.allTimeStats.totalCorrect += this.currentSession.correctAnswers;
        this.allTimeStats.averageAccuracy = 
            (this.allTimeStats.totalCorrect / this.allTimeStats.totalQuestions) * 100;
        
        if (this.currentSession.streakRecord > this.allTimeStats.bestStreak) {
            this.allTimeStats.bestStreak = this.currentSession.streakRecord;
        }

        this.allTimeStats.totalPlayTime += sessionDuration;

        // Update topic preferences
        Object.keys(this.currentSession.topicStats).forEach(topic => {
            const stats = this.currentSession.topicStats[topic];
            const accuracy = (stats.correct / stats.total) * 100;
            
            if (!this.allTimeStats.favoriteTopics[topic]) {
                this.allTimeStats.favoriteTopics[topic] = { sessions: 0, accuracy: 0 };
            }
            
            this.allTimeStats.favoriteTopics[topic].sessions++;
            this.allTimeStats.favoriteTopics[topic].accuracy = 
                (this.allTimeStats.favoriteTopics[topic].accuracy + accuracy) / 2;

            // Track weak areas (accuracy < 70%)
            if (accuracy < 70) {
                if (!this.allTimeStats.weakAreas[topic]) {
                    this.allTimeStats.weakAreas[topic] = 0;
                }
                this.allTimeStats.weakAreas[topic]++;
            }
        });

        this.saveAllTimeStats();
        return this.getSessionReport();
    }

    getSessionReport() {
        const accuracy = (this.currentSession.correctAnswers / this.currentSession.totalQuestions) * 100;
        const sessionTime = Date.now() - this.currentSession.startTime;
        
        return {
            accuracy: accuracy.toFixed(1),
            totalQuestions: this.currentSession.totalQuestions,
            correctAnswers: this.currentSession.correctAnswers,
            sessionTime: Math.round(sessionTime / 1000),
            averageTime: Math.round(this.currentSession.averageTime / 1000),
            bestStreak: this.currentSession.streakRecord,
            topicBreakdown: this.currentSession.topicStats
        };
    }

    getPersonalizedRecommendations() {
        const recommendations = [];
        
        // Check weak areas
        const weakTopics = Object.keys(this.allTimeStats.weakAreas)
            .sort((a, b) => this.allTimeStats.weakAreas[b] - this.allTimeStats.weakAreas[a])
            .slice(0, 2);

        weakTopics.forEach(topic => {
            recommendations.push(`Focus on ${topic} - you've struggled with this topic recently`);
        });

        // Check if accuracy is low
        if (this.allTimeStats.averageAccuracy < 70) {
            recommendations.push("Try practicing at an easier level to build confidence");
        }

        // Suggest challenge mode if doing well
        if (this.allTimeStats.averageAccuracy > 85) {
            recommendations.push("Great job! Try Challenge Mode for an extra challenge");
        }

        // Encourage streak building
        if (this.allTimeStats.bestStreak < 5) {
            recommendations.push("Work on building longer streaks by focusing on accuracy");
        }

        return recommendations.length > 0 ? recommendations : ["Keep practicing! You're doing great!"];
    }

    showPerformanceReport() {
        const report = this.getSessionReport();
        const recommendations = this.getPersonalizedRecommendations();
        
        const reportHTML = `
            <div class="performance-report">
                <h3>Session Complete! 📊</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Accuracy:</span>
                        <span class="stat-value">${report.accuracy}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Questions:</span>
                        <span class="stat-value">${report.correctAnswers}/${report.totalQuestions}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Best Streak:</span>
                        <span class="stat-value">${report.bestStreak} 🔥</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Session Time:</span>
                        <span class="stat-value">${report.sessionTime}s</span>
                    </div>
                </div>
                <div class="recommendations">
                    <h4>Recommendations:</h4>
                    <ul>
                        ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                <button onclick="closePerformanceReport()">Continue Learning</button>
            </div>
        `;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'report-overlay';
        overlay.innerHTML = reportHTML;
        document.body.appendChild(overlay);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                overlay.remove();
            }
        }, 10000);
    }
}

function closePerformanceReport() {
    const overlay = document.querySelector('.report-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Global performance tracker instance
window.performanceTracker = new PerformanceTracker();