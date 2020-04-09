let runningTotal = 0;
let buffer = "0";
let previousOperator=null;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    if(symbol==='C'){
        buffer = '0';
        runningTotal = 0;
    }else if(symbol === '+' || symbol === '−' || symbol === '×' || symbol === '÷'){
        handleMath(symbol);
    }else if(symbol === '='){
        if(previousOperator === 'null'){
            return;
        }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = runningTotal;
        runningTotal = 0;
    }else if(symbol === '←'){
        if(buffer.length == 1){
            buffer = '0';
        }else{
            buffer = buffer.substring(0, buffer.length-1);
        }
    }
}

function handleNumber(numberString){
    if(buffer==="0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = +buffer;
    if(runningTotal===0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal+=intBuffer;
    }else if(previousOperator === '-'){
        runningTotal-=intBuffer;
    }else if(previousOperator === '×'){
        runningTotal*=intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal/=intBuffer;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}

init();