import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useVisibilidad } from './VisibilidadContext';

function Header() {
    const { t, i18n } = useTranslation();
    const { isVisible, toggleVisibilidad } = useVisibilidad();

    const languageNames = {
        ar: "العربية",
        bn: "বাংলা",
        de: "Deutsch",
        en: "English",
        es: "Español",
        hi: "हिंदी",
        ja: "日本語",
        pt: "Português",
        ru: "Русский",
        zh: "中文",
    };

    const languageFlags = {
        ar: '/flags/ar.png',
        bn: '/flags/bn.png',
        de: '/flags/de.png',
        en: '/flags/en.png',
        es: '/flags/es.png',
        hi: '/flags/hi.png',
        ja: '/flags/ja.png',
        pt: '/flags/pt.png',
        ru: '/flags/ru.png',
        zh: '/flags/zh.png',
    };

    const [showLangMenu, setShowLangMenu] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const menuRef = useRef(null);
    const desplegadoRef = useRef(null);
    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return localStorage.getItem('lang') || 'en'; // valor inicial desde localStorage o 'English'
    });

    useEffect(() => {
        i18n.changeLanguage(selectedLanguage); // aplicar el idioma al cargar el componente
    }, [selectedLanguage, i18n]);

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
        setSelectedLanguage(lang);
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
                        {Object.entries(languageNames).map(([code, name]) => (
                            <li key={code} onClick={() => { setLanguage(name); changeLanguage(code); }}>
                            <img
                                src={`/flags/${code}.png`}
                                alt={`${name} flag`}
                                style={{ width: '20px', height: '15px', marginRight: '8px', verticalAlign: 'middle' }}
                            />
                            {name}
                            </li>
                        ))}
                        <p>{t("selected_language")} : {languageNames[selectedLanguage]}</p>
                        </ul>
                    )}
                    </li>
                    <li onClick={toggleVisibilidad}>
                        {isVisible ? t("basic_mode") : t("scientist_mode")}
                    </li>
                </ol>
            </div>
        </div>
    </header>
  );
}

export default Header;
