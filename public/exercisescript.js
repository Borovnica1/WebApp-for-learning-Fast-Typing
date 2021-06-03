async function getExercise(exId) {
    const response = await fetch('/exercise/'+exId);
    const data = await response.json();
    console.log('textttts', data)
    renderTexts(data);
  }
  function renderTexts(d) {
    var id = 0;
    console.log('IDEMOOO ', d.length)
    if (d.length > 1) id = Math.floor(Math.random() * d.length);
    if (d.length == 0) {
        document.querySelector('.exercise-title').innerHTML = 'We dont have exercises yet!';
    } else {
        document.querySelector('.exercise-title').innerHTML = d[id].title;
        document.querySelector('.exercise-text').innerHTML = d[id].text;
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
      var el = `<div class="d-flex align-items-center">
    <a href="login.html" type="button" class="btn btn-link px-3 me-2">
      Login
    </a>
    <a href="index.html" type="button" class="btn btn-primary me-3">
      Sign up for free
    </a>

  </div>`
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


