import { useState } from 'react'
import './App.css'
import * as Tone from "tone";

function App() {
  
  return (
    <>
      <div id='navBar'>
        <div id='menu'>
          <div id='barra1'></div>
          <div id='barra2'></div>
          <div id='barra3'></div>
        </div>
      </div>
      <div id='contentOrder'>
        <div>
          <h1>Calculator</h1>
          <p id='subtitle'>Simple on the outside, powerful on the inside.</p>
        </div>
        <div id='mesa'>
          <div class="calculadora-display">
            <div class="expresion">3 × (4 + 5)</div>
            <div class="resultado">27</div>
          </div>
          <div id='grid-botones'>
            <button>C</button>
            <button>()</button>
            <button>%</button>
            <button>+</button>

            <button class="func">sin</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>

            <button class="func">cos</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>

            <button class="func">tan</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>

            <button class="func-orange">log</button>
            <button>0</button>
            <button>.</button>
            <button class="igual">=</button>

            <button class="func-orange">√</button>
            <button class="func-orange">x</button>
            <button></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
