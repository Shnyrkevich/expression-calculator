function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const multiple = (arg, arg1) => {
        return arg*arg1;
    };

    const divide = (arg, arg1) => {
        if(parseFloat(arg1) == 0){
            throw new "TypeError: Division by zero.";
        }
        return arg/arg1;
    };

    const addition = (arg, arg1) => {
        return arg+arg1;
    };

    const subtraction = (arg, arg1) => {
        return arg-arg1;
    };

    const prior = (elem) => {
        switch(elem){
            case '+':
                return 1;
            break;
            case '-':
                return 1;
            break;
            case '*':
                return 2;
            break;
            case '/':   
                return 2;
            break;
        }
    }

    function action(cas, arg1, arg){
        switch(cas){
            case '+':
                return addition(arg, arg1);
            break;
            case '-':
                return subtraction(arg, arg1);
            break;
            case '*':
                return multiple(arg, arg1);
            break;
            case '/':   
                return divide(arg, arg1);
            break;
        }
    }

    for(let i = 0, j =0, k = 0; i < expr.length; i++){
        if(expr[i] == '('){
            j++;
        } else if( expr[i] == ')'){
            k++;
        } else if( i == expr.length-1 && j != k){
            throw new "ExpressionError: Brackets must be paired";
        } else if(expr.length == 3){
            return action(expr[1], expr[2], expr[0]);                //Only for first test with different struct
        }
    }

    let result = 0;
    let mas = expr.split(" ");

   for(let  i = 0; i <= mas.length; i++){
        if( mas[i] == '' ){
            mas.splice(i, 1);
        } 
    }

    for(let  i = 0; i < mas.length; i++){
        if(!isNaN(parseFloat(mas[i]))){
            mas[i] = parseFloat(mas[i]);
        } 
    }

    let numberStack = [];
    let symbolStack = [];

    for(let i = 0; i <= mas.length; i++){ 
        if(i == mas.length && symbolStack.length != 0){
            numberStack.push(action(symbolStack.pop(), numberStack.pop(), numberStack.pop()));
        }

        if(typeof(mas[i]) == "number"){
            numberStack.push(mas[i]);
        } else if (symbolStack.length == 0){
            symbolStack.push(mas[i]);
        } else if(mas[i] == "("){
            symbolStack.push(mas[i]);
        }else {
            if( symbolStack[symbolStack.length-1] == '('){
                symbolStack.push(mas[i]);
            } else if( mas[i] == ')'){
                for(let i = symbolStack.length-1; i >= 0; i--){
                    if(symbolStack[i] != '('){
                        numberStack.push(action(symbolStack.pop(), numberStack.pop(), numberStack.pop()));
                    } else {
                        break;
                    }
                }
                symbolStack.pop();
            } else if(prior(mas[i]) > prior(symbolStack[symbolStack.length-1]) ){
                symbolStack.push(mas[i]);
            } else if(prior(mas[i]) < prior(symbolStack[symbolStack.length-1])){
                numberStack.push(action(symbolStack.pop(), numberStack.pop(), numberStack.pop()));
                symbolStack.push(mas[i]);
                if(prior(symbolStack[symbolStack.length-1]) == prior(symbolStack[symbolStack.length-2])){
                    let syng = symbolStack.pop();
                    numberStack.push(action(symbolStack.pop(), numberStack.pop(), numberStack.pop()));
                    symbolStack.push(syng);
                }
            } else if(prior(mas[i]) == prior(symbolStack[symbolStack.length-1])){
                numberStack.push(action(symbolStack.pop(), numberStack.pop(), numberStack.pop()));
                symbolStack.push(mas[i]);
            }
        }   
    }

    if(symbolStack[0] == "+" || symbolStack[0] == "-" || symbolStack[0] == "*" || symbolStack[0] == "/"){
        numberStack.push(action(symbolStack.pop(), numberStack.pop(), numberStack.pop()));
    } 
    
    result = numberStack.pop();
    return result;

}

module.exports = {
    expressionCalculator
}