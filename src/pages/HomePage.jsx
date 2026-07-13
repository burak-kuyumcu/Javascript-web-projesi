import { useState } from "react";
import TaskForm from "../components/TaskForm";
import {
  createTask,
  getTasks,
} from "../services/localStorageService";

const priorityLabels = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
};

function HomePage() {
  const [tasks, setTasks] = useState(() => getTasks());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const completedTaskCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTaskCount = tasks.length - completedTaskCount;

  function handleAddTask(taskData) {
    const newTask = createTask(taskData);

    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setIsFormOpen(false);
  }

  function openTaskForm() {
    setIsFormOpen(true);

    window.setTimeout(() => {
      document
        .querySelector(".task-form-wrapper")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 50);
  }

  function closeTaskForm() {
    setIsFormOpen(false);
  }

  return (
    <main>
      <section className="hero-section">
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
              önceliklendir ve ilerlemeni tek bir ekrandan takip
              et.
            </p>

            <button
              className="primary-button"
              type="button"
              onClick={openTaskForm}
            >
              Yeni Görev Oluştur
            </button>
          </div>

          <div className="hero-card">
            <div className="hero-card-header">
              <span>Bugünkü ilerleme</span>
              <span className="status-badge">Aktif</span>
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

      <section id="tasks" className="tasks-section">
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
              onClick={openTaskForm}
            >
              + Yeni Görev
            </button>
          </div>

          {isFormOpen && (
            <TaskForm
              onAddTask={handleAddTask}
              onCancel={closeTaskForm}
            />
          )}

          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>

              <h3>Henüz görev bulunmuyor</h3>

              <p>
                İlk görevini oluşturarak planlarını görünür hale
                getir.
              </p>

              <button
                className="empty-state-button"
                type="button"
                onClick={openTaskForm}
              >
                İlk görevi oluştur
              </button>
            </div>
          ) : (
            <div className="task-grid">
              {tasks.map((task) => (
                <article className="task-card" key={task.id}>
                  <div className="task-card-top">
                    <span className="category-badge">
                      {task.category}
                    </span>

                    <span
                      className={`priority-badge priority-${task.priority}`}
                    >
                      {priorityLabels[task.priority] || "Orta"}
                    </span>
                  </div>

                  <h3>{task.title}</h3>

                  <p>
                    {task.description ||
                      "Bu görev için açıklama eklenmemiş."}
                  </p>

                  <div className="task-card-footer">
                    <span>
                      {new Date(task.createdAt).toLocaleDateString(
                        "tr-TR"
                      )}
                    </span>

                    <span className="task-status">
                      {task.completed
                        ? "Tamamlandı"
                        : "Bekliyor"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container about-content">
          <div>
            <span className="section-label">TaskFlow</span>
            <h2>Proje hakkında</h2>
          </div>

          <p>
            Bu proje, ReactJS, modern JavaScript, LocalStorage ve
            Pure CSS kullanılarak geliştirilen bir görev yönetim
            uygulamasıdır.
          </p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;