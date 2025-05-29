import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useVisibilidad } from './VisibilidadContext';

function ScientistMode () {
    const { t } = useTranslation();
    const [expression, setExpression] = useState('0');
    const [result, setResult] = useState('0');
    const [hasResult, setHasResult] = useState(false);
    const [message, setMessage] = useState('');
    const { isVisible } = useVisibilidad();
    const displayRef = useRef(null);

    useEffect(() => {
        if (displayRef.current) {
            displayRef.current.scrollLeft = displayRef.current.scrollWidth;
        }
    }, [expression, result]);

    const handleInput = (value) => {
        setMessage('');
        if (hasResult) {
            setResult((prev) => (prev === '0' ? value : prev + value));
        } else {
            setExpression((prev) => (prev === '0' ? value : prev + value));
        }
    };

    const calculateResult = () => {
        try {
            let expressionToEvaluate = hasResult ? result : expression;
            
            const sanitized = expressionToEvaluate
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/√/g, 'Math.sqrt')
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/log/g, 'Math.log10')
                .replace(/pi/g, 'Math.Pi');

            const evalResult = eval(sanitized);
            const finalResult = String(evalResult).length > 12
                ? evalResult.toPrecision(10)
                : evalResult.toString();

            setResult(finalResult);
            setExpression(expressionToEvaluate);
            setHasResult(true);
            setMessage(''); // Limpiar mensaje si fue exitoso
        } catch {
            setResult('Error');
            setHasResult(true);
            setMessage(t("error_message") || 'Expresión inválida');
        }
    };

    const clearDisplay = () => {
        setExpression('0');
        setResult('0');
        setHasResult(false);
        setMessage('');
    };
    
    if (!isVisible) return null;

    const displayValue = hasResult ? result : expression || '0';
    const secondaryDisplay = hasResult ? expression || '0' : result;

    return (
        <main className='cientifica'>
            <div id='contentOrder'>
                <div id='contenedor_titulo'>
                    <h1>{t("scientistmode_title")}</h1>
                    <p id='subtitle'>{t("calculator_subtitle")}</p>
                </div>
                <div id='mesa'>
                    <div className="calculadora-display">
                        <div className="resultado">
                            {displayValue}
                        </div>
                        <div className="expresion-contenedor">
                            <div className="expresion" ref={displayRef}>
                                {secondaryDisplay}
                            </div>
                            <div className="mensaje-error">
                                {message}
                            </div>
                        </div>
                    </div>
                    <div id='grid-botones'>
                        <button id='borrarDisplay' className='func-red' onClick={clearDisplay}>C</button>
                        <button className="func-scientist" onClick={() => handleInput('!')}>n!</button>
                        <button className="func-scientist" onClick={() => handleInput('abs(')}>|x|</button>
                        <button id='log' className="func-scientist" onClick={() => handleInput('log(')}>log</button>
                        <button className="func" onClick={() => handleInput('asin(')}>asin</button>
                        
                        <button className='parentesis' onClick={() => handleInput('(')}>(</button>
                        <button className='parentesis' onClick={() => handleInput(')')}>)</button>
                        <button className="func-scientist" onClick={() => handleInput('ln(')}>ln</button>
                        <button className="func-scientist" onClick={() => handleInput('exp(')}>exp</button>
                        <button className="func" onClick={() => handleInput('acos(')}>acos</button>
                        
                        <button id='punto' className='func-orange' onClick={() => handleInput('.')}>.</button>
                        <button id='division' className='func-orange' onClick={() => handleInput('÷')}>÷</button>
                        <button id='multiplicacion' className='func-orange' onClick={() => handleInput('×')}>×</button>
                        <button className="func-scientist" onClick={() => handleInput('e')}>e</button>
                        <button className="func" onClick={() => handleInput('atan(')}>atan</button>
                        
                        <button className="func-orange" onClick={() => handleInput('^')}>^</button>
                        <button id='siete' onClick={() => handleInput('7')}>7</button>
                        <button id='ocho' onClick={() => handleInput('8')}>8</button>
                        <button id='nueve' onClick={() => handleInput('9')}>9</button>
                        <button id='sin' className="func" onClick={() => handleInput('sin(')}>sin</button>
                        
                        <button className="func-orange" onClick={() => handleInput('pi')}>π</button>
                        <button id='cuatro' onClick={() => handleInput('4')}>4</button>
                        <button id='cinco' onClick={() => handleInput('5')}>5</button>
                        <button id='seis' onClick={() => handleInput('6')}>6</button>
                        <button className="func" onClick={() => handleInput('cos(')}>cos</button>
                        
                        <button className="func-orange" onClick={() => handleInput('%')}>%</button>
                        <button id='uno' onClick={() => handleInput('1')}>1</button>
                        <button id='dos' onClick={() => handleInput('2')}>2</button>
                        <button id='tres' onClick={() => handleInput('3')}>3</button>
                        <button className="func" onClick={() => handleInput('tan(')}>tan</button>

                        <button className="func" onClick={() => handleInput('tan(')}>tan</button>
                        <button className="suma" onClick={() => handleInput('+')}>+</button>
                        <button id='cero' onClick={() => handleInput('0')}>0</button>
                        <button className="resta" onClick={() => handleInput('-')}>-</button>
                        <button id='igual' className='igual' onClick={(calculateResult)}>=</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ScientistMode