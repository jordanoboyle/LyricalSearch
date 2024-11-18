//DOM ELEMENTS
const form   = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more   = document.getElementById('more');

//API URL NEEDED
const apiURL = 'https://api.lyrics.ovh';

//SEARCH SONG BY SONG OR ARTIST

//A WAY TO DO IT WITH .then
// function searchSongs(term) {
//   fetch(`${apiURL}/suggest/${term}`)
//   .then(response => response.json())
//   .then(data => console.log(data));
// }
//USING ASYNC (this is cleaner and easier to read)
async function searchSongs(term) {
  const response = await fetch(`${apiURL}/suggest/${term}`);
  const data = await response.json();
  // console.log(data)

  showData(data);
}

//Show Song and Artists in DOM
function showData(data) {
  let output = '';

  data.data.forEach(song => {
    output += `
      <li>
        <span><strong>${song.artist.name} </strong> - ${song.title}</span>
        <button 
        class="btn" 
        data-artist= "${song.artist.name}"
        data-songtitle="${song.title}"> 
        Get Lyrics 
        </button>
      </li>
    `
  })
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
