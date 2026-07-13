import { useMemo, useState } from "react";

import ConfirmModal from "../components/ConfirmModal";
import TaskCard from "../components/TaskCard";
import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm";
import TaskStats from "../components/TaskStats";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/localStorageService";

function HomePage({ showToast = () => {} }) {
  const [tasks, setTasks] = useState(() => getTasks());

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [categoryFilter, setCategoryFilter] =
    useState("all");
  const [priorityFilter, setPriorityFilter] =
    useState("all");

  const completedTaskCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTaskCount =
    tasks.length - completedTaskCount;

  const filteredTasks = useMemo(() => {
    const normalizedSearchText = searchText
      .trim()
      .toLocaleLowerCase("tr-TR");

    return tasks.filter((task) => {
      const taskTitle = task.title.toLocaleLowerCase(
        "tr-TR"
      );

      const taskDescription = (
        task.description || ""
      ).toLocaleLowerCase("tr-TR");

      const matchesSearch =
        normalizedSearchText === "" ||
        taskTitle.includes(normalizedSearchText) ||
        taskDescription.includes(normalizedSearchText);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "completed" &&
          task.completed) ||
        (statusFilter === "pending" &&
          !task.completed);

      const matchesCategory =
        categoryFilter === "all" ||
        task.category === categoryFilter;

      const matchesPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesPriority
      );
    });
  }, [
    tasks,
    searchText,
    statusFilter,
    categoryFilter,
    priorityFilter,
  ]);

  function scrollToForm() {
    window.setTimeout(() => {
      document
        .querySelector(".task-form-wrapper")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 50);
  }

  function openNewTaskForm() {
    setEditingTask(null);
    setIsFormOpen(true);
    scrollToForm();
  }

  function openEditTaskForm(task) {
    setEditingTask(task);
    setIsFormOpen(true);
    scrollToForm();
  }

  function closeTaskForm() {
    setIsFormOpen(false);
    setEditingTask(null);
  }

  function handleSubmitTask(taskData) {
    if (editingTask) {
      const updatedTasks = updateTask(
        editingTask.id,
        taskData
      );

      setTasks(updatedTasks);
      showToast("Görev başarıyla güncellendi.");
    } else {
      const newTask = createTask(taskData);

      setTasks((currentTasks) => [
        newTask,
        ...currentTasks,
      ]);

      showToast("Yeni görev başarıyla oluşturuldu.");
    }

    closeTaskForm();
  }

  function handleToggleComplete(task) {
    const nextCompletedValue = !task.completed;

    const updatedTasks = updateTask(task.id, {
      completed: nextCompletedValue,
    });

    setTasks(updatedTasks);

    showToast(
      nextCompletedValue
        ? "Görev tamamlandı olarak işaretlendi."
        : "Görev yeniden bekleyenlere taşındı."
    );
  }

  function handleDeleteRequest(task) {
    setTaskToDelete(task);
  }

  function handleConfirmDelete() {
    if (!taskToDelete) {
      return;
    }

    const deletedTaskId = taskToDelete.id;
    const updatedTasks = deleteTask(deletedTaskId);

    setTasks(updatedTasks);
    setTaskToDelete(null);

    if (editingTask?.id === deletedTaskId) {
      closeTaskForm();
    }

    showToast("Görev kalıcı olarak silindi.", "info");
  }

  function handleCancelDelete() {
    setTaskToDelete(null);
  }

  function handleClearFilters() {
    setSearchText("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setPriorityFilter("all");

    showToast("Arama ve filtreler temizlendi.", "info");
  }

  return (
    <main>
      <section
        id="top"
        className="hero-section"
      >
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-label">
              Görev yönetim uygulaması
            </span>

            <h1>
              Planlarını düzenle,
              <span> hedeflerini tamamla.</span>
            </h1>

            <p>
              Görevlerini oluştur, kategorilere ayır,
              önceliklendir ve ilerlemeni tek bir ekrandan
              takip et.
            </p>

            <button
              className="primary-button"
              type="button"
              onClick={openNewTaskForm}
            >
              Yeni Görev Oluştur
            </button>
          </div>

          <div className="hero-card">
            <div className="hero-card-header">
              <span>Görev ilerlemesi</span>

              <span className="status-badge">
                Aktif
              </span>
            </div>

            <div className="hero-stat">
              <strong>{tasks.length}</strong>
              <span>Toplam görev</span>
            </div>

            <div className="mini-stats">
              <div>
                <strong>{completedTaskCount}</strong>
                <span>Tamamlanan</span>
              </div>

              <div>
                <strong>{pendingTaskCount}</strong>
                <span>Bekleyen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tasks"
        className="tasks-section"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">
                Çalışma alanı
              </span>

              <h2>Görevlerin</h2>
            </div>

            <button
              className="primary-button"
              type="button"
              onClick={openNewTaskForm}
            >
              + Yeni Görev
            </button>
          </div>

          <TaskStats tasks={tasks} />

          {isFormOpen && (
            <TaskForm
              key={editingTask?.id || "new-task"}
              editingTask={editingTask}
              onSubmitTask={handleSubmitTask}
              onCancel={closeTaskForm}
            />
          )}

          {tasks.length > 0 && (
            <TaskFilters
              searchText={searchText}
              statusFilter={statusFilter}
              categoryFilter={categoryFilter}
              priorityFilter={priorityFilter}
              filteredTaskCount={filteredTasks.length}
              totalTaskCount={tasks.length}
              onSearchChange={setSearchText}
              onStatusChange={setStatusFilter}
              onCategoryChange={setCategoryFilter}
              onPriorityChange={setPriorityFilter}
              onClearFilters={handleClearFilters}
            />
          )}

          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                📋
              </div>

              <h3>Henüz görev bulunmuyor</h3>

              <p>
                İlk görevini oluşturarak planlarını
                görünür hale getir.
              </p>

              <button
                className="empty-state-button"
                type="button"
                onClick={openNewTaskForm}
              >
                İlk görevi oluştur
              </button>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state filtered-empty-state">
              <div className="empty-state-icon">
                🔎
              </div>

              <h3>Eşleşen görev bulunamadı</h3>

              <p>
                Arama kelimesini veya seçtiğin filtreleri
                değiştirmeyi dene.
              </p>

              <button
                className="empty-state-button"
                type="button"
                onClick={handleClearFilters}
              >
                Filtreleri temizle
              </button>
            </div>
          ) : (
            <div className="task-grid">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={
                    handleToggleComplete
                  }
                  onEdit={openEditTaskForm}
                  onDelete={handleDeleteRequest}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section
        id="about"
        className="about-section"
      >
        <div className="container about-content">
          <div>
            <span className="section-label">
              TaskFlow
            </span>

            <h2>Proje hakkında</h2>
          </div>

          <p>
            TaskFlow; ReactJS, modern JavaScript,
            LocalStorage ve Pure CSS kullanılarak
            geliştirilen bir görev yönetim
            uygulamasıdır. Kullanıcılar görevlerini
            ekleyebilir, listeleyebilir, düzenleyebilir,
            tamamlayabilir, silebilir, arayabilir ve
            filtreleyebilir.
          </p>
        </div>
      </section>

      {taskToDelete && (
        <ConfirmModal
          title="Görev silinsin mi?"
          message={`"${taskToDelete.title}" adlı görev kalıcı olarak silinecek.`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </main>
  );
}

export default HomePage;