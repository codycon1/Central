<template>
  <div class="page-container">
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
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

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

<style scoped>
/* All the existing styles from App.vue are now in the global CSS file */
</style>
