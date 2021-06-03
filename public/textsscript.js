async function getTexts(catId) {
    const response = await fetch('/texts/'+catId);
    const data = await response.json();
    console.log('textttts', data)
    renderTexts(data);
  }
  function renderTexts(d) {
    var mainTexts = document.querySelector('.main-texts');
    var text = document.querySelector('.text');
    var ids = []
    console.log('IDEMOOO ', d.length)
    for (var i = 1; i <= d.length; i++) {
      var t = d[i-1];
  
      // format text!! t.text (NEW) change with <br> ???
      //
      ids.push(t.exercise_id);
      var el = `
      <div class="col-md-4 mt-4 ">
      <h5 class="card-title text-center border-top border-start border-end pt-2">${t.title}</h5>
      <div class="card border">
          <p style="padding:1rem">

  ${t.text}</p>
  <div class="card-body texts-body">
    <a href="/exercise.html?${t.exercise_id}" class="btn btn-primary">Start</a>
  </div>
</div>
    </div>`
    text.insertAdjacentHTML('beforeend', el);
      if (i % 3 == 0) {
          //  make new row and set it to be var categories
          mainTexts.insertAdjacentHTML('beforeend', `<div class="row text${i}"></div>`)
          text = document.querySelector('.text'+i);
      }
    }
    addEditDelete(ids);
  }

function readUrl(url){
    if(url == undefined) {
        /* url variable is not defined */
        // get url parameters
        url = location.search; // e.g. ?num1=43&num2=23
        var params = url.split('?')
        console.log(params)
        if (params.length > 1) {
            document.querySelector('.cat-tag').innerHTML = `(${params[2]})`;
        }
        getTexts(params[1]);
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



async function addEditDelete(ids) {
  const response = await fetch('/check');
  const data = await response.json();
  if(data[0] && typeof data[0] == 'boolean')  {
    var i = 0;
    var catTitle = document.querySelector('.texts-title');
    var el = `<button
    type="button"
    class="btn btn-info"
    data-mdb-toggle="modal"
    data-mdb-target="#exampleModal"
    onclick="addModal()"
  >
    + ADD TEXT
  </button>`;
    catTitle.insertAdjacentHTML('beforeend', el);
    var catBody = document.querySelectorAll('.texts-body');
    console.log('bsajfasjfas', catBody)
    for (cat of catBody) {
      cat.style="display: flex; justify-content: space-between;"
      
      cat.insertAdjacentHTML('beforeend', `<button
      type="button"
      class="btn btn-warning"
      data-mdb-toggle="modal"
      data-mdb-target="#exampleModal"
      onclick="editModal(${ids[i]})"
    >
      Edit
    </button>`);
      cat.insertAdjacentHTML('beforeend', `<button type="button" class="btn btn-danger btn-delete" onclick="deleteText(${ids[i]})">Delete</button>`);
      i++;
    }
  }
}


getCheck();

async function addModal() {
  document.querySelector('.modal-title').innerHTML = `+ Add Text`;
  document.querySelector('.btn-submit').innerHTML = `Add Text`;
  document.querySelector('.edit-form').setAttribute('action', '/exercise');
}

async function editModal(id) {
  console.log('id jeee' , id)
  const response = await fetch('/exercise/'+id);
  const data = await response.json();
  console.log('textttts', data)
  document.querySelector('.modal-title').innerHTML = `Edit (${data[0].title})`;
  document.querySelector('.btn-submit').innerHTML = `Edit Text`;
  document.querySelector('.edit-form').setAttribute('action', '/exercise/'+id);
}


async function editText(id) {
  console.log('edit IDDD', id)
  // daj modal i onda u request neka bude put
  console.log('del IDDDD', id)
  const response = await fetch('/exercise/'+id, {
    method: 'DELETE'
  });
  const body = await response.text();
  console.log(body);
  window.location=body;
}

async function deleteText(id) {
  console.log('del IDDDD', id)
  const response = await fetch('/exercise/'+id, {
    method: 'DELETE'
  });
  const body = await response.text();
  console.log(body);
  window.location=body;
}