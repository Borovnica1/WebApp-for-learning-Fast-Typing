
async function getCategories() {
  const response = await fetch('/categories');
  const data = await response.json();
  const response2 = await fetch('/photos');
  const data2 = await response2.json();
  console.log('categoriessss', data, 'XPXXXO', data2)
  renderCategories(data, data2);
}
async function renderCategories(d, d2) {
  var mainCategories = document.querySelector('.main-categories');
  var categories = document.querySelector('.categories');
  var ids = []
  console.log('IDEMOOO ', d.length)
  for (var i = 1; i <= d.length; i++) {
    var categ = d[i-1];

    var photo = d2.find(p => p.category_id == categ.category_id);
    ids.push(categ.category_id);

    await fetch(photo.image_path, { method: 'HEAD' })
    .then(res => {
        if (res.ok) {
            console.log('Image exists.');
        } else {
            console.log('Image does not exist.');
            photo.image_path = 'img/categories.jpg';
        }
    }).catch(err => console.log('Error:', err));
    console.log(categ, photo, i % 3 == 0);
    var el = `
    <div class="col-md-4 mt-4">
      <h5 class="card-title text-center border-top border-start border-end pt-2">${categ.name}</h5>
      <div class="card">
        <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
          <img
            src="${photo.image_path}"
            class="img-fluid"
          />
          <a href="#!">
            <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
          </a>
        </div>
        <div class="card-body category-body">
          <a href="/texts.html?${categ.category_id}?${categ.name}" class="btn btn-primary" categoryId=${categ.category_id}>Explore</a>
        </div>
      </div>
    </div>`
    categories.insertAdjacentHTML('beforeend', el);
    if (i % 3 == 0) {
        //  make new row and set it to be var categories
        mainCategories.insertAdjacentHTML('beforeend', `<div class="row categories${i}"></div>`)
        categories = document.querySelector('.categories'+i);
    }
  }
  addEditDelete(ids);
}

getCategories();


/// MENU
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
    var catTitle = document.querySelector('.categories-title');
    var el = `<button
    type="button"
    class="btn btn-info"
    data-mdb-toggle="modal"
    data-mdb-target="#exampleModal"
    onclick="addModal()"
  >
    + ADD CATEGORY
  </button>`;
    catTitle.insertAdjacentHTML('beforeend', el);
    var catBody = document.querySelectorAll('.category-body');
    console.log('bsajfasjfas', catBody, ids)
    var i = 0;
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
      cat.insertAdjacentHTML('beforeend', `<button type="button" class="btn btn-danger btn-delete" onclick="deleteCategory(${ids[i]})">Delete</button>`);
      i++;
    }
  }
  
}


getCheck();

async function addModal() {
  document.querySelector('.modal-title').innerHTML = `+ Add Category`;
  document.querySelector('.btn-submit').innerHTML = `Add Category`;
  document.querySelector('.edit-form').setAttribute('action', '/category');
}

async function editModal(id) {
  console.log('id jeee' , id)
  const response = await fetch('/category/'+id);
  const data = await response.json();
  console.log('textttts', data)
  document.querySelector('.modal-title').innerHTML = `Edit (${data[0].title})`;
  document.querySelector('.btn-submit').innerHTML = `Edit Category`;
  document.querySelector('.edit-form').setAttribute('action', '/category/'+id);
}

async function deleteCategory(id) {
  console.log('del IDDDD', id)
  const response = await fetch('/category/'+id, {
    method: 'DELETE'
  });
  const body = await response.text();
  console.log(body);
  window.location=body;
}