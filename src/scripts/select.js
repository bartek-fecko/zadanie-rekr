const selectInputHandler = (e) => {
   const wrapper = e.target.parentElement;
   const contentElement = wrapper.getElementsByClassName('select-content-wrp')[0];
   const label = wrapper.getElementsByTagName('label')[0];
   const text = e.target.value;
   const hasValue = e.target.getAttribute('placeholder') !== text && text;

   if (contentElement.style.display === 'block') {
      contentElement.style.display = 'none';
      if (hasValue) {
         label.classList.add('move-label-focus');
         label.classList.remove('move-label-blur');
      }
   } else {
      contentElement.style.display = 'block';
      if (hasValue) {
         label.classList.add('move-label-blur');
         label.classList.remove('move-label-focus');
      }
   }
};

const filterUsersList = () => {
   const selectContentElements = document.querySelectorAll('.select-content-wrp ul li');
   return (e) => {
      selectContentElements.forEach((li) => {
         const text = li.getElementsByTagName('p')[0].innerText;
         if (text.toLowerCase().includes(e.target.value)) {
            li.style.display = 'flex';
         } else {
            li.style.display = 'none';
         }
      });
   };
};

let lastElement = null;
const onUserClick = () => {
   return (e) => {
      const li = e.currentTarget;
      const ul = li.parentElement;
      const input = ul.parentElement.parentElement.getElementsByClassName('select-btn')[0];
      if (input) {
         input.value = e.target.innerText;
      }

      if (lastElement) {
         lastElement.classList.remove('active-user');
      }
      li.classList.add('active-user');
      lastElement = li;
   };
};

const selectInputs = [...document.getElementsByClassName('select-btn')];
selectInputs.forEach((input) => input.addEventListener('click', selectInputHandler));
document.getElementsByClassName('inp-select-search')[0].addEventListener('keyup', filterUsersList());
const users = document.querySelectorAll('.select-content-wrp ul li');
users.forEach((user) => user.addEventListener('click', onUserClick()));
