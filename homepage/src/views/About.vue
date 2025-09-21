<template>
  <div class="page-container">
    <div class="background-gradient"></div>
    
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>
    <div class="floating-orb orb-3"></div>
    
    <div class="main-content">
      <header class="glass-header">
        <div class="header-content">
          <h1 class="app-title">About</h1>
          <button 
            @click="isMenuOpen = !isMenuOpen"
            class="menu-button"
            :class="{ 'active': isMenuOpen }"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main class="main-card">
        <div class="card-content">
          <div class="welcome-section">
            <h2 class="welcome-title">About Central</h2>
            <p class="welcome-subtitle">A modern Vue.js application showcasing various features</p>
          </div>
          
          <div class="about-content">
            <div class="about-card">
              <h3 class="about-card-title">🎯 Mission</h3>
              <p class="about-card-text">
                Central is designed to demonstrate the power and flexibility of Vue.js 3 with modern web technologies. 
                It showcases various UI components, animations, and interactive features.
              </p>
            </div>
            
            <div class="about-card">
              <h3 class="about-card-title">🛠️ Technology Stack</h3>
              <div class="tech-list">
                <div class="tech-item">
                  <span class="tech-icon">⚡</span>
                  <span class="tech-name">Vue.js 3</span>
                  <span class="tech-desc">Progressive JavaScript framework</span>
                </div>
                <div class="tech-item">
                  <span class="tech-icon">🎨</span>
                  <span class="tech-name">CSS3</span>
                  <span class="tech-desc">Modern styling with animations</span>
                </div>
                <div class="tech-item">
                  <span class="tech-icon">📱</span>
                  <span class="tech-name">Responsive Design</span>
                  <span class="tech-desc">Mobile-first approach</span>
                </div>
                <div class="tech-item">
                  <span class="tech-icon">🔧</span>
                  <span class="tech-name">TypeScript</span>
                  <span class="tech-desc">Type-safe development</span>
                </div>
              </div>
            </div>
            
            <div class="about-card">
              <h3 class="about-card-title">✨ Features</h3>
              <ul class="features-list">
                <li>Interactive stopwatch with 8-segment display</li>
                <li>Glass morphism design elements</li>
                <li>Animated background gradients</li>
                <li>Responsive fold-out navigation menu</li>
                <li>Smooth transitions and animations</li>
                <li>Modern UI/UX patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
    
    <FoldOutMenu :isOpen="isMenuOpen" @close="isMenuOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FoldOutMenu from '../components/FoldOutMenu.vue'

const isMenuOpen = ref(false)
</script>

<style scoped>
.about-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.about-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.about-card-title {
  font-size: 20px;
  font-weight: 600;
  color: #f7fafc;
  margin: 0 0 16px 0;
}

.about-card-text {
  font-size: 16px;
  color: #a0aec0;
  line-height: 1.6;
  margin: 0;
}

.tech-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.tech-icon {
  font-size: 20px;
  width: 32px;
  text-align: center;
}

.tech-name {
  font-weight: 600;
  color: #f7fafc;
  min-width: 120px;
}

.tech-desc {
  color: #a0aec0;
  font-size: 14px;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  padding: 8px 0;
  color: #a0aec0;
  position: relative;
  padding-left: 24px;
}

.features-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

@media (max-width: 480px) {
  .about-card {
    padding: 16px;
  }
  
  .tech-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .tech-name {
    min-width: auto;
  }
}
</style>
