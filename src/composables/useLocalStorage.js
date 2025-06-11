import { ref, watch } from 'vue';

export function useLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue;
  
  const state = ref(initialValue);

  const setValue = (value) => {
    state.value = value;
    localStorage.setItem(key, JSON.stringify(value));
  };

  watch(
    state,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    { deep: true }
  );

  return [state, setValue];
}