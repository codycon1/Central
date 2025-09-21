<template>
  <div class="page-container">
    <div class="background-gradient"></div>
    
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>
    <div class="floating-orb orb-3"></div>
    
    <div class="main-content">
      <header class="glass-header">
        <div class="header-content">
          <h1 class="app-title">Projects</h1>
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
            <h2 class="welcome-title">Featured Projects</h2>
            <p class="welcome-subtitle">Explore our collection of interactive demos and applications</p>
          </div>
          
          <div class="projects-grid">
            <div class="project-card" v-for="project in projects" :key="project.id">
              <div class="project-image">
                <div class="project-icon">{{ project.icon }}</div>
              </div>
              <div class="project-content">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-tech">
                  <span 
                    v-for="tech in project.technologies" 
                    :key="tech"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
                <div class="project-actions">
                  <button class="project-button primary">View Demo</button>
                  <button class="project-button secondary">Source Code</button>
                </div>
              </div>
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

interface Project {
  id: number
  title: string
  description: string
  icon: string
  technologies: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Interactive Stopwatch',
    description: 'A precision stopwatch with 8-segment display and smooth animations built with Vue.js',
    icon: '⏱️',
    technologies: ['Vue.js', 'TypeScript', 'CSS3']
  },
  {
    id: 2,
    title: 'Glass Morphism UI',
    description: 'Modern glass morphism design system with backdrop filters and smooth transitions',
    icon: '🔮',
    technologies: ['CSS3', 'Glass Morphism', 'Animations']
  },
  {
    id: 3,
    title: 'Responsive Navigation',
    description: 'Smooth fold-out navigation menu with mobile-first responsive design',
    icon: '📱',
    technologies: ['Vue.js', 'CSS3', 'Mobile-First']
  },
  {
    id: 4,
    title: 'Animated Backgrounds',
    description: 'Dynamic gradient backgrounds with floating orbs and smooth animations',
    icon: '🎨',
    technologies: ['CSS3', 'Keyframes', 'Gradients']
  },
  {
    id: 5,
    title: 'Component Library',
    description: 'Reusable Vue components with TypeScript support and modern styling',
    icon: '🧩',
    technologies: ['Vue.js', 'TypeScript', 'Components']
  },
  {
    id: 6,
    title: 'Performance Optimized',
    description: 'Optimized for speed with lazy loading, code splitting, and efficient rendering',
    icon: '⚡',
    technologies: ['Performance', 'Optimization', 'Vue.js']
  }
]
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.project-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.project-image {
  text-align: center;
  margin-bottom: 16px;
}

.project-icon {
  font-size: 48px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.project-card:hover .project-icon {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.2);
}

.project-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-size: 20px;
  font-weight: 600;
  color: #f7fafc;
  margin: 0 0 12px 0;
}

.project-description {
  font-size: 14px;
  color: #a0aec0;
  line-height: 1.5;
  margin: 0 0 16px 0;
  flex: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tech-tag {
  padding: 4px 12px;
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 20px;
  font-size: 12px;
  color: #a0aec0;
  font-weight: 500;
}

.project-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.project-button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.project-button.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.project-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.project-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #a0aec0;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.project-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #f7fafc;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .project-card {
    padding: 20px;
  }
  
  .project-actions {
    flex-direction: column;
  }
  
  .project-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .project-card {
    padding: 16px;
  }
  
  .project-icon {
    font-size: 40px;
    width: 64px;
    height: 64px;
  }
  
  .project-title {
    font-size: 18px;
  }
  
  .project-description {
    font-size: 13px;
  }
}
</style>
