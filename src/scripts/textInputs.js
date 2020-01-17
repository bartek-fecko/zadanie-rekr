const validator = (value, inputKey) => {
   if (inputKey === 'taskName') {
      if (value.trim().length < 5) {
         return false;
      }
   }
   if (inputKey === 'plnAmount') {
      if (!Number.isInteger(Number(value.trim()))) {
         return false;
      }
   }
   if (!value.trim()) {
      return false;
   }
   return true;
};

let placeholderValue;

export const onBlur = (input, label, errorElement) => {
   input.setAttribute('placeholder', placeholderValue || '');
   const inputKey = input.dataset.key;
   label.className = 'move-label-blur';

   const isValid = validator(input.value, inputKey);
   if (!isValid) {
      input.style.border = '1px solid #FF4003';
      if (errorElement) {
         errorElement.style.opacity = '1';
      }
   }
   return isValid;
};

export const onFocus = (errorElement, input, label) => {
   if (errorElement) {
      errorElement.style.opacity = '0';
   }
   input.style.border = '1px solid #E1E1E1';
   label.className = 'move-label-focus';
   placeholderValue = input.getAttribute('placeholder');
   input.removeAttribute('placeholder');
};

const textInputHandler = () => {
   return (e) => {
      const input = e.target;
      const errorElement = input.parentElement.getElementsByClassName('inp-err')[0];
      const label = input.parentElement.getElementsByTagName('label')[0];

      if (e.type === 'focus') {
         onFocus(errorElement, input, label);
      }

      if (e.type === 'blur') {
         onBlur(input, label, errorElement);
      }
   };
}

const baseTextInputs = [...document.getElementsByClassName('inp-base')];
baseTextInputs.forEach((input) => {
   input.addEventListener('focus', textInputHandler());
   input.addEventListener('blur', textInputHandler());
});
