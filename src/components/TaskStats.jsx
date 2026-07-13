function TaskStats({ tasks }) {
  const totalCount = tasks.length;

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = totalCount - completedCount;

  const highPriorityCount = tasks.filter(
    (task) => task.priority === "high" && !task.completed
  ).length;

  const completionRate =
    totalCount === 0
      ? 0
      : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="task-stats">
      <article className="stat-card">
        <div className="stat-icon stat-icon-total">▦</div>

        <div>
          <span>Toplam görev</span>
          <strong>{totalCount}</strong>
        </div>
      </article>

      <article className="stat-card">
        <div className="stat-icon stat-icon-completed">✓</div>

        <div>
          <span>Tamamlanan</span>
          <strong>{completedCount}</strong>
        </div>
      </article>

      <article className="stat-card">
        <div className="stat-icon stat-icon-pending">◷</div>

        <div>
          <span>Bekleyen</span>
          <strong>{pendingCount}</strong>
        </div>
      </article>

      <article className="stat-card">
        <div className="stat-icon stat-icon-priority">!</div>

        <div>
          <span>Yüksek öncelikli</span>
          <strong>{highPriorityCount}</strong>
        </div>
      </article>

      <article className="progress-card">
        <div className="progress-card-heading">
          <div>
            <span>Tamamlanma oranı</span>
            <strong>%{completionRate}</strong>
          </div>

          <span>
            {completedCount} / {totalCount}
          </span>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-label="Görev tamamlanma oranı"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={completionRate}
        >
          <div
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </article>
    </div>
  );
}

export default TaskStats;