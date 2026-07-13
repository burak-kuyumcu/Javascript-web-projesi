const STORAGE_KEY = "taskflow_tasks";

export function getTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (!storedTasks) {
      return [];
    }
    const parsedTasks = JSON.parse(storedTasks);

    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    console.error("Görevler okunurken hata oluştu:", error);
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Görevler kaydedilirken hata oluştu:", error);
  }
}

export function createTask(taskData) {
  const tasks = getTasks();
  const newTask = {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(),
    title: taskData.title,
    description: taskData.description,
    category: taskData.category,
    priority: taskData.priority,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };

  const updatedTasks = [newTask, ...tasks];

  saveTasks(updatedTasks);
  return newTask;
}

export function updateTask(taskId, updatedData) {
  const tasks = getTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          ...updatedData,
          updatedAt: new Date().toISOString(),
        }
      : task
  );

  saveTasks(updatedTasks);
  return updatedTasks;
}

export function deleteTask(taskId) {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task) => task.id !== taskId);


  saveTasks(updatedTasks);
  return updatedTasks;
}

export function clearTasks() {
  localStorage.removeItem(STORAGE_KEY);
}