import { useEffect, useState } from "react";

import Header from "./components/Header";
import Toast from "./components/Toast";
import HomePage from "./pages/HomePage";

import {
  getInitialTheme,
  saveTheme,
} from "./services/themeService";

function App() {
  const [theme, setTheme] = useState(() =>
    getInitialTheme()
  );

  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  function showToast(message, type = "success") {
    setToast({
      id: Date.now(),
      message,
      type,
    });
  }

  function closeToast() {
    setToast(null);
  }

  return (
    <>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <HomePage showToast={showToast} />

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </>
  );
}

export default App;