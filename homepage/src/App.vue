<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import FoldOutMenu from './components/FoldOutMenu.vue'
import './styles/app.css'

const isMenuOpen = ref(false)

// Menu controls
const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <div class="app-container">
    <!-- Background with animated gradient -->
    <div class="background-gradient"></div>
    
    <!-- Floating orbs for visual interest -->
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>
    <div class="floating-orb orb-3"></div>
    
    <!-- Main content container -->
    <div class="main-content">
      <!-- Header with glass morphism -->
      <header class="glass-header">
        <div class="header-content">
          <h1 class="app-title">Central</h1>
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

      <!-- Router view for different pages -->
      <RouterView />
    </div>
    
    <!-- Fold-out menu -->
    <FoldOutMenu 
      :isOpen="isMenuOpen" 
      @close="closeMenu" 
    />
  </div>
</template>

