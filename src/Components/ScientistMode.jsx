import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useVisibilidad } from './VisibilidadContext';

function ScientistMode (){
    const { t } = useTranslation();
    const [expression, setExpression] = useState('0');
    const [result, setResult] = useState('0');
    const [hasResult, setHasResult] = useState(false);
    const { isVisible } = useVisibilidad();
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
                expressionToEvaluate = result;
            } else {
                // Caso normal: evaluamos la expresión
                expressionToEvaluate = expression;
            }
    
            const sanitized = expressionToEvaluate
                .replace(/x/g, '*')
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

        if (!isVisible) return null;

    return(
        <div id='contentOrder' className='cientifica'>
            <div id='contenedor_titulo'>
                <h1>{t("scientistmode_title")}</h1>
                <p id='subtitle'>{t("calculator_subtitle")}</p>
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
                    <button id='multiplicacion' className='func-orange' onClick={() => handleInput('x')}>x</button>
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
                </div>
            </div>
        </div>
    )
}

export default ScientistMode