import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Header() {
    const { t, i18n } = useTranslation();

    const [showLangMenu, setShowLangMenu] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [hovered, setHovered] = useState(false);
    const menuRef = useRef(null);
    const desplegadoRef = useRef(null);
    const [darkMode, setDarkMode] = useState(true);

    function toggleTheme(){
        setDarkMode(prev => !prev);
    }
    
    useEffect(() => {
        const body = document.body;
        if (darkMode) {
            body.classList.add('dark');
            body.classList.remove('light');

        } else {
            body.classList.add('light');
            body.classList.remove('dark');

        }
    }, [darkMode]);
    
    function toggleMenu() {
        if (menuRef.current) {
        menuRef.current.classList.toggle('active');
        desplegadoRef.current.classList.toggle('visible');
        }
    }

    function toggleLangMenu() {
        setShowLangMenu(prev => !prev);
    }
    
    const setLanguage = (lang) => {
        setSelectedLanguage(lang);
        setShowLangMenu(false);
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
    };

  return (
    <header>
        <div id="navBar">
            <div className="toggle-wrapper">
            <input
                type="checkbox"
                id="toggleDarkMode"
                className="toggle-checkbox"
                checked={darkMode}
                onChange={toggleTheme}
            />
            <label htmlFor="toggleDarkMode" className="toggle-label">
                <span className="toggle-icon">🌞</span>
                <span className="toggle-ball"></span>
                <span className="toggle-icon">🌙</span>
            </label>
            </div>

            <div id="menu" ref={menuRef} onClick={toggleMenu}>
            <div id="barra1"></div>
            <div id="barra2"></div>
            <div id="barra3"></div>
            </div>

            <div id="menuDesplegado" ref={desplegadoRef}>
                <ol id="menuOpciones">
                    <li
                    className={showLangMenu ? 'active' : ''}
                    onClick={toggleLangMenu}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    >
                    <div
                        id="lenguageIconCont"
                        className={showLangMenu ? 'rotated' : ''}
                    ></div>
                    {t("language")}
                    {showLangMenu && (
                        <ul className="submenu">
                            <li onClick={() => { setLanguage('العربية'); changeLanguage('ar'); }}>العربية</li>
                            <li onClick={() => { setLanguage('বাংলা'); changeLanguage('bn'); }}>বাংলা</li>
                            <li onClick={() => { setLanguage('Deutsch'); changeLanguage('de'); }}>Deutsch</li>
                            <li onClick={() => { setLanguage('English'); changeLanguage('en'); }}>English</li>
                            <li onClick={() => { setLanguage('Español'); changeLanguage('es'); }}>Español</li>
                            <li onClick={() => { setLanguage('हिंदी'); changeLanguage('hi'); }}>हिंदी</li>
                            <li onClick={() => { setLanguage('日本語'); changeLanguage('ja'); }}>日本語</li>
                            <li onClick={() => { setLanguage('Português'); changeLanguage('pt'); }}>Português</li>
                            <li onClick={() => { setLanguage('Русский'); changeLanguage('ru'); }}>Русский</li>
                            <li onClick={() => { setLanguage('中文'); changeLanguage('zh'); }}>中文</li>
                            <p>{t("selected_language")} : {selectedLanguage}</p>
                        </ul>
                    )}
                    </li>
                    <li>{t("scientist_mode")}</li>
                </ol>
            </div>
        </div>
    </header>
  );
}

export default Header;
