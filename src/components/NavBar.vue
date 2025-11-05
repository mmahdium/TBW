<template>
  <nav
    class="navbar sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-gray-200/60 shadow-sm"
  >
    <!-- Left: Logo + Mobile Menu -->
    <div class="navbar-start">
      <!-- Mobile dropdown -->
      <div class="dropdown lg:hidden">
        <label tabindex="0" class="btn btn-ghost p-2" aria-label="Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-700"
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
          class="menu menu-sm dropdown-content mt-3 w-52 rounded-md bg-white/90 backdrop-blur-md shadow-lg border border-gray-200/60"
        >
          <li><RouterLink to="/" class="nav-link">Home</RouterLink></li>
          <li><RouterLink to="/list" class="nav-link">Library</RouterLink></li>
          <li><RouterLink to="/add" class="nav-link">Add</RouterLink></li>
        </ul>
      </div>

      <!-- Logo -->
      <RouterLink
        to="/"
        class="text-2xl font-extrabold tracking-tight bg-linear-to-r from-gray-700 via-indigo-500 to-cyan-400 bg-clip-text text-transparent"
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
        class="btn px-5 bg-linear-to-r from-gray-100 to-gray-200 border border-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 transition"
      >
        Go to Library
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
@reference "tailwindcss";
.nav-link {
  @apply text-gray-700 font-medium transition-colors hover:text-gray-900;
}
.router-link-active.nav-link {
  @apply text-indigo-600 font-semibold;
}
</style>
