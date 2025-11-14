<template>
  <nav
    class="navbar sticky top-0 z-30 bg-base-100/70 backdrop-blur-md border-b border-base-content/20 shadow-sm"
  >
    <!-- Left: Logo + Mobile Menu -->
    <div class="navbar-start">
      <!-- Mobile dropdown -->
      <div class="dropdown lg:hidden">
        <label tabindex="0" class="btn btn-ghost p-2" aria-label="Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-base-content/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 w-52 rounded-md bg-base-200/90 backdrop-blur-md shadow-lg border border-base-content/20"
        >
          <li><RouterLink to="/" class="nav-link">Home</RouterLink></li>
          <li><RouterLink to="/list" class="nav-link">Library</RouterLink></li>
          <li><RouterLink to="/add" class="nav-link">Add</RouterLink></li>
        </ul>
      </div>

      <!-- Logo -->
      <RouterLink
        to="/"
        class="text-2xl font-extrabold tracking-tight bg-linear-to-r from-base-content/70 via-primary to-base-content/70 bg-clip-text text-transparent"
      >
        TBW
      </RouterLink>
    </div>

    <!-- Center: Desktop Menu -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal gap-6">
        <li><RouterLink to="/" class="nav-link">Home</RouterLink></li>
        <li><RouterLink to="/list" class="nav-link">Library</RouterLink></li>
        <li><RouterLink to="/add" class="nav-link">Add</RouterLink></li>
      </ul>
    </div>

    <!-- Right: CTA -->
    <div class="navbar-end">
      <RouterLink
        to="/list"
        class="btn px-5 bg-linear-to-r from-base-300 to-base-200 border border-base-content/30 text-base-content hover:from-base-200 hover:to-base-100 hover:text-base-content/90 transition"
      >
        Go to Library
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
@reference "@/style.css";
.nav-link {
  @apply text-base-content font-medium transition-colors hover:text-base-content;
}
.router-link-active.nav-link {
  @apply text-primary font-semibold;
}
</style>
