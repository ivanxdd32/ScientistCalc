import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Body() {
    const { t } = useTranslation();
    const [expression, setExpression] = useState('0');
    const [result, setResult] = useState('0');
    const [hasResult, setHasResult] = useState(false);
    const displayRef = useRef(null);
    
     //Logica de las operaciones matematicas.

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

    return(
        <main>
            <div id='contentOrder'>
                <div id='contenedor_titulo'>
                <h1>{t("calculator_title")}</h1>
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
                        {/*Bloque 1*/}
                        <button id='borrarDisplay' className='func-red' onClick={clearDisplay}>C</button>
                        <button className='parentesis' onClick={() => handleInput('(')}>(</button>
                        <button className='parentesis' onClick={() => handleInput(')')}>)</button>
                        <button id='punto' onClick={() => handleInput('.')}>.</button>

                        {/*Bloque 2*/}
                        <button className="func" onClick={() => handleInput('sin(')}>sin</button>
                        <button className='func' onClick={() => handleInput('cos(')}>cos</button>
                        <button className='func' onClick={() => handleInput('tan(')}>tan</button>
                        <button id='division' className="func-orange" onClick={() => handleInput('√(')}>√</button>
                        
                        {/*Bloque 3*/}
                        <button id='siete' onClick={() => handleInput('7')}>7</button>
                        <button id='ocho' onClick={() => handleInput('8')}>8</button>
                        <button id='nueve' onClick={() => handleInput('9')}>9</button>
                        <button id='multiplicacion' className="func-orange" onClick={() => handleInput('×')}>×</button>
                        
                        {/*Bloque 4*/}
                        <button id='cuatro' onClick={() => handleInput('4')}>4</button>
                        <button id='cinco' onClick={() => handleInput('5')}>5</button>
                        <button id='seis' onClick={() => handleInput('6')}>6</button>
                        <button id='division' className="func-orange" onClick={() => handleInput('÷')}>÷</button>
                        
                        {/*Bloque 5*/}
                        <button id='uno' onClick={() => handleInput('1')}>1</button>
                        <button id='dos' onClick={() => handleInput('2')}>2</button>
                        <button id='tres' onClick={() => handleInput('3')}>3</button>
                        <button id='igual' className="igual" onClick={calculateResult}>=</button>
                        
                        {/*Bloque 6*/}
                        <button id='suma' onClick={() => handleInput('+')}>+</button>
                        <button id='cero' onClick={() => handleInput('0')}>0</button>
                        <button id='menos' onClick={() => handleInput('-')}>-</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Body
