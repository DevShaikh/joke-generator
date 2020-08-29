// Get Jokes Event
document.getElementById('jokesForm').addEventListener('submit', getJokes);

// Get Jokes Function
function getJokes(e) {
  const number = document.getElementById('jokesInput').value;
  const loader = document.getElementById('loader');
  document.getElementById('result').innerHTML = '';
  loader.classList = 'row';
  
  const xhr = new XMLHttpRequest()

  xhr.open('GET', `https://api.icndb.com/jokes/random/${number}`, true);
  
  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);

      let output = '';
      let timeout;

      if(response.type === 'success') {
        response.value.forEach(joke => {
          output += `<li>${joke.joke}</li>`;
        });
      }

      if(response.value.length <= 5 ) {
        timeout = 500;
      } else if(response.value.length <= 10) {
        timeout = 1000;
      } else {
        timeout = 2000;
      }

      setTimeout(() => {
        loader.classList = 'row d-none'
        document.getElementById('result').innerHTML = `<h4>Chuck Norris Jokes.</h4>${output}`;
      }, timeout);
    }
    setTimeout(() => {
      loader.classList = 'row d-none'
      document.getElementById('result').innerHTML = `Something went wrong`;
    }, timeout);
  }

  xhr.send();

  e.preventDefault();
}