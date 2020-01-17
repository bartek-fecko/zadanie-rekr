import { onBlur } from './textInputs';
const addBtn = document.querySelector('.add-task-wrp button');
const task = document.getElementsByClassName('add-task')[0];
const plnAmount = document.getElementsByClassName('add-pln')[0];
const checkout = document.querySelector('.tasks .checkout');

const deleteTask = (e) => {
   const plnAmountElement = e.currentTarget.parentElement.getElementsByClassName('pln-amount')[0];
   const sum = plnAmountElement.dataset.sum;
   console.log(sum, plnAmountElement)
   e.currentTarget.parentElement.style.display = 'none';
   updateCheckout(sum, false);
};

const updateCheckout = (amount, increace = true) => {
   amount = increace ? amount : -amount;
   checkout.dataset.sum = Number(checkout.dataset.sum) + Number(amount);
   checkout.innerText = `Suma: ${checkout.dataset.sum} PLN (${checkout.dataset.sum / 4.8282} Euro)`;
};

const createNewTask = (taskValue, plnAmountValue) => {
   const table = document.querySelector('.tasks table');
   const tr = document.createElement('tr');
   const taskTd = document.createElement('td');
   const plnTd = document.createElement('td');
   const eurTd = document.createElement('td');
   const deleteTd = document.createElement('td');

   taskTd.innerText = taskValue;
   plnTd.innerText = `${plnAmountValue} PLN`;
   plnTd.dataset.sum = plnAmountValue;
   plnTd.className = 'pln-amount';
   eurTd.innerText = `${(plnAmountValue / 4.8282).toFixed(2)} EUR`;
   deleteTd.innerHTML = '<i class="fas fa-trash"></i> Usuń';
   deleteTd.className = 'delete';

   tr.appendChild(taskTd);
   tr.appendChild(plnTd);
   tr.appendChild(eurTd);
   tr.appendChild(deleteTd);
   table.appendChild(tr);

   deleteTd.addEventListener('click', deleteTask);
   updateCheckout(plnAmountValue);
};

addBtn.addEventListener('click', (e) => {
   e.preventDefault();
   let isValid = true;
   document.querySelectorAll('.tasks .inp-base').forEach((input) => {
      const label = input.parentElement.getElementsByTagName('label')[0];
      const errorElement = input.parentElement.getElementsByClassName('inp-err')[0];
      const isInputValid = onBlur(input, label, errorElement);
      if (isValid) {
         isValid = isInputValid;
      }
   });
   const taskValue = task.value.trim();
   const plnAmountValue = plnAmount.value.trim();
   if (taskValue && plnAmountValue && isValid) {
      alert('new task added');
      createNewTask(taskValue, plnAmountValue);
   }
});
