var exerciseText;

async function getExercise(exId) {
    const response = await fetch('/exercise/'+exId);
    const data = await response.json();
    console.log('textttts', data)
    renderTexts(data);
  }
  function renderTexts(d) {
    var id = 0;
    console.log('IDEMOOO ', d.length)
    console.log('IDEMOOO2222 ', d)
    if (d.length > 1) id = Math.floor(Math.random() * d.length);
    if (d.length == 0) {
        document.querySelector('.exercise-title').innerHTML = 'We dont have exercises yet!';
    } else {

        exerciseText = d[id].text;
        var html = '';
        var words = d[id].text.trim().split(' ');
        var wordsLength = words.length;
        console.log('ggg', wordsLength)
        var i = 1;
        for (word of words) {
          html += `<span>`
          for (char of word) {
            html += `<span style="color:black;">${char}</span>`
          }
          if (i == wordsLength) {
            html += `</span>`
            break;
          }
          i++;
          html += `<span>&nbsp;</span></span>`
        }
        document.querySelector('.exercise-title').innerHTML = d[id].title;
        document.querySelector('.exercise-title').setAttribute('exId', d[id].exercise_id);
        document.querySelector('.exercise-text').innerHTML = html;
        
    }
    
  }

function readUrl(url){
    if(url == undefined) {
        /* url variable is not defined */
        // get url parameters
        url = location.search; // e.g. ?num1=43&num2=23
        var params = url.split('?')
        console.log('KKKKKK',params)
        getExercise(params[1]);
    }
}
readUrl();


async function getCheck() {
  const response = await fetch('/check');
  const data = await response.json();
  console.log('CHECKKKK', data)
  // admin or user
  var menu = document.querySelector('.meni');
  if (typeof data[0] == 'boolean') {
      // make it possible to start exercise for user or admin
      document.querySelector('.start-btn').addEventListener('click', () => {
        var i = 2;
        document.querySelector('.countdown').innerHTML = '3';
        var idVar = setInterval(function () {
          document.querySelector('.countdown').innerHTML = i;
          i--;
          // start timer
          if (i == 0) startTime();
          if (i == -1) {
            // stop execution
            clearInterval(idVar);
            document.querySelector('.countdown').innerHTML = 'GO!';
            document.querySelector('.type-input').setAttribute('maxlength', 90);
            // remove button
            var btnPar = document.querySelector('.countdown').parentElement;
            btnPar.removeChild(btnPar.lastElementChild);
            // add wpm and accuracy
            document.querySelector('.countdown').parentElement.insertAdjacentHTML('beforeend', `<h1 class="display-6 p-2 text-center wpm">WPM: </h1>`)
            document.querySelector('.countdown').parentElement.insertAdjacentHTML('beforeend', `<h3 class="display-8 p-2 text-center accuracy">Accuracy: </h3>`)
            
            checkTyping()
          }
        }, 1000);
        
        
        
        
      })

      var el = `<div class="d-flex align-items-center" style="position: relative;">
      <ul
        class="dropdown-menu dropdown-menu-end"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <li>
          <a class="dropdown-item" href="#">Some news</a>
        </li>
        <li>
          <a class="dropdown-item" href="#">Another news</a>
        </li>
        <li>
          <a class="dropdown-item" href="#">Something else here</a>
        </li>
      </ul>

      <!-- Avatar -->
      <a
        class="dropdown-toggle d-flex mt-2 align-items-center hidden-arrow"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
      >
      <span style="margin-right: .5rem;">Profile</span>
        <img
          src="https://mdbootstrap.com/img/new/avatars/2.jpg"
          class="rounded-circle"
          height="45"
          alt=""
          loading="lazy"
        />
      </a>
      <ul
        class="dropdown-menu dropdown-menu-end"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <li>
          <a class="dropdown-item" href="/profile.html">My profilee</a>
        </li>
        <li>
          <a class="dropdown-item" href="/loggout">Logout</a>
        </li>
      </ul>
    </div>`
      menu.insertAdjacentHTML('beforeend', el);
  } else {
    // tell guest that he has  to login in order to start exercise!
    document.querySelector('.start-btn').addEventListener('click', () => {
      var i = 2;
      document.querySelector('.countdown').innerHTML = '3';
      var idVar = setInterval(function () {
        document.querySelector('.countdown').innerHTML = i;
        i--;
        // start timer
        if (i == 0) startTime();
        if (i == -1) {
          // stop execution
          clearInterval(idVar);
          document.querySelector('.countdown').innerHTML = 'GO!';
          document.querySelector('.type-input').setAttribute('maxlength', 90);
          // remove button
          var btnPar = document.querySelector('.countdown').parentElement;
          btnPar.removeChild(btnPar.lastElementChild);
          // add wpm and accuracy
          document.querySelector('.countdown').parentElement.insertAdjacentHTML('beforeend', `<h1 class="display-6 p-2 text-center wpm">WPM: </h1>`)
          document.querySelector('.countdown').parentElement.insertAdjacentHTML('beforeend', `<h3 class="display-8 p-2 text-center accuracy">Accuracy: </h3>`)

          checkTyping()
        }
      }, 1000);
    })
    /* let html = `
    <h1 class="display-6 p-2 text-center starting">You have to be logged in to start exercise!</h1>
    <div class="d-flex align-items-center" style="justify-content:center">
    <a href="login.html" type="button" class="btn btn-link px-3 me-2">
      Login
    </a>
    <a href="index.html" type="button" class="btn btn-primary me-3">
      Sign up for free
    </a>

  </div>`;
    document.querySelector('.start-btn').parentElement.innerHTML = html; */
      var el = `<div class="d-flex align-items-center">
    <a href="login.html" type="button" class="btn btn-link px-3 me-2">
      Login
    </a>
    <a href="index.html" type="button" class="btn btn-primary me-3">
      Sign up for free
    </a>

  </div>`;
    menu.insertAdjacentHTML('beforeend', el);
  }

}
getCheck();





/// start button
/// uzimaj sa inputa
// oznacavaj slova
// racunaj i prikazuj wpm
// na kraju prikazi rezultat i wrong chars
// ubaci u bazu
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// im setting these global vars cuz i dont know better
var totalKeyStrokes = 0;
var totalWrongChars = 0;
var totalCorrectChars = 0;
var wrongChars = {}
var minutes = 0;
var seconds = 0;
var timeId;
var acu;
var wpm;
const zeroPad = (num, places) => String(num).padStart(places, '0')

function startTime() {
  var timeEl = document.querySelector('.starting');
  acu = (totalCorrectChars/(totalWrongChars+totalKeyStrokes) * 100).toFixed(2);
  wpm = ((totalKeyStrokes/5)/(minutes+seconds/60)).toFixed(0);
  
  timeId = setInterval(function () {
    acu = (totalCorrectChars/(totalWrongChars+totalKeyStrokes) * 100).toFixed(2);
    wpm = ((totalKeyStrokes/5)/(minutes+seconds/60)).toFixed(0);
    timeEl.textContent = `Time:   ${zeroPad(minutes, 2)} : ${zeroPad(seconds, 2)}`;
    document.querySelector('.wpm').textContent = `WPM: ${wpm == 'NaN' ? 0 : wpm}`
    document.querySelector('.accuracy').textContent = `Accuracy: ${acu == 'NaN' ? 0 : acu} %`;

    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }
  }, 1000);
}



function checkTyping() {
  // compare with this exerciseText
  var exerciseWords = exerciseText.trim().split(' ');
  var wordsLength = exerciseWords.length;
  console.log(exerciseWords,'AJMO', exerciseText.textContent);
  exerciseText = document.querySelector('.exercise-text')
  console.log('LOLLL', exerciseText);
  var i = 0;
  var l;
  var input = document.querySelector('.type-input');
  input.addEventListener('keyup', () => {
    totalKeyStrokes++;
    console.log(input.value)
    console.log('KK', exerciseWords[i])
    if (input.value.length < exerciseWords[i].length) l = input.value.length;
    else l = exerciseWords[i].length;
    for (var j = 0; j < exerciseWords[i].length; j++) {
      if (exerciseText.children[i].children[j] == undefined) break
      exerciseText.children[i].children[j].style = 'color:black';
    }
    
    var added = false;
    for (var j = 0; j < l; j++) {

      if (exerciseWords[i][j] == input.value[j]) {
        console.log('PPPPP', i, wordsLength-1,j, exerciseWords[i].length-1)
        // end of text
        if (i == wordsLength-1 && j == exerciseWords[i].length-1) {
          console.log('ENDD');
          // sort wrong chars and take only first five
          
          var sortable = [];
          for (var vehicle in wrongChars) {
              sortable.push([vehicle, wrongChars[vehicle]]);
          }
          sortable.sort(function(a, b) {
              return b[1] - a[1];
          });
          console.log('sortt', sortable)
          var n = sortable.length < 3 ? sortable.length : 3;
          wrongChars = '';
          for (var k = 0; k < n; k++) wrongChars += ` ${sortable[k][0]}-${sortable[k][1]} `;
          wrongChars.trim();
          input.setAttribute('maxlength', 0);
          input.value = '';
          clearInterval(timeId);
          var el = `<div style="height:100vh;width:100%; background-color:rgba(218, 223, 225, .5);
          position:absolute;top:0;left:0;display:flex;justify-content:center
          ;align-items:center">
            <div class="col-md m-5 mt-4" style="background-color:white; max-width:30%">
              <h3 class="card-title text-center border-top border-start border-end pt-2">${document.querySelector('.exercise-title').textContent}</h3>
              <div class="card border">
              <h5 class="p-2 ps-4 border">Time taken: ${zeroPad(minutes, 2)} : ${zeroPad(seconds, 2)}</h5>
              <h5 class="p-2 ps-4 border">Words per minute: ${wpm == 'NaN' ? 0 : wpm}</h5>
              <h5 class="p-2 ps-4 border">Accuracy: ${acu == 'NaN' ? 0 : acu} %</h5>
              <h5 class="p-2 ps-4 border">Most wrong chars: ${wrongChars}</h5>
            <div class="card-body" style="display:flex;justify-content:space-around;">
                <a href="/exercise.html?${document.querySelector('.exercise-title').getAttribute('exId')}" class="btn btn-primary">Try again</a>
                <a href="/exercise.html?0" class="btn btn-success">Random</a>
                <a href="/texts.html" class="btn btn-info">Browse texts</a>
            </div>
        </div>
    </div>
          </div>`
          document.body.insertAdjacentHTML('beforeend', el);
          // insert it into mysql
          (async () => {
            const rawResponse = await fetch(`/exercise/${document.querySelector('.exercise-title').getAttribute('exId')}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({timeTaken: `${zeroPad(minutes, 2)} : ${zeroPad(seconds, 2)}`, wpm: wpm, accuracy:acu, wrongCs:wrongChars})
            });
            const content = await rawResponse.json();
          
            console.log(content);
          })();
          // and fetch for exercise_histort table
          (async () => {
            const rawResponse = await fetch(`/getHistoryId/${document.querySelector('.exercise-title').getAttribute('exId')}`);
            const content = await rawResponse.json();
          
            console.log(content);
          })();
          
        }
        if (!added) totalCorrectChars++;
        added = true;
        // paint the letter red
        console.log('IDEMO ', input.value[j+1], input.value[j+1] == ' ', exerciseWords[i].length, j);
        if (exerciseWords[i].length-1 == j && input.value[j+1] == ' ') {          
          exerciseText.children[i].children[j+1].style = 'background-color:tomato';
          exerciseText.children[i].children[j].style = 'color:red';
          // made the whole word check next word
          i++;
          input.value = '';
          break;
        }
        exerciseText.children[i].children[j].style = 'color:red';
      } else {
        totalWrongChars++;
        if (exerciseWords[i][j] in wrongChars) {
          wrongChars[exerciseWords[i][j]] += 1
        } else {
          wrongChars[exerciseWords[i][j]] = 1
        }
        break
      }
    }
  });
}

