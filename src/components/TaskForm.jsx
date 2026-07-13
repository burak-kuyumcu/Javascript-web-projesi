import { useState } from "react";

const initialFormData = {
  title: "",
  description: "",
  category: "Genel",
  priority: "medium",
};

function TaskForm({ onAddTask, onCancel }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Görev başlığı zorunludur.";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Görev başlığı en az 3 karakter olmalıdır.";
    }

    if (formData.description.length > 250) {
      newErrors.description =
        "Açıklama en fazla 250 karakter olabilir.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      priority: formData.priority,
    });

    setFormData(initialFormData);
    setErrors({});
  }

  return (
    <div className="task-form-wrapper">
      <div className="task-form-heading">
        <div>
          <span className="section-label">Yeni kayıt</span>
          <h3>Yeni görev oluştur</h3>
        </div>

        <button
          className="close-button"
          type="button"
          onClick={onCancel}
          aria-label="Formu kapat"
        >
          ×
        </button>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group form-group-full">
          <label htmlFor="title">Görev başlığı</label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Örneğin: React projesini tamamla"
            maxLength="80"
          />

          {errors.title && (
            <span className="form-error">{errors.title}</span>
          )}
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="description">Açıklama</label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Görevle ilgili kısa bir açıklama yaz..."
            rows="4"
            maxLength="250"
          />

          <div className="textarea-footer">
            <span className="form-error">
              {errors.description || ""}
            </span>

            <span>{formData.description.length}/250</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Kategori</label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Genel">Genel</option>
            <option value="Yazılım">Yazılım</option>
            <option value="Okul">Okul</option>
            <option value="İş">İş</option>
            <option value="Kişisel">Kişisel</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Öncelik</label>

          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Düşük</option>
            <option value="medium">Orta</option>
            <option value="high">Yüksek</option>
          </select>
        </div>

        <div className="form-actions form-group-full">
          <button
            className="secondary-button"
            type="button"
            onClick={onCancel}
          >
            Vazgeç
          </button>

          <button className="primary-button" type="submit">
            Görevi Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;