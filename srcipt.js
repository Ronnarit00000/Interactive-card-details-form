// 
//              define input name
// 

const form = document.querySelector('#form');
const inputName = document.querySelector('#form-name');
const inputNumber = document.querySelector('#form-number');
const inputExpMouth = document.querySelector('#form-exp-mouth');
const inputExpYear = document.querySelector('#form-exp-year');
const inputCvc = document.querySelector('#form-cvc');

// 
//              state prepaint no validation
// 

// add event key-up
inputName.addEventListener('keyup', function(e) {
    e.preventDefault();
    showDefault(this);
    showDisplay(this, this.value, 'prePaint');
})

inputNumber.addEventListener('keyup', function(e) {
    e.preventDefault();
    showDefault(this);
    showDisplay(this, addSpaceToNumber(this.value), 'prePaint');
});

inputExpMouth.addEventListener('keyup', function(e) {
    e.preventDefault();
    showDefault(this);
    showDisplay(this, this.value, 'prePaint');
});

inputExpYear.addEventListener('keyup', function(e){
    e.preventDefault();
    showDefault(this);
    showDisplay(this, this.value, 'prePaint');
});

inputCvc.addEventListener('keyup', function(e){
    e.preventDefault();
    showDefault(this);
    showDisplay(this, this.value, 'prePaint');
});

// 
//                 state validation 
// 

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // start validate
    const validation = [ 

        isValidateName(), 
        isValidateNumber(), 
        isValidateExpMouth(), 
        isValidateExpYear(), 
        isValidateCvc() 

    ].filter(element => element === false);
    
    // if validate success
    if(validation.length === 0) {
        
        // create credit card and paint.
        paintCreditCard(createCreditCard([ inputName, inputNumber, inputExpMouth, inputExpYear, inputCvc ], validation));

        // say thank you
        sayThankYou([ inputName, inputNumber, inputExpMouth, inputExpYear, inputCvc ]);
    }
    
});

// 
//             create Credit Card and paint
// 

function createCreditCard(creditCard, validation){
    return creditCard.map((item, index) => ({
        index,
        form: item.id,
        value: item.value,
        formInput: item,
        isValidation: validation.length === 0
    }))

};

function paintCreditCard(creditCard) {
    for(const input of creditCard){
        if(input.form === 'form-number')
            showDisplay(input.formInput, addSpaceToNumber(input.value), 'success');
        else 
            showDisplay(input.formInput, input.value, 'success');
    }
};

// 
//             say thank you
// 

function sayThankYou(inputAll) {
    
    // create sayThankYou element 
    const sayThankYou = document.createElement('div');

    // add class name
    sayThankYou.className = 'completed-state'
   
    // add content
    sayThankYou.innerHTML = ` 
        <img src="images/icon-complete.svg" alt="">
        <h3>THANK YOU!</h3>
        <p>We’ve added your card details</p>
        <button id="btn-completed-state" class="btn">Continue</button>`;

    // hiened form element
    document.getElementById('form').setAttribute('state', 'success')

    // add sayThankyou to body
    document.body.appendChild(sayThankYou);

    setTimeout(
        
        // add event on click Reset to default
        document.getElementById('btn-completed-state').addEventListener('click', function() {

            // remove sayThankYou element
            sayThankYou.remove();
            document.getElementById('form').removeAttribute('state');

            for(const inputElement of inputAll) {
                inputElement.value = '';
                showDisplay(inputElement,  inputElement.getAttribute('defaultValue'), '');
            }

    }),2000);
    
};

// 
//              show display state reset, error and show result to display
// 

function showDefault(input){
    let formControl = input.parentElement;
    let small = formControl.querySelector('small');
    formControl.removeAttribute('state');
    small.innerText = '';
};

function showError(input, message){
    let formControl = input.parentElement;
    let small = formControl.querySelector('small');
    formControl.setAttribute('state', 'error');
    small.innerText = message;
};

function showDisplay(input, message, state){
    let cardname = 'card-' + input.id.slice(5)
    document.querySelector(`#${cardname}`).setAttribute('state', state);
    document.querySelector(`#${cardname}`).innerHTML = message;
};

// 
//              get field name from input
// 

function getFieldName(input) {
    return input.id.charAt(5).toUpperCase() + input.id.slice(6);
};


// 
//              add space to number
// 

function addSpaceToNumber(number) {
    return number.slice(0, 4) + ' ' + number.slice(4, 8) + ' ' + number.slice(8, 12) + ' ' + number.slice(12);
}

//
//              validate list
// 

// validate input Name
const isValidateName = () => {
    const input =  document.querySelector('#form-name');
    
    if(checkEmpty(input)) return false;
    if(checkLength(input, 8, 40)) return false;

    return true;
};
 
// validate input Number
const isValidateNumber = () => {
    const input = document.querySelector('#form-number');

    if(checkEmpty(input)) return false;
    if(checkLettterInNumber(input)) return false;
    if(checkLength(input, 16, 18)) return false;
    if(checkHasSpace(input)) return false;

    return true;
};

// validate input EXP. Mouth
const isValidateExpMouth = () => {
    const input = document.querySelector('#form-exp-mouth');

    if(checkEmpty(input)) return false;
    if(checkLettterInNumber(input)) return false;
    if(checkLength(input, 2, 4)) return false;
    if(checkHasSpace(input)) return false;

    return true;
};

// validate input EXP. Year
const isValidateExpYear = () => {
    const input = document.querySelector('#form-exp-year');

    if(checkEmpty(input)) return false;
    if(checkLettterInNumber(input)) return false;
    if(checkLength(input, 2, 4)) return false;
    if(checkHasSpace(input)) return false;

    return true;
};

// validate input CVC
const isValidateCvc = () => {
    const input = document.querySelector('#form-cvc');

    if(checkEmpty(input)) return false;
    if(checkLettterInNumber(input)) return false;
    if(checkLength(input, 3, 5)) return false;
    if(checkHasSpace(input)) return false;

    return true;
};

// 
//              check list
// 

// check empty string
function checkEmpty(input){
    if (input.value.trim() === ''){
        showError(input, "Can't be blank");
        return true;
    }else {
        return false;
    }
};

// check letter char in number
function checkLettterInNumber(input){
    let str = input.value;
    for(const char of str){
        if (isNaN(char)){
            showError(input, `Wrong fomat, numbers only`);
            return true;   
        }
    }

    return false;
};

// check length character 
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        return true;
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be les than ${max} characters`);
        return true;
    }

    return false;
};

// check has space
function checkHasSpace(input) {
    let str = input.value;
    if(/\s/.test(str)){
        showError(input, `in ${getFieldName(input)} has spacing`);
        return true;
    }else {
        return false;
    }
}