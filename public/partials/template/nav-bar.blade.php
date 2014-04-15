  <nav class="top-bar" data-topbar ng-controller="navbarController">
    <ul class="title-area">
      <li class="name">
        <h1><a ui-sref="home">Guides</a></h1>
      </li>
      <li class="toggle-topbar menu-icon"><a href="#">Menu</a></li>
    </ul>

  <section class="top-bar-section">
    <!-- Right Nav Section -->
    <ul class="right">
      <li><a ui-sref="register" ng-hide="$auth.isLoggedIn()">Register</a></li>
      <li><a ui-sref="login" ng-hide="$auth.isLoggedIn()">Login</a></li>
      <li><a ng-click="logout()" ng-show="$auth.isLoggedIn()">Logout</a></li>
    </ul>

    <!-- Left Nav Section -->
    <ul class="left">
      <li class="active"><a ui-sref="home">Home</a></li>
      <li><a ui-sref="guides">all Guides</a></li>
      <li><a ui-sref="user-profile" ng-show="$auth.isLoggedIn()">my Profile</a></li>
      <li><a ui-sref="new-guide" ng-show="$auth.isLoggedIn()">write Guide</a></li>

    </ul>
  </section>
</nav>