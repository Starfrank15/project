<template>
  <div class="app">
    <header class="app-header">
      <div class="container">
        <h1 class="app-title">
          📝 Task Manager
        </h1>
        <p class="app-subtitle">
          Organize your tasks with ease
        </p>
      </div>
    </header>

    <main class="app-main">
      <div class="container">
        <!-- Task Statistics -->
        <TaskStats :stats="taskStats" />

        <!-- Task Form -->
        <TaskForm
          :editing-task="editingTask"
          @submit="handleTaskSubmit"
          @cancel="handleCancelEdit"
        />

        <!-- Task Filters -->
        <TaskFilters
          v-model="filter"
          :stats="taskStats"
          @clear-completed="clearCompleted"
        />

        <!-- Task List -->
        <div class="task-list">
          <div v-if="filteredTasks.length === 0" class="empty-state">
            <div class="empty-icon">📋</div>
            <h3 class="empty-title">
              {{ getEmptyStateMessage() }}
            </h3>
            <p class="empty-description">
              {{ getEmptyStateDescription() }}
            </p>
          </div>

          <TransitionGroup
            v-else
            name="task"
            tag="div"
            class="task-container"
          >
            <TaskItem
              v-for="task in filteredTasks"
              :key="task.id"
              :task="task"
              @toggle="toggleComplete"
              @edit="handleEditTask"
              @delete="deleteTask"
            />
          </TransitionGroup>
        </div>
      </div>
    </main>

    <footer class="app-footer">
      <div class="container">
        <p>&copy; 2025 Task Manager. Built with Vue 3 & JavaScript</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTasks } from './composables/useTasks';
import TaskForm from './components/TaskForm.vue';
import TaskItem from './components/TaskItem.vue';
import TaskStats from './components/TaskStats.vue';
import TaskFilters from './components/TaskFilters.vue';

const {
  filter,
  filteredTasks,
  taskStats,
  addTask,
  updateTask,
  deleteTask,
  toggleComplete,
  clearCompleted,
} = useTasks();

const editingTask = ref(null);

const handleTaskSubmit = (taskData) => {
  if (editingTask.value) {
    updateTask(editingTask.value.id, taskData);
    editingTask.value = null;
  } else {
    addTask(taskData);
  }
};

const handleEditTask = (task) => {
  editingTask.value = task;
  // Scroll to form
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleCancelEdit = () => {
  editingTask.value = null;
};

const getEmptyStateMessage = () => {
  switch (filter.value) {
    case 'active':
      return 'No active tasks';
    case 'completed':
      return 'No completed tasks';
    default:
      return 'No tasks yet';
  }
};

const getEmptyStateDescription = () => {
  switch (filter.value) {
    case 'active':
      return 'All your tasks are completed! Great job! 🎉';
    case 'completed':
      return 'Complete some tasks to see them here.';
    default:
      return 'Create your first task to get started.';
  }
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem 0;
  text-align: center;
  color: white;
}

.app-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-subtitle {
  font-size: 1.125rem;
  margin: 0;
  opacity: 0.9;
}

.app-main {
  flex: 1;
  padding: 2rem 0;
}

.task-list {
  min-height: 200px;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.empty-description {
  color: #6b7280;
  margin: 0;
}

.app-footer {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  text-align: center;
  color: white;
  opacity: 0.8;
}

.app-footer p {
  margin: 0;
  font-size: 0.875rem;
}

/* Task Transition Animations */
.task-enter-active {
  transition: all 0.3s ease;
}

.task-leave-active {
  transition: all 0.3s ease;
}

.task-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.task-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.task-move {
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .app-title {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 0.75rem;
  }
  
  .app-main {
    padding: 1rem 0;
  }
}
</style>