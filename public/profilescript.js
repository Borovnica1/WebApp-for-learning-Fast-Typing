console.log('GIEFMEIOFE');

async function getHistory() {
  const response = await fetch('/history');
  const data = await response.json();
  console.log('HISTORYYY', data)
  // Uzmi sa kraja 10 jer to je verovatno najnovije vezbe
  if (data.length > 10) data.length = 10;
  renderHistory(data);
}
function renderHistory(d) {
  var hist = document.querySelector('.history');
  var avgWpm = 0;
  console.log('IDEMOOO ', d.length)
  for (var ex of d) {
    // ima bolja formula za racunanje wpm
    var wpm = ex.text.length / ex.time_taken;
    avgWpm += wpm;
    var el = `
    <div class="col-md m-5 mt-4">
        <h3 class="card-title text-center border-top border-start border-end pt-2">${ex.title}</h3>
        <div class="card border">
            <h5 class="p-2 ps-4 border">Time taken: ${ex.time_taken.toFixed(2)}</h5>
            <h5 class="p-2 ps-4 border">Words per minute: ${wpm.toFixed(2)}</h5>
            <h5 class="p-2 ps-4 border">Most wrong chars: ${ex.wrong_chars}</h5>
            <div class="card-body">
                <a href="/exercise.html" class="btn btn-primary" exId="${ex.exercise_id}">Try again</a>
            </div>
        </div>
    </div>`
    hist.insertAdjacentHTML('beforeend', el);
  }
  if (d.length == 0) hist.insertAdjacentHTML('beforeend', `<h3 class="card-title text-center border-top border-start border-end pt-2">You have yet to do some exercies</h3>
  `);
  avgWpm /= d.length;
  document.querySelector('.average-wpm').innerHTML = 'Average wpm: ' + avgWpm.toFixed(2);;
}

async function getUser() {
  const response = await fetch('/profile');
  const data = await response.json();
  console.log('sss', data)
  renderUser(data);
}
function renderUser(d) {
  document.querySelector('.username').innerHTML = 'Username: ' + d.username;
  document.querySelector('.email').innerHTML = 'Email: ' + d.email;
  document.querySelector('.typing-speed').innerHTML = 'Typing speed: ' + d.typing_speed;
}

async function getCheck() {
  const response = await fetch('/check');
  const data = await response.json();
  console.log('CHECKKKK', data)
  // admin
  if (data[0] && typeof data[0] == 'boolean') {
    getUser();
  } else if (data[0] == 'guest') {
    var hist = document.querySelector('.history');
    hist.insertAdjacentHTML('beforeend', `<h3 class="card-title text-center border-top 
    border-start border-end pt-2">You have to login!</h3>
    <a style="display:block; background-color:aqua" href="login.html" type="button" class="btn btn-link px-3 me-2">
    Login
  </a>
  `);
  } else {
    getHistory();
    getUser();
  }
}

getCheck();
