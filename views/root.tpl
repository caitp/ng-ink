<header id="topbar">
  <nav class="ink-navigation ink-grid">
    <ul class="menu horizontal shadowed flat black">
      <li><a href="/" class="logoPlaceholder">ng-ink</a></li>
      <li>
        <a href="#">Directives</a>
        <ul class="submenu dropdown-menu">
          <li ng-repeat="dir in directives">
            <a ng-href="#/directives/{{dir}}" title="{{dir}} directive">{{dir}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</header>
<main class="ink-grid">
  <section ui-view="main">
  </section>
</main>