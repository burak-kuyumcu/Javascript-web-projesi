import { useState } from "react";
import { getTasks } from "../services/localStorageService";

function HomePage() {
  const [tasks] = useState(() => getTasks());
  const completedTaskCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTaskCount = tasks.length - completedTaskCount;

  return (
    <main>
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-label">Görev yönetim uygulaması</span>

            <h1>
              Planlarını düzenle,
              <span> hedeflerini tamamla.</span>
            </h1>

            <p>
              Görevlerini oluştur, kategorilere ayır, önceliklendir ve
              ilerlemeni tek bir ekrandan takip et.
            </p>

            <a className="primary-button" href="#tasks">
              Görevleri Görüntüle
            </a>
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
              <span className="section-label">Çalışma alanı</span>
              <h2>Görevlerin</h2>
            </div>

            <button className="primary-button" type="button">
              + Yeni Görev
            </button>
          </div>

          <div className="empty-state">
            <div className="empty-state-icon">📋</div>

            <h3>Henüz görev bulunmuyor</h3>

            <p>
              İlk görevini oluşturarak planlarını görünür hale getir.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container about-content">
          <div>
            <span className="section-label">TaskFlow</span>
            <h2>Proje hakkında</h2>
          </div>

          <p>
            TaskFlow; ReactJS, modern JavaScript, LocalStorage ve Pure CSS
            kullanılarak geliştirilen bir görev yönetim uygulamasıdır.
          </p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;