<template>
  <div class="page-container">
    <div class="background-gradient"></div>
    
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>
    <div class="floating-orb orb-3"></div>
    
    <div class="main-content">
      <header class="glass-header">
        <div class="header-content">
          <h1 class="app-title">Contact</h1>
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
            <h2 class="welcome-title">Get In Touch</h2>
            <p class="welcome-subtitle">We'd love to hear from you. Send us a message!</p>
          </div>
          
          <div class="contact-content">
            <div class="contact-info">
              <div class="contact-card">
                <div class="contact-icon">📧</div>
                <h3 class="contact-title">Email</h3>
                <p class="contact-details">hello@central.app</p>
                <p class="contact-subtitle">We'll respond within 24 hours</p>
              </div>
              
              <div class="contact-card">
                <div class="contact-icon">💬</div>
                <h3 class="contact-title">Live Chat</h3>
                <p class="contact-details">Available 9AM - 6PM EST</p>
                <p class="contact-subtitle">Get instant support</p>
              </div>
              
              <div class="contact-card">
                <div class="contact-icon">📱</div>
                <h3 class="contact-title">Phone</h3>
                <p class="contact-details">+1 (555) 123-4567</p>
                <p class="contact-subtitle">Mon-Fri 9AM-5PM EST</p>
              </div>
            </div>
            
            <div class="contact-form-container">
              <form @submit.prevent="submitForm" class="contact-form">
                <h3 class="form-title">Send us a message</h3>
                
                <div class="form-group">
                  <label for="name" class="form-label">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name"
                    class="form-input"
                    placeholder="Your full name"
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email"
                    class="form-input"
                    placeholder="your.email@example.com"
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label for="subject" class="form-label">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    v-model="form.subject"
                    class="form-input"
                    placeholder="What's this about?"
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label for="message" class="form-label">Message</label>
                  <textarea 
                    id="message" 
                    v-model="form.message"
                    class="form-textarea"
                    placeholder="Tell us more about your inquiry..."
                    rows="5"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" class="submit-button" :disabled="isSubmitting">
                  <span v-if="!isSubmitting">Send Message</span>
                  <span v-else>Sending...</span>
                </button>
              </form>
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
const isSubmitting = ref(false)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  
  isSubmitting.value = false
  
  // Show success message (you could add a toast notification here)
  alert('Message sent successfully!')
}
</script>

<style scoped>
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.contact-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.contact-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.contact-title {
  font-size: 18px;
  font-weight: 600;
  color: #f7fafc;
  margin: 0 0 8px 0;
}

.contact-details {
  font-size: 16px;
  color: #a0aec0;
  margin: 0 0 4px 0;
  font-weight: 500;
}

.contact-subtitle {
  font-size: 14px;
  color: #718096;
  margin: 0;
}

.contact-form-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.form-title {
  font-size: 20px;
  font-weight: 600;
  color: #f7fafc;
  margin: 0 0 24px 0;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #f7fafc;
  margin-bottom: 8px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #f7fafc;
  font-size: 14px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #a0aec0;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .contact-form-container {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .contact-card {
    padding: 20px;
  }
  
  .contact-form-container {
    padding: 20px;
  }
  
  .form-input,
  .form-textarea {
    padding: 10px 12px;
  }
  
  .submit-button {
    padding: 14px;
    font-size: 15px;
  }
}
</style>
