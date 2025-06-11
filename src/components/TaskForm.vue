<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <div class="form-group">
      <input
        v-model="formData.title"
        type="text"
        placeholder="Task title..."
        class="form-input"
        required
      />
    </div>
    
    <div class="form-group">
      <textarea
        v-model="formData.description"
        placeholder="Task description (optional)..."
        class="form-textarea"
        rows="3"
      ></textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <select v-model="formData.priority" class="form-select">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <div class="form-group">
        <input
          v-model="formData.dueDate"
          type="date"
          class="form-input"
        />
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn-primary" :disabled="!formData.title.trim()">
        {{ editingTask ? 'Update Task' : 'Add Task' }}
      </button>
      <button
        v-if="editingTask"
        type="button"
        @click="cancelEdit"
        class="btn-secondary"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  editingTask: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['submit', 'cancel']);

const formData = reactive({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
  completed: false,
});

const resetForm = () => {
  formData.title = '';
  formData.description = '';
  formData.priority = 'medium';
  formData.dueDate = '';
  formData.completed = false;
};

const handleSubmit = () => {
  if (!formData.title.trim()) return;

  emit('submit', {
    title: formData.title.trim(),
    description: formData.description.trim(),
    priority: formData.priority,
    dueDate: formData.dueDate,
    completed: formData.completed,
  });

  if (!props.editingTask) {
    resetForm();
  }
};

const cancelEdit = () => {
  resetForm();
  emit('cancel');
};

watch(
  () => props.editingTask,
  (task) => {
    if (task) {
      formData.title = task.title;
      formData.description = task.description;
      formData.priority = task.priority;
      formData.dueDate = task.dueDate;
      formData.completed = task.completed;
    } else {
      resetForm();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.task-form {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>