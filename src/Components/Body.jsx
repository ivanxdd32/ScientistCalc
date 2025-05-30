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

    const calculateResult = () => {
        try {
            let expressionToEvaluate = hasResult ? result : expression;

            // Validaciones básicas
            if (!areParenthesesBalanced(expressionToEvaluate)) {
                setResult('Error: ()');
                setHasResult(true);
                return;
            }

            if (/[\+\-\×\÷]{2,}/.test(expressionToEvaluate)) {
                setResult('Error: ops');
                setHasResult(true);
                return;
            }

            // Reemplazos
            const sanitized = expressionToEvaluate
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/√\(/g, 'Math.sqrt(')
                .replace(/sin\(/g, 'Math.sin(')
                .replace(/cos\(/g, 'Math.cos(')
                .replace(/tan\(/g, 'Math.tan(')
                .replace(/log\(/g, 'Math.log10(');

            const evalResult = eval(sanitized);

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

        } catch (error) {
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
                        <button className='suma' onClick={() => handleInput('+')}>+</button>
                        <button id='cero' onClick={() => handleInput('0')}>0</button>
                        <button className='resta' onClick={() => handleInput('-')}>-</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Body
