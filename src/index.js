function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(str){
    // Convert String
    function getElementsArr(str) {
        arr = str.split('');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '+' || arr[i] === '-' || arr[i] === '*' || arr[i] === '/' || arr[i] === '(' || arr[i] === ')') {
                arr[i] = ' ' + arr[i] + ' ';
            }
        }
        arr = arr.join('').split(' ');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '') {
                arr.splice(i, 1);
                i--;
            } else if (!isNaN(arr[i])) {
                arr[i] = Number(arr[i]);
            } else {
                arr[i] = arr[i];
            }
        }

        return arr;
    }

    // Function operation for "*,/,+,-"
    function operation(str, num1, num2) {
        num1 = Number(num1);
        num2 = Number(num2);
        switch (str) {
            case '*':{
                return num1*num2;
            }
            case '/': {
                if(num2 == 0) throw new Error('TypeError: Division by zero.');
                return num1/num2;
            }
            case '+':{
                return num1+num2;
            }
            case '-': {
                return num1-num2;
            }
        }
    }
    // Operation priorities
    const priorities = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
    }
    // Check pair brackets
    function checkBracke(str){
        let arr = getElementsArr(str);
        let arrLeftBracke = arr.filter(function(item) {
            if(item === "("){
                return item;
            };
        });
        console.log(arr);
        let arrRightBracke = arr.filter(function(item) {
            if(item === ")"){
                return item;
            }
        });
        if (arrLeftBracke.length === arrRightBracke.length){
            return true;
        } else{
            return false;
        }
    }

    //stacks
    str = getElementsArr(str);
    console.log(str);
    let operatorStack = [];
    let numberStack = [];
    for(var i = 0; i < str.length;i++){

        if (numberStack.length === 0 || operatorStack.length === 0){

            if (/[0-9]/.test(str[i])){
                numberStack.push(str[i]);
            } else {
                operatorStack.push(str[i]);
            }
        }
        else if (/[0-9]/.test(str[i])){
            numberStack.push(str[i]);
        }
        else if (priorities[str[i]] > priorities[operatorStack[operatorStack.length-1]] || str[i] ==="(" || operatorStack[operatorStack.length-1] === "("){
            operatorStack.push(str[i]);
        }
        else if (priorities[str[i]] <= priorities[operatorStack[operatorStack.length-1]]){
            while (priorities[str[i]] <= priorities[operatorStack[operatorStack.length-1]] || priorities[operatorStack[operatorStack.length-1]] === "("){
                let result = operation(operatorStack[operatorStack.length-1],numberStack[numberStack.length-2],numberStack[numberStack.length-1]);
                numberStack.splice(numberStack.length-2,2);
                numberStack.push(result);
                operatorStack.splice(operatorStack.length-1,1);
            }
            operatorStack.push(str[i]);
        }
        else if (str[i] == ")"){
            console.log(operatorStack);
            while (operatorStack[operatorStack.length-1] != "("){
                let result = operation(operatorStack[operatorStack.length-1],numberStack[numberStack.length-2],numberStack[numberStack.length-1]);
                numberStack.splice(numberStack.length-2,2);
                numberStack.push(result);
                operatorStack.splice(operatorStack.length-1,1);
            }
            operatorStack.splice(operatorStack.length-1,1);
        }
        console.log("Operatr: "+ operatorStack);
        console.log("Number: "+ numberStack);

    }
    while (numberStack.length > 1){
        let result = operation(operatorStack[operatorStack.length-1],numberStack[numberStack.length-2],numberStack[numberStack.length-1]);
        numberStack.splice(numberStack.length-2,2);
        numberStack.push(result);
        operatorStack.splice(operatorStack.length-1,1);
    }
    console.log(numberStack[0].toFixed(4));
    return numberStack[0].toFixed(4);
}

module.exports = {
    expressionCalculator
}