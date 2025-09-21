<template>
  <div class="fold-out-menu" :class="{ 'open': isOpen }">
    <div class="menu-overlay" @click="$emit('close')"></div>
    <div class="menu-content">
      <div class="menu-header">
        <h2 class="menu-title">Navigation</h2>
        <button @click="$emit('close')" class="close-button">
          <span></span>
          <span></span>
        </button>
      </div>
      
      <nav class="menu-nav">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path" 
          @click="$emit('close')"
          class="menu-item"
        >
          <div class="menu-item-icon">{{ item.icon }}</div>
          <div class="menu-item-content">
            <h3 class="menu-item-title">{{ item.title }}</h3>
            <p class="menu-item-description">{{ item.description }}</p>
          </div>
          <div class="menu-item-arrow">→</div>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MenuItem {
  path: string
  title: string
  description: string
  icon: string
}

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()

const menuItems: MenuItem[] = [
  {
    path: '/',
    title: 'Home',
    description: 'Main dashboard and overview',
    icon: '🏠'
  },
  {
    path: '/database-interaction',
    title: 'Database Interaction',
    description: 'Manage and interact with your database',
    icon: '🗄️'
  }
]
</script>

<style scoped>
.fold-out-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
  transition: all 0.3s ease;
}

.fold-out-menu.open {
  pointer-events: all;
}

.menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fold-out-menu.open .menu-overlay {
  opacity: 1;
}

.menu-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.3);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.fold-out-menu.open .menu-content {
  transform: translateX(0);
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.menu-title {
  font-size: 24px;
  font-weight: 700;
  color: #f7fafc;
  margin: 0;
}

.close-button {
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
}

.close-button span {
  position: absolute;
  width: 20px;
  height: 2px;
  background: #a0aec0;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.close-button span:nth-child(1) {
  transform: rotate(45deg);
}

.close-button span:nth-child(2) {
  transform: rotate(-45deg);
}

.close-button:hover span {
  background: #f7fafc;
}

.menu-nav {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  position: relative;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-left-color: #667eea;
}

.menu-item.router-link-active {
  background: rgba(102, 126, 234, 0.1);
  border-left-color: #667eea;
}

.menu-item-icon {
  font-size: 24px;
  margin-right: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  flex-shrink: 0;
}

.menu-item-content {
  flex: 1;
  min-width: 0;
}

.menu-item-title {
  font-size: 16px;
  font-weight: 600;
  color: #f7fafc;
  margin: 0 0 4px 0;
}

.menu-item-description {
  font-size: 14px;
  color: #a0aec0;
  margin: 0;
  line-height: 1.4;
}

.menu-item-arrow {
  font-size: 18px;
  color: #a0aec0;
  transition: all 0.3s ease;
  margin-left: 12px;
}

.menu-item:hover .menu-item-arrow {
  color: #667eea;
  transform: translateX(4px);
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .menu-content {
    width: 100%;
  }
  
  .menu-header {
    padding: 20px;
  }
  
  .menu-title {
    font-size: 20px;
  }
  
  .menu-item {
    padding: 16px 20px;
  }
  
  .menu-item-icon {
    font-size: 20px;
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  
  .menu-item-title {
    font-size: 15px;
  }
  
  .menu-item-description {
    font-size: 13px;
  }
}

/* Custom scrollbar for menu */
.menu-nav::-webkit-scrollbar {
  width: 4px;
}

.menu-nav::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.menu-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.menu-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
