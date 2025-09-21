<template>
  <div class="page-container">
    <div class="background-gradient"></div>
    
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>
    <div class="floating-orb orb-3"></div>
    
    <div class="main-content">
      <header class="glass-header">
        <div class="header-content">
          <h1 class="app-title">Settings</h1>
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
            <h2 class="welcome-title">Settings</h2>
            <p class="welcome-subtitle">Customize your experience and preferences</p>
          </div>
          
          <div class="settings-content">
            <div class="settings-section">
              <h3 class="section-title">🎨 Appearance</h3>
              <div class="settings-group">
                <div class="setting-item">
                  <div class="setting-info">
                    <h4 class="setting-name">Dark Mode</h4>
                    <p class="setting-description">Switch between light and dark themes</p>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="settings.darkMode">
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                
                <div class="setting-item">
                  <div class="setting-info">
                    <h4 class="setting-name">Animations</h4>
                    <p class="setting-description">Enable or disable smooth animations</p>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="settings.animations">
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                
                <div class="setting-item">
                  <div class="setting-info">
                    <h4 class="setting-name">Theme Color</h4>
                    <p class="setting-description">Choose your preferred accent color</p>
                  </div>
                  <div class="color-picker">
                    <button 
                      v-for="color in themeColors" 
                      :key="color.name"
                      @click="settings.themeColor = color.value"
                      class="color-option"
                      :class="{ active: settings.themeColor === color.value }"
                      :style="{ backgroundColor: color.value }"
                      :title="color.name"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="settings-section">
              <h3 class="section-title">🔔 Notifications</h3>
              <div class="settings-group">
                <div class="setting-item">
                  <div class="setting-info">
                    <h4 class="setting-name">Email Notifications</h4>
                    <p class="setting-description">Receive updates via email</p>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="settings.emailNotifications">
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                
                <div class="setting-item">
                  <div class="setting-info">
                    <h4 class="setting-name">Push Notifications</h4>
                    <p class="setting-description">Get notified about important updates</p>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="settings.pushNotifications">
                    <span class="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div class="settings-section">
              <h3 class="section-title">⚙️ General</h3>
              <div class="settings-group">
                <div class="setting-item">
                  <div class="setting-info">
                    <h4 class="setting-name">Language</h4>
                    <p class="setting-description">Select your preferred language</p>
                  </div>
                  <select v-model="settings.language" class="setting-select">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
                
                <div class="setting-item">
                  <div class="setting-info">
                    <h4 class="setting-name">Auto-save</h4>
                    <p class="setting-description">Automatically save your changes</p>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="settings.autoSave">
                    <span class="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div class="settings-actions">
              <button @click="resetSettings" class="action-button secondary">Reset to Default</button>
              <button @click="saveSettings" class="action-button primary">Save Changes</button>
            </div>
          </div>
        </div>
      </main>
    </div>
    
    <FoldOutMenu :isOpen="isMenuOpen" @close="isMenuOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import FoldOutMenu from '../components/FoldOutMenu.vue'

const isMenuOpen = ref(false)

const settings = reactive({
  darkMode: true,
  animations: true,
  themeColor: '#667eea',
  emailNotifications: true,
  pushNotifications: false,
  language: 'en',
  autoSave: true
})

const themeColors = [
  { name: 'Blue', value: '#667eea' },
  { name: 'Purple', value: '#764ba2' },
  { name: 'Green', value: '#10b981' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Pink', value: '#ec4899' }
]

const saveSettings = () => {
  // Save settings to localStorage or send to server
  localStorage.setItem('central-settings', JSON.stringify(settings))
  alert('Settings saved successfully!')
}

const resetSettings = () => {
  Object.assign(settings, {
    darkMode: true,
    animations: true,
    themeColor: '#667eea',
    emailNotifications: true,
    pushNotifications: false,
    language: 'en',
    autoSave: true
  })
  alert('Settings reset to default!')
}

// Load settings on mount
const loadSettings = () => {
  const saved = localStorage.getItem('central-settings')
  if (saved) {
    Object.assign(settings, JSON.parse(saved))
  }
}

loadSettings()
</script>

<style scoped>
.settings-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.settings-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #f7fafc;
  margin: 0 0 20px 0;
}

.settings-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info {
  flex: 1;
}

.setting-name {
  font-size: 16px;
  font-weight: 600;
  color: #f7fafc;
  margin: 0 0 4px 0;
}

.setting-description {
  font-size: 14px;
  color: #a0aec0;
  margin: 0;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #4a5568;
  transition: 0.3s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #667eea;
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

.color-picker {
  display: flex;
  gap: 8px;
}

.color-option {
  width: 32px;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: #f7fafc;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
}

.setting-select {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #f7fafc;
  font-size: 14px;
  cursor: pointer;
}

.setting-select:focus {
  outline: none;
  border-color: #667eea;
}

.settings-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 20px;
}

.action-button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-button.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.action-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.action-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #a0aec0;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #f7fafc;
}

@media (max-width: 768px) {
  .settings-actions {
    flex-direction: column;
  }
  
  .action-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .settings-section {
    padding: 20px;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .color-picker {
    flex-wrap: wrap;
  }
}
</style>
