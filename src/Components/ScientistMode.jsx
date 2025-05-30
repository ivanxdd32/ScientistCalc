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
        const operators = ['+', '-', '×', '÷'];
        const functions = ['sin(', 'cos(', 'tan(', 'log(', '√('];
        const funcionesMatematicas = ['√(', 'sin(', 'cos(', 'tan(', 'log('];
        const lastChar = hasResult ? result.slice(-1) : expression.slice(-1);
        const target = hasResult ? result : expression;

        const fullInput = hasResult ? result : expression;

        // Evitar múltiples operadores seguidos
        if (operators.includes(lastChar) && operators.includes(value)) return;

        // No empezar con operador (excepto '-' para negativos)
        if ((expression === '0' || expression === '') && operators.includes(value) && value !== '-') return;

        // Prevenir múltiples puntos en el mismo número
        if (value === '.') {
            const parts = target.split(/[\+\-\×\÷]/);
            const lastPart = parts[parts.length - 1];
            if (lastPart.includes('.')) return;
        }

        // Prevenir cerrar paréntesis sin apertura previa
        if (value === ')') {
            const open = (target.match(/\(/g) || []).length;
            const close = (target.match(/\)/g) || []).length;
            if (close >= open) return;
            if (lastChar === '(' || operators.includes(lastChar)) return; // No dejar cerrar inmediatamente
        }

        // Prevenir apertura de paréntesis después de un número sin operador
        if (value === '(' && /\d$/.test(target)) return;

        // Prevenir cierre de paréntesis justo después de un operador
        if (value === ')' && operators.includes(lastChar)) return;

        // No permitir múltiples paréntesis de apertura seguidos (como 8+((( o ((( )
        if (value === '(' && lastChar === '(') {
            const beforeLast = target.slice(-2, -1);
            if (beforeLast === '(') return;
        }

        // Validar funciones como sin(, cos(, etc.
        if (functions.includes(value)) {
            const last = target.slice(-1);

            // Permitir si es la primera entrada o reemplazo del 0 inicial
            if (target === '0' || target === '') {
                setExpression(value);
                setHasResult(false);
                return;
            }

            // Permitir función después de operador o paréntesis de apertura
            if (/[+\-×÷(]$/.test(target)) {
                if (hasResult) {
                    setExpression(value);
                    setHasResult(false);
                } else {
                    setExpression((prev) => prev + value);
                }
                return;
            }

            // Bloquear si hay número antes (como 3sin())
            if (/\d$/.test(target)) return;

            // Bloquear dos funciones seguidas (como sin(cos())
            if (functions.some(func => target.endsWith(func))) return;
        }

        // No permitir escribir paréntesis vacío: func() o ()
        if (value === ')' && target.slice(-1) === '(') return;

        // Lógica original intacta
        if (hasResult) {
            setResult((prev) => (prev === '0' ? value : prev + value));
        } else {
            setExpression((prev) => (prev === '0' ? value : prev + value));
        }
    };

    const areParenthesesBalanced = (expr) => {
        let balance = 0;
        for (let char of expr) {
            if (char === '(') balance++;
            if (char === ')') balance--;
            if (balance < 0) return false;
        }
        return balance === 0;
    };

    const factorial = (n) => {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) {
            res *= i;
        }
        return res;
    };

    const calculateResult = () => {
        try {
            let expressionToEvaluate = hasResult ? result : expression;

            if (!areParenthesesBalanced(expressionToEvaluate)) {
                setResult('Error: unbalanced ()');
                setHasResult(true);
            return;
            }

            if (/[\+\-\×\÷]{2,}/.test(expressionToEvaluate)) {
                setResult('Error: invalid operators');
                setHasResult(true);
            return;
            }

            let sanitized = expressionToEvaluate
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/√\(/g, 'Math.sqrt(')
                .replace(/sin\(/g, 'Math.sin(')
                .replace(/cos\(/g, 'Math.cos(')
                .replace(/tan\(/g, 'Math.tan(')
                .replace(/asin\(/g, 'Math.asin(')
                .replace(/acos\(/g, 'Math.acos(')
                .replace(/atan\(/g, 'Math.atan(')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/abs\(/g, 'Math.abs(')
                .replace(/ln\(/g, 'Math.log(')
                .replace(/exp\(/g, 'Math.exp(')
                .replace(/\^/g, '**')
                .replace(/(\d+)!/g, 'factorial($1)')
                .replace(/\bpi\b/g, 'Math.PI')
                .replace(/\be\b/g, 'Math.E');

            sanitized = sanitized.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

            const evalResult = Function('factorial', 'return ' + sanitized)(factorial);

            if (!isFinite(evalResult)) {
                setResult('Math error');
            } else {
                const finalResult =
                    String(evalResult).length > 12
                    ? evalResult.toPrecision(10)
                    : evalResult.toString();

            setResult(finalResult);
            }

            setExpression(expressionToEvaluate);
            setHasResult(true);
            setMessage('');
        } catch (error) {
            setResult('Error');
            setHasResult(true);
            setMessage(error.message);
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