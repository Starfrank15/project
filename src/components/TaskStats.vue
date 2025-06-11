<template>
  <div class="stats-container">
    <div class="stats-card">
      <div class="stat-item">
        <div class="stat-number">{{ stats.total }}</div>
        <div class="stat-label">Total Tasks</div>
      </div>
      
      <div class="stat-item">
        <div class="stat-number text-blue">{{ stats.active }}</div>
        <div class="stat-label">Active</div>
      </div>
      
      <div class="stat-item">
        <div class="stat-number text-green">{{ stats.completed }}</div>
        <div class="stat-label">Completed</div>
      </div>
      
      <div class="stat-item">
        <div class="stat-number text-purple">{{ stats.completionPercentage }}%</div>
        <div class="stat-label">Progress</div>
      </div>
    </div>
    
    <div v-if="stats.total > 0" class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${stats.completionPercentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.stats-container {
  margin-bottom: 2rem;
}

.stats-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.stat-number.text-blue {
  color: #3b82f6;
}

.stat-number.text-green {
  color: #10b981;
}

.stat-number.text-purple {
  color: #8b5cf6;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.progress-bar {
  background-color: #e5e7eb;
  border-radius: 8px;
  height: 8px;
  margin-top: 1rem;
  overflow: hidden;
}

.progress-fill {
  background: linear-gradient(90deg, #3b82f6, #10b981);
  height: 100%;
  border-radius: 8px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .stats-card {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
}
</style>