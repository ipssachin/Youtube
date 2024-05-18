const listElement = document.getElementById('array-list');
const messageElement = document.getElementById('message');
const valueInput = document.getElementById('value');
const buttons = document.querySelectorAll('#operations button');

let data = [];
let selectedIndex = null;

function updateList() {
  listElement.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = data[i];
    if (i === selectedIndex) {
      listItem.classList.add('selected');
    }
    listElement.appendChild(listItem);
  }
}

function performOperation(operation) {
  const value = parseInt(valueInput.value, 10);
  let message = '';
  switch (operation) {
    case 'select':
      if (value >= 0 && value < data.length) {
        selectedIndex = value;
        message = `Selected item: ${data[value]}`;
      } else {
        message = 'Invalid index!';
      }
      break;
    case 'add':
      if (!isNaN(value)) {
        data.push(value);
        message = `Added ${value} to the list`;
      } else {
        message = 'Please enter a valid number!';
      }
      break;
    case 'delete':
      if (selectedIndex !== null) {
        data.splice(selectedIndex, 1);
        selectedIndex = null;
        message = `Deleted item at index ${selectedIndex}`;
      } else {
        message = 'No item selected to delete!';
      }
      break;
    case 'update':
      if (selectedIndex !== null && !isNaN(value)) {
        data[selectedIndex] = value;
        message = `Updated item at index ${selectedIndex} to ${value}`;
      } else {
        message = 'Select an item and enter a valid value to update!';
      }
      break;
    case 'search':
      if (!isNaN(value)) {
        const foundIndex = data.indexOf(value);
        if (foundIndex !== -1) {
          message = `Found ${value} at index ${foundIndex}`;
        } else {
          message = `${value} not found in the list`;
        }
      } else {
        message = 'Please enter a valid number to search!';
      }
      break;
    case 'count':
      if (!isNaN(value)) {
        const count = data.filter(item => item === value).length;
        message = `Count of ${value}: ${count}`;
      } else {
        message = 'Please enter a valid number to count!';
      }
      break;
  }
  messageElement.textContent = message;
  updateList();
}

buttons.forEach(button => button.addEventListener('click', () => {
  performOperation(button.id);
}));
