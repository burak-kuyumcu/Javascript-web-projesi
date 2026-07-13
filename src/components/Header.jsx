function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <a className="logo" href="/">
          <span className="logo-icon">✓</span>
          <span>TaskFlow</span>
        </a>

        <nav className="navigation">
          <a href="#tasks">Görevler</a>
          <a href="#about">Proje Hakkında</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;