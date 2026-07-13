const priorityLabels = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
};

function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const formattedDate = new Date(
    task.createdAt
  ).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article
      className={`task-card ${
        task.completed ? "task-card-completed" : ""
      }`}
    >
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

      <div className="task-card-content">
        <h3>{task.title}</h3>

        <p>
          {task.description ||
            "Bu görev için açıklama eklenmemiş."}
        </p>
      </div>

      <div className="task-card-footer">
        <span>{formattedDate}</span>

        <span
          className={`task-status ${
            task.completed
              ? "task-status-completed"
              : ""
          }`}
        >
          {task.completed ? "Tamamlandı" : "Bekliyor"}
        </span>
      </div>

      <div className="task-actions">
        <button
          className={`task-action-button complete-button ${
            task.completed ? "undo-button" : ""
          }`}
          type="button"
          onClick={() => onToggleComplete(task)}
        >
          {task.completed
            ? "Geri Al"
            : "Tamamla"}
        </button>

        <button
          className="task-action-button edit-button"
          type="button"
          onClick={() => onEdit(task)}
        >
          Düzenle
        </button>

        <button
          className="task-action-button delete-button"
          type="button"
          onClick={() => onDelete(task)}
        >
          Sil
        </button>
      </div>
    </article>
  );
}

export default TaskCard;