// Access form and input
const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;

//Define function to fetch address input
function searchAddressHandler(event:Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  console.log(enteredAddress);
  

  // send this to Google's API
};

//Add a listener
form.addEventListener('submit', searchAddressHandler);