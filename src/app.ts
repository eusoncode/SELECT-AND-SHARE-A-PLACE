import axios from 'axios';

// Access form and input
const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;

//API Key
const GOOGLE_API_KEY = 'AIzaSyBPee_7VIH-bzRceVBOnTo4rDilw6h6wKg';
declare var google: any;

// define type
type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number, lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
}

//Define function to fetch address input
function searchAddressHandler(event:Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // Send this to Google's API
  axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then(response => {
      if (response.data.status !== 'OK') {
        throw new Error('Could not fetch locaton')
      } 
      const coordinates = response.data.results[0].geometry.location; 
      const map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 8
      });

      // Adding a Marker
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch(err => {
      alert(err.message);
      console.log(err);
      
    })
};

//Add a listener
form.addEventListener('submit', searchAddressHandler);