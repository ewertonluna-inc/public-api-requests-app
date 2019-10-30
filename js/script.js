// This version of the API is not affected by its future updates
const usersURL = 'https://randomuser.me/api/1.3/';

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

/**
 * Gets json object from the specified url.
 * @param {String} url Endpoint.
 * @returns {Promise} Promise that resolves with the json object.
 */
async function getJSON(url){
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error){
        throw error;
    }
}

/**
 * Fetches for a certain number of users.
 * @param {int} numberOfUsers Number of users to fetch.
 * @returns {Promise} A promise that resolves with an array of user objects.
 */
async function getRandomUsers(numberOfUsers){
    const users = [];

    for (let i = 0; i < numberOfUsers; i++){
        // Returns a json object
        const json = await getJSON(usersURL);
        // json.results contains user information
        const user = json.results[0];
        users.push(user);
    }
    return users;
}

// ------------------------------------------
//  HELPER FUNCTIONS 
// ------------------------------------------

/**
 * Generates HTML for the gallery
 * @param {Object} data User object
 */
function generateGaleryHTML(data){
    const img = data.picture.medium;
    const firstAndLastName = data.name.first + ' ' + data.name.last;
    const email = data.email;
    const cityAndState = data.location.city + ', ' + data.location.state;
    const html = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${img}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${firstAndLastName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${cityAndState}</p>
            </div>
        </div>
    `;
    document.getElementById('gallery').innerHTML += html;
}

// ------------------------------------------
//  PAGE INITIAL SET UP
// ------------------------------------------

const promise = getRandomUsers(12);
promise
  .then( users => {
      users.map( user => generateGaleryHTML(user) );
  } )
  .catch(err => console.log('Oops... An error occured:', err));

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

