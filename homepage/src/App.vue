<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const isMenuOpen = ref(false)

// Stopwatch state
const time = ref(0) // time in centiseconds
const isRunning = ref(false)
const intervalId = ref<ReturnType<typeof setInterval> | null>(null)

// Format time for display (MM:SS:CC)
const formatTime = (centiseconds: number) => {
  const minutes = Math.floor(centiseconds / 6000)
  const seconds = Math.floor((centiseconds % 6000) / 100)
  const cs = centiseconds % 100
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${cs.toString().padStart(2, '0')}`
}

// Get individual digits for 8-segment display
const getTimeDigits = () => {
  const formatted = formatTime(time.value)
  return formatted.replace(/:/g, '').split('').map(d => parseInt(d))
}

// 8-segment display mapping for digits 0-9

// Mapping of digits (0-9) to their active segments for a 7-segment display.
// Each key is a digit, and the value is an array of segment labels ('a' to 'g') that should be lit up
// to visually represent that digit on the display.
//
// Segment labels typically correspond to:
//  a
// f b
//  g
// e c
//  d
//
// For example, the digit 8 lights up all segments ('a' through 'g'), while 1 only lights up 'b' and 'c'.
const segmentMap: { [key: number]: string[] } = {
  0: ['a', 'b', 'c', 'd', 'e', 'f'],           // All except 'g' (middle bar)
  1: ['b', 'c'],                               // Only right vertical bars
  2: ['a', 'b', 'g', 'e', 'd'],                // Top, upper right, middle, lower left, bottom
  3: ['a', 'b', 'g', 'c', 'd'],                // Top, upper right, middle, lower right, bottom
  4: ['f', 'g', 'b', 'c'],                     // Upper left, middle, upper right, lower right
  5: ['a', 'f', 'g', 'c', 'd'],                // Top, upper left, middle, lower right, bottom
  6: ['a', 'f', 'g', 'e', 'd', 'c'],           // All except upper right
  7: ['a', 'b', 'c'],                          // Top, upper right, lower right
  8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],      // All segments
  9: ['a', 'b', 'c', 'd', 'f', 'g']            // All except lower left
}

// Check if a segment should be active for a given digit
const isSegmentActive = (digit: number, segment: string) => {
  return segmentMap[digit]?.includes(segment) || false
}

// Stopwatch controls
const startStopwatch = () => {
  if (!isRunning.value) {
    isRunning.value = true
    intervalId.value = setInterval(() => {
      time.value++
    }, 10) // 10ms = 1 centisecond
  }
}

const stopStopwatch = () => {
  if (isRunning.value) {
    isRunning.value = false
    if (intervalId.value) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
  }
}

const resetStopwatch = () => {
  stopStopwatch()
  time.value = 0
}

// Cleanup on component unmount
onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})
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

      <!-- Main card with glass effect -->
      <main class="main-card">
        <div class="card-content">
          <div class="welcome-section">
            <h2 class="welcome-title">Welcome!</h2>
            <p class="welcome-subtitle">Below are a series of small snippets with vue.js</p>
          </div>
          
          <div class="feature-cards">
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3 class="feature-title">Fast & Modern</h3>
              <p class="feature-description">Built with Vue 3</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h3 class="feature-title">Neat Design</h3>
              <p class="feature-description">Tailwind CSS gives the site quick and easy styling</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h3 class="feature-title">Mobile First</h3>
              <p class="feature-description">Easily optimized for mobile interfaces</p>
            </div>
          </div>
          
          <!-- Stopwatch Section -->
          <div class="stopwatch-section">
            <h3 class="stopwatch-title">Stopwatch</h3>
            
            <!-- 8-Segment Display -->
            <div class="display-container">
              <div class="eight-segment-display">
                <template v-for="(digit, index) in getTimeDigits()" :key="index">
                  <div class="digit-container">
                    <div class="segment" :class="{ active: isSegmentActive(digit, 'a') }"></div>
                    <div class="segment" :class="{ active: isSegmentActive(digit, 'b') }"></div>
                    <div class="segment" :class="{ active: isSegmentActive(digit, 'c') }"></div>
                    <div class="segment" :class="{ active: isSegmentActive(digit, 'd') }"></div>
                    <div class="segment" :class="{ active: isSegmentActive(digit, 'e') }"></div>
                    <div class="segment" :class="{ active: isSegmentActive(digit, 'f') }"></div>
                    <div class="segment" :class="{ active: isSegmentActive(digit, 'g') }"></div>
                    <div class="segment" :class="{ active: isSegmentActive(digit, 'h') }"></div>
                  </div>
                  <!-- Add colons between time parts -->
                  <div v-if="index === 1 || index === 3" class="colon">:</div>
                </template>
              </div>
            </div>
            
            <!-- Stopwatch Controls -->
            <div class="stopwatch-controls">
              <button 
                @click="isRunning ? stopStopwatch() : startStopwatch()"
                class="control-button start-stop"
                :class="{ running: isRunning }"
              >
                {{ isRunning ? 'Stop' : 'Start' }}
              </button>
              <button 
                @click="resetStopwatch"
                class="control-button reset"
              >
                Reset
              </button>
            </div>
          </div>
          
          <div class="action-section">
            <a 
              href="https://vuejs.org/" 
              target="_blank" 
              rel="noopener" 
              class="primary-button"
            >
              <span>vue.js</span>
              <div class="button-glow"></div>
            </a>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.background-gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    #667eea 0%, 
    #764ba2 25%, 
    #f093fb 50%, 
    #f5576c 75%, 
    #4facfe 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  z-index: -1;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.floating-orb {
  position: fixed;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  animation: float 6s ease-in-out infinite;
  z-index: 0;
}

.orb-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: -50px;
  animation-delay: 0s;
}

.orb-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: -30px;
  animation-delay: 2s;
}

.orb-3 {
  width: 100px;
  height: 100px;
  top: 30%;
  right: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.main-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.glass-header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
}

.app-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.menu-button {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.menu-button span {
  width: 100%;
  height: 3px;
  background: #6b7280;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.menu-button.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.menu-button.active span:nth-child(2) {
  opacity: 0;
}

.menu-button.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.main-card {
  flex: 1;
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 50%, #1a202c 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.card-content {
  padding: 32px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
}

.welcome-title {
  font-size: 36px;
  font-weight: 800;
  color: #f7fafc;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.welcome-subtitle {
  font-size: 18px;
  color: #a0aec0;
  margin: 0;
  font-weight: 400;
}

.feature-cards {
  display: grid;
  gap: 16px;
  margin-bottom: 40px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.feature-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.feature-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: #f7fafc;
  margin: 0 0 8px 0;
}

.feature-description {
  font-size: 14px;
  color: #a0aec0;
  margin: 0;
  line-height: 1.5;
}

.action-section {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.primary-button {
  position: relative;
  display: inline-block;
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.button-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.primary-button:hover .button-glow {
  left: 100%;
}

.success-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 50px;
  color: rgba(34, 197, 94, 0.9);
  font-weight: 500;
  font-size: 14px;
}

.badge-icon {
  font-size: 16px;
}

/* Stopwatch Section Styles */
.stopwatch-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.stopwatch-title {
  font-size: 20px;
  font-weight: 600;
  color: #f7fafc;
  margin: 0 0 20px 0;
}

.display-container {
  margin-bottom: 20px;
}

.eight-segment-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: #000;
  border-radius: 12px;
  padding: 20px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.digit-container {
  position: relative;
  width: 40px;
  height: 60px;
  margin: 0 2px;
}

.segment {
  position: absolute;
  background: #333;
  border-radius: 2px;
  transition: background-color 0.1s ease;
}

.segment.active {
  background: #00ff00;
  box-shadow: 0 0 8px #00ff00;
}

/* Horizontal segments */
.segment:nth-child(1) { /* a */
  top: 0;
  left: 8px;
  width: 24px;
  height: 4px;
}

.segment:nth-child(4) { /* d */
  bottom: 0;
  left: 8px;
  width: 24px;
  height: 4px;
}

.segment:nth-child(7) { /* g */
  top: 50%;
  left: 8px;
  width: 24px;
  height: 4px;
  transform: translateY(-50%);
}

/* Vertical segments */
.segment:nth-child(2) { /* b */
  top: 4px;
  right: 0;
  width: 4px;
  height: 24px;
}

.segment:nth-child(3) { /* c */
  bottom: 4px;
  right: 0;
  width: 4px;
  height: 24px;
}

.segment:nth-child(5) { /* e */
  bottom: 4px;
  left: 0;
  width: 4px;
  height: 24px;
}

.segment:nth-child(6) { /* f */
  top: 4px;
  left: 0;
  width: 4px;
  height: 24px;
}

.segment:nth-child(8) { /* h - decimal point */
  bottom: 0;
  right: -8px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.colon {
  color: #00ff00;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 8px #00ff00;
  margin: 0 4px;
}

.stopwatch-controls {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.control-button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.control-button.start-stop {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.control-button.start-stop:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

.control-button.start-stop.running {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.control-button.start-stop.running:hover {
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
}

.control-button.reset {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: white;
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
}

.control-button.reset:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(107, 114, 128, 0.4);
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .main-content {
    padding: 16px;
  }
  
  .welcome-title {
    font-size: 28px;
  }
  
  .welcome-subtitle {
    font-size: 16px;
  }
  
  .feature-cards {
    gap: 12px;
  }
  
  .feature-card {
    padding: 16px;
  }
  
  .card-content {
    padding: 24px 20px;
  }
  
  .stopwatch-section {
    padding: 16px;
  }
  
  .eight-segment-display {
    padding: 12px;
    gap: 4px;
  }
  
  .digit-container {
    width: 32px;
    height: 48px;
  }
  
  .segment:nth-child(1) { /* a */
    left: 6px;
    width: 20px;
  }
  
  .segment:nth-child(4) { /* d */
    left: 6px;
    width: 20px;
  }
  
  .segment:nth-child(7) { /* g */
    left: 6px;
    width: 20px;
  }
  
  .colon {
    font-size: 20px;
  }
  
  .control-button {
    padding: 10px 16px;
    font-size: 12px;
    min-width: 70px;
  }
}

/* Smooth scrolling and performance */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
