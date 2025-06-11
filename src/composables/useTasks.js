import { computed, ref } from 'vue';
import { useLocalStorage } from './useLocalStorage';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage('vue-tasks', []);
  const filter = ref('all');

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTasks([...tasks.value, newTask]);
  };

  const updateTask = (id, updates) => {
    const updatedTasks = tasks.value.map(task =>
      task.id === id
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.value.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const toggleComplete = (id) => {
    const task = tasks.value.find(t => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  };

  const clearCompleted = () => {
    const activeTasks = tasks.value.filter(task => !task.completed);
    setTasks(activeTasks);
  };

  const filteredTasks = computed(() => {
    switch (filter.value) {
      case 'active':
        return tasks.value.filter(task => !task.completed);
      case 'completed':
        return tasks.value.filter(task => task.completed);
      default:
        return tasks.value;
    }
  });

  const taskStats = computed(() => {
    const total = tasks.value.length;
    const completed = tasks.value.filter(task => task.completed).length;
    const active = total - completed;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      active,
      completionPercentage,
    };
  });

  return {
    tasks,
    filter,
    filteredTasks,
    taskStats,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearCompleted,
  };
}