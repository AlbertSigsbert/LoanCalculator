//DOM Vars
const loanAmount = document.getElementById('loan-amount');
const annualInterest = document.getElementById('annual-interest');
const repaymentYears = document.getElementById('repayment-years');
const monthlyPaymentInput = document.getElementById('monthly-payments');
const totalPaymentInput = document.getElementById('total-payment');
const totalInterestInput = document.getElementById('total-interest');

//Listening form submission
document.querySelector('form').addEventListener('submit',calculateResults);

//Defn calculateResult fn
function calculateResults(e){

    const principal = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(annualInterest.value)/ 100 / 12;
    const calculatedPayments = parseFloat(repaymentYears.value) *12;

    //Defn formula for monthly payments
    const x = Math.pow(1 + calculatedInterest , calculatedPayments);
    const monthlyPayment = (principal * x * calculatedInterest) / (x-1);

    if(isFinite(monthlyPayment)){
        const totalPayment = monthlyPayment * calculatedPayments;
        const totalInterest = totalPayment - principal;
  
        monthlyPaymentInput.value = monthlyPayment.toFixed(2);
        totalPaymentInput.value = totalPayment.toFixed(2);
        totalInterestInput.value = totalInterest.toFixed(2);
    }
    else{
        showError('Please check your numbers');  
    }
   e.preventDefault();
}

//Show Error Fn
function showError(error)
{
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert input input-primary bg-red-200 mb-4';

    //Create text node
    const errorMessage = document.createTextNode(error);
    errorDiv.appendChild(errorMessage);

    //Get elements
    const card = document.getElementById('card');
    const heading = document.getElementById('heading');

    //Insert Error above Heading
    card.insertBefore(errorDiv , heading);

    //Clear error after 3s
    setTimeout(clearError , 3000);
}

//Clear Error fn
function clearError()
{
    document.querySelector('.alert').remove();
}