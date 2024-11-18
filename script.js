//DOM ELEMENTS
const form   = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more   = document.getElementById('more');

//API URL NEEDED
const apiURL = 'https://api.lyrics.ovh/v1';

function searchSongs(terms) {
  return true
}

//Event Listeners
form.addEventListener('submit', e => {
  e.preventDefault(); // this is necessary every time, prevents submitting to file

  const searchTerm = search.value.trim() ;
  // console.log(searchTerm)

  if(!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
})
