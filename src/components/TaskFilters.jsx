function TaskFilters({
  searchText,
  statusFilter,
  categoryFilter,
  priorityFilter,
  filteredTaskCount,
  totalTaskCount,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onPriorityChange,
  onClearFilters,
}) {
  const hasActiveFilter =
    searchText.trim() !== "" ||
    statusFilter !== "all" ||
    categoryFilter !== "all" ||
    priorityFilter !== "all";

  return (
    <div className="task-filters">
      <div className="filter-heading">
        <div>
          <span className="section-label">Akıllı görünüm</span>
          <h3>Görevleri filtrele</h3>
        </div>

        <span className="filter-result-count">
          {filteredTaskCount} / {totalTaskCount} görev
        </span>
      </div>

      <div className="filter-grid">
        <div className="filter-group filter-search">
          <label htmlFor="task-search">Görev ara</label>

          <div className="search-input-wrapper">
            <span className="search-icon" aria-hidden="true">
              ⌕
            </span>

            <input
              id="task-search"
              type="search"
              value={searchText}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Başlık veya açıklama ara..."
            />
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Durum</label>

          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) =>
              onStatusChange(event.target.value)
            }
          >
            <option value="all">Tüm durumlar</option>
            <option value="pending">Bekleyenler</option>
            <option value="completed">Tamamlananlar</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter">Kategori</label>

          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(event) =>
              onCategoryChange(event.target.value)
            }
          >
            <option value="all">Tüm kategoriler</option>
            <option value="Genel">Genel</option>
            <option value="Yazılım">Yazılım</option>
            <option value="Okul">Okul</option>
            <option value="İş">İş</option>
            <option value="Kişisel">Kişisel</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority-filter">Öncelik</label>

          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(event) =>
              onPriorityChange(event.target.value)
            }
          >
            <option value="all">Tüm öncelikler</option>
            <option value="low">Düşük</option>
            <option value="medium">Orta</option>
            <option value="high">Yüksek</option>
          </select>
        </div>
      </div>

      <div className="filter-footer">
        <p>
          Arama ve filtreler yalnızca ekrandaki görev görünümünü
          değiştirir. Kayıtların silinmez.
        </p>

        <button
          className="clear-filter-button"
          type="button"
          onClick={onClearFilters}
          disabled={!hasActiveFilter}
        >
          Filtreleri Temizle
        </button>
      </div>
    </div>
  );
}

export default TaskFilters;