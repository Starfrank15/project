<template>
  <div class="task-item" :class="{ 'completed': task.completed, [`priority-${task.priority}`]: true }">
    <div class="task-content">
      <div class="task-checkbox">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="$emit('toggle', task.id)"
          class="checkbox"
        />
      </div>
      
      <div class="task-details">
        <h3 class="task-title" :class="{ 'line-through': task.completed }">
          {{ task.title }}
        </h3>
        <p v-if="task.description" class="task-description">
          {{ task.description }}
        </p>
        
        <div class="task-meta">
          <span class="priority-badge" :class="`priority-${task.priority}`">
            {{ task.priority }}
          </span>
          <span v-if="task.dueDate" class="due-date" :class="{ 'overdue': isOverdue }">
            Due: {{ formatDate(task.dueDate) }}
          </span>
        </div>
      </div>
    </div>

    <div class="task-actions">
      <button
        @click="$emit('edit', task)"
        class="action-btn edit-btn"
        title="Edit task"
      >
        ✏️
      </button>
      <button
        @click="$emit('delete', task.id)"
        class="action-btn delete-btn"
        title="Delete task"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

defineEmits(['toggle', 'edit', 'delete']);

const isOverdue = computed(() => {
  if (!props.task.dueDate || props.task.completed) return false;
  return new Date(props.task.dueDate) < new Date();
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
</script>

<style scoped>
.task-item {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #e5e7eb;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.task-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.task-item.completed {
  opacity: 0.7;
  background-color: #f9fafb;
}

.task-item.priority-high {
  border-left-color: #ef4444;
}

.task-item.priority-medium {
  border-left-color: #f59e0b;
}

.task-item.priority-low {
  border-left-color: #10b981;
}

.task-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

.task-checkbox {
  padding-top: 0.125rem;
}

.checkbox {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  accent-color: #3b82f6;
}

.task-details {
  flex: 1;
}

.task-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  transition: all 0.2s ease;
}

.task-title.line-through {
  text-decoration: line-through;
  color: #6b7280;
}

.task-description {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.task-meta {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.priority-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.priority-badge.priority-high {
  background-color: #fee2e2;
  color: #dc2626;
}

.priority-badge.priority-medium {
  background-color: #fef3c7;
  color: #d97706;
}

.priority-badge.priority-low {
  background-color: #d1fae5;
  color: #059669;
}

.due-date {
  font-size: 0.8rem;
  color: #6b7280;
}

.due-date.overdue {
  color: #dc2626;
  font-weight: 500;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.task-item:hover .task-actions {
  opacity: 1;
}

.action-btn {
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: #f3f4f6;
}

.action-btn:hover {
  background-color: #e5e7eb;
  transform: scale(1.1);
}

.edit-btn:hover {
  background-color: #dbeafe;
}

.delete-btn:hover {
  background-color: #fee2e2;
}

@media (max-width: 768px) {
  .task-item {
    padding: 1rem;
  }
  
  .task-actions {
    opacity: 1;
  }
  
  .task-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>