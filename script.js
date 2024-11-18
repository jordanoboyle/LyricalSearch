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

  //THIS IS ONE WAY
  // data.data.forEach(song => {
  //   output += `
  //     <li>
  //       <span><strong>${song.artist.name} </strong> - ${song.title}</span>
  //       <button 
  //       class="btn" 
  //       data-artist= "${song.artist.name}"
  //       data-songtitle="${song.title}"> 
  //       Get Lyrics 
  //       </button>
  //     </li>
  //   `;
  // });
  
  // result.innerHTML = `
  //   <ul class="songs">
  //     ${output}
  //   </u>
  // `

  result.innerHTML = `
    <ul class="songs">
      ${data.data.map(song => `
        <li>
         <span><strong>${song.artist.name} </strong> - ${song.title}</span>
         <button 
         class="btn" 
         data-artist= "${song.artist.name}"
         data-songtitle="${song.title}"> 
         Get Lyrics 
         </button>
       </li>
        `).join(" ")
      }
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${data.prev ? `
        <button class="btn" onClick="getMoreSongs('${data.prev}')"> 
        Previous 
        </button>` : ''}
      ${data.next ? `
        <button class="btn" onClick="getMoreSongs('${data.next}')"> 
        Next
        </button>` : ''}
    `;
  } else {
    more.innerHTML = '';
  }
}

//GET MORE SONGS (Previous and Next)
//we need to overcome CORS here. use Heroku-anywhere proxy server
async function getMoreSongs(url) {
  console.log(url)
  const response = await fetch(`http://cors-anywhere.herokuapp.com/${url}`);
  const data = await response.json();

  showData(data);
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


//CORS has to do with cross domain policies. Each website has it's own policies. 