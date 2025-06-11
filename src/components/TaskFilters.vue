<template>
  <div class="filters-container">
    <div class="filter-buttons">
      <button
        v-for="filterOption in filterOptions"
        :key="filterOption.value"
        @click="$emit('update:modelValue', filterOption.value)"
        :class="[
          'filter-btn',
          { active: modelValue === filterOption.value }
        ]"
      >
        {{ filterOption.label }}
        <span v-if="filterOption.count !== undefined" class="count-badge">
          {{ filterOption.count }}
        </span>
      </button>
    </div>
    
    <div v-if="showClearCompleted" class="filter-actions">
      <button @click="$emit('clear-completed')" class="clear-btn">
        Clear Completed
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  stats: {
    type: Object,
    required: true
  }
});

defineEmits(['update:modelValue', 'clear-completed']);

const filterOptions = computed(() => [
  { value: 'all', label: 'All', count: props.stats.total },
  { value: 'active', label: 'Active', count: props.stats.active },
  { value: 'completed', label: 'Completed', count: props.stats.completed },
]);

const showClearCompleted = computed(() => props.stats.completed > 0);
</script>

<style scoped>
.filters-container {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #6b7280;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-1px);
}

.filter-btn.active {
  border-color: #3b82f6;
  background-color: #3b82f6;
  color: white;
}

.count-badge {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.375rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.filter-btn:not(.active) .count-badge {
  background-color: #f3f4f6;
  color: #6b7280;
}

.clear-btn {
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background-color: #dc2626;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .filters-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-buttons {
    justify-content: center;
  }
  
  .filter-actions {
    text-align: center;
  }
}
</style>