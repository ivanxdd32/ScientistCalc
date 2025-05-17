import { useState, useRef, useEffect } from 'react'
import './App.css'
import * as Tone from "tone";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const menuRef = useRef(null);
  const desplegadoRef = useRef(null);

  function toggleMenu() {
    if (menuRef.current) {
      menuRef.current.classList.toggle('active');
      desplegadoRef.current.classList.toggle('visible');
    }
  }

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

  function toggleLangMenu() {
    setShowLangMenu(prev => !prev);
  }

  //Logica de las operaciones matematicas (calculadora).
  
  const [expression, setExpression] = useState('0');
  const [result, setResult] = useState('0');
  const [hasResult, setHasResult] = useState(false);
  const displayRef = useRef(null);

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollLeft = displayRef.current.scrollWidth;
    }
  }, [expression, result]);

  const handleInput = (value) => {
    if (hasResult) {
      setResult((prev) => (prev === '0' ? value : prev + value));
    } else {
      setExpression((prev) => (prev === '0' ? value : prev + value));
    }
  };

  const calculateResult = () => {
    try {
      let expressionToEvaluate = '';

      if (hasResult) {
        // Si se escribió sobre el resultado, evaluamos lo que hay en result
        expressionToEvaluate = result;
      } else {
        // Caso normal: evaluamos la expresión
        expressionToEvaluate = expression;
      }

      const sanitized = expressionToEvaluate
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/√/g, 'Math.sqrt')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10');

      const evalResult = eval(sanitized);
      const finalResult =
        String(evalResult).length > 12
          ? evalResult.toPrecision(10)
          : evalResult.toString();

      // Guardamos el resultado y la expresión evaluada
      setResult(finalResult);
      setExpression(expressionToEvaluate);
      setHasResult(true);
    } catch {
      setResult('Error');
      setHasResult(true);
    }
  };


  const clearDisplay = () => {
    setExpression('0');
    setResult('0');
    setHasResult(false);
  };

  return (
    <>
      <div id='navBar'>
        <div className='toggle-wrapper'>
          <input
            type='checkbox'
            id='toggleDarkMode'
            className='toggle-checkbox'
            checked={darkMode}
            onChange={toggleTheme}
          />
          <label htmlFor='toggleDarkMode' className='toggle-label'>
            <span className='toggle-icon'>🌞</span>
            <span className='toggle-ball'></span>
            <span className='toggle-icon'>🌙</span>
          </label>
        </div>
        <div id='menu' ref={menuRef} onClick={toggleMenu}>
          <div id='barra1'></div>
          <div id='barra2'></div>
          <div id='barra3'></div>
        </div>
        <div id='menuDesplegado' ref={desplegadoRef}>
          <ol id='menuOpciones'>
            <li onClick={toggleLangMenu} className='menu-item-with-icon'>
              <div id='lenguageIconCont' className={showLangMenu ? 'rotated' : ''}>
                <div className='lenguageIcon'></div>
                <div className='lenguageIcon'></div>
              </div>
              Language
              {showLangMenu && (
                <ul className='submenu'>
                  <li>English</li>
                  <li>Español</li>
                  <li>Deutsch</li>
                </ul>
              )}
            </li>
            <li>Scientist Mode</li>
          </ol>
        </div>
      </div>
      <div id='contentOrder'>
        <div>
          <h1>Calculator</h1>
          <p id='subtitle'>Simple on the outside, powerful on the inside.</p>
        </div>
        <div id='mesa'>
          <div className="calculadora-display">
            <div className="resultado">
              {hasResult ? result : expression || '0'}
            </div>
            <div className="expresion" ref={displayRef}>
              {hasResult ? expression || '0' : result}
            </div>
          </div>
          <div id='grid-botones'>
            <button id='borrarDisplay' onClick={clearDisplay}>C</button>
            <button id='parentesis' onClick={() => handleInput(')')}>)</button>
            <button id='division' onClick={() => handleInput('÷')}>÷</button>
            <button id='punto' onClick={() => handleInput('.')}>.</button>

            <button id='sin' className="func" onClick={() => handleInput('sin(')}>sin</button>
            <button id='siete' onClick={() => handleInput('7')}>7</button>
            <button id='ocho' onClick={() => handleInput('8')}>8</button>
            <button id='nueve' onClick={() => handleInput('9')}>9</button>

            <button className="func" onClick={() => handleInput('cos(')}>cos</button>
            <button id='cuatro' onClick={() => handleInput('4')}>4</button>
            <button id='cinco' onClick={() => handleInput('5')}>5</button>
            <button id='seis' onClick={() => handleInput('6')}>6</button>

            <button className="func" onClick={() => handleInput('tan(')}>tan</button>
            <button id='uno' onClick={() => handleInput('1')}>1</button>
            <button id='dos' onClick={() => handleInput('2')}>2</button>
            <button id='tres' onClick={() => handleInput('3')}>3</button>

            <button id='log' className="func-orange" onClick={() => handleInput('log(')}>log</button>
            <button id='cero' onClick={() => handleInput('0')}>0</button>
            <button id='suma' onClick={() => handleInput('+')}>+</button>
            <button id='igual' className="igual" onClick={calculateResult}>=</button>

            <button id='raiz' className="func-orange" onClick={() => handleInput('√(')}>√</button>
            <button id='multiplicacion' className="func-orange" onClick={() => handleInput('×')}>x</button>
            <button id='menos' onClick={() => handleInput('-')}>-</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
