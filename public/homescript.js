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
