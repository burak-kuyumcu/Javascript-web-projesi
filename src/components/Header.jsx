function Header({ theme, onToggleTheme }) {
  const isDarkTheme = theme === "dark";

  return (
    <header className="header">
      <div className="container header-content">
        <a className="logo" href="#top">
          <span className="logo-icon">✓</span>
          <span>TaskFlow</span>
        </a>

        <div className="header-actions">
          <nav className="navigation">
            <a href="#tasks">Görevler</a>
            <a href="#about">Proje Hakkında</a>
          </nav>

          <button
            className="theme-toggle-button"
            type="button"
            onClick={onToggleTheme}
            aria-label={
              isDarkTheme
                ? "Açık temaya geç"
                : "Karanlık temaya geç"
            }
            title={
              isDarkTheme
                ? "Açık temaya geç"
                : "Karanlık temaya geç"
            }
          >
            <span aria-hidden="true">
              {isDarkTheme ? "☀" : "☾"}
            </span>

            <span className="theme-toggle-text">
              {isDarkTheme ? "Açık Tema" : "Koyu Tema"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;