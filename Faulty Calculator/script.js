const calcBtnValues = ['AC', 'back', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];

const btns = document.querySelectorAll('.btn-container');

calcBtnValues.forEach((calcBtnVal) => {
        let count = 0;
        while (count < 2) {
                if (calcBtnVal == "back") {
                        btns[count].innerHTML += `<button data-operand="back" title="back" aria-label="back"><i class="fa-solid fa-delete-left"></i></button>`;
                }
                else {
                        btns[count].innerHTML += `<button data-operand="${calcBtnVal}" title=${calcBtnVal} aria-label=${calcBtnVal}>${calcBtnVal}</button>`;
                }
                count++;
        }
});

const result = document.querySelectorAll('.result');
const prevCalc = document.querySelectorAll('.prev-calc');
let acCount = 0;

const getRandomNum = () => {
        const randomNumber = Math.floor(Math.random() * 101);
        return randomNumber;
}


// Add event listeners
function clickCalBtn(ind) {
        btns[ind].addEventListener('click', event => {
                
                // Ensure the click is on a button
                const target = event.target.closest('button');
                if (!target) return; // Exit if the click is not on a button
                
                const operation = target.getAttribute('data-operand');
                
                switch (operation) {
                        case '=':
                                result[ind].style.height = '5rem';
                                prevCalc[ind].innerText = result[ind].value;
                                // Calculate the result
                                try {
                                        try {
                                                if (ind == 0 && getRandomNum() < 10) {
                                                        let operator = result[ind].value.match(/[\+\-\*\%\/]/g);

                                                        if (operator && operator.length > 0) { // Ensure an operator is found
                                                                // Get the first operator (assuming one at a time)
                                                                operator = operator[0];
                                                                // console.log(operator, operator.length, operator[0]);

                                                                switch (operator) {
                                                                        case '+':
                                                                                result[ind].value = result[ind].value.replace('+', '*');
                                                                                break;
                                                                        case '-':
                                                                                result[ind].value = result[ind].value.replace('-', '/');
                                                                                break;
                                                                        case '*':
                                                                                result[ind].value = result[ind].value.replace('*', '-');
                                                                                break;
                                                                        case '/':
                                                                                result[ind].value = result[ind].value.replace('/', '+');
                                                                                break;
                                                                }
                                                        }
                                                }
                                                result[ind].value = eval(result[ind].value); // Evaluate the current expression
                                        }
                                        catch {
                                                result[ind].value = eval(result[ind].value); // Evaluate the current expression
                                        }


                                } catch (error) {
                                        result[ind].value = 'Error'; // Handle invalid expressions
                                }
                                break;

                        case 'x': // Replace 'x' with '*' for multiplication
                                result[ind].value += '*';
                                break;

                        case 'AC': result[ind].style.height = 'auto';
                                // Clear the input field
                                result[ind].value = '';
                                acCount++;

                                if (acCount >= 2) {
                                        prevCalc[ind].innerText = ' ';
                                        acCount = 0;
                                }
                                break;

                        case '.': // Handle decimal points
                                // Get the last number segment after the last operator
                                const lastSegment = result[ind].value.split(/[\+\-\*\/]/).pop();

                                if (!lastSegment.includes('.')) { // Allow only if there's no decimal in the current number
                                        result[ind].value += '.';
                                }
                                break;

                        case 'back': // Handle backspace
                                result[ind].value = result[ind].value.slice(0, -1);
                                break;

                        default: // For numbers and other operators
                                result[ind].value += operation;
                }
        });
}

clickCalBtn(0);
clickCalBtn(1);