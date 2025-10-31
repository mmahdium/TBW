<template>
  <div
    class="navbar sticky top-0 z-20 bg-white/70 glass border-b border-gray-200/60 shadow-sm transition"
  >
    <!-- Left -->
    <div class="navbar-start">
      <!-- Mobile dropdown -->
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden" aria-label="Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content mt-3 w-52 p-2 rounded-lg shadow-md bg-white/80 backdrop-blur-md border border-gray-200/60"
        >
          <li><RouterLink class="text-gray-700 hover:text-gray-900" to="/">Home</RouterLink></li>
          <li>
            <RouterLink class="text-gray-700 hover:text-gray-900" to="/list">Library</RouterLink>
          </li>
          <li><RouterLink class="text-gray-700 hover:text-gray-900" to="/add">Add</RouterLink></li>
        </ul>
      </div>

      <!-- Logo -->
      <RouterLink
        class="btn btn-ghost normal-case text-2xl font-bold bg-linear-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent"
        to="/"
      >
        To Vue
      </RouterLink>
    </div>

    <!-- Center (desktop menu) -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 space-x-4">
        <li>
          <RouterLink class="text-gray-700 hover:text-gray-900 transition" to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink class="text-gray-700 hover:text-gray-900 transition" to="/list"
            >Library</RouterLink
          >
        </li>
        <li>
          <RouterLink class="text-gray-700 hover:text-gray-900 transition" to="/add"
            >Add</RouterLink
          >
        </li>
      </ul>
    </div>

    <!-- Right -->
    <div class="navbar-end">
      <RouterLink
        class="btn px-5 bg-linear-to-r from-gray-100 to-gray-200 border border-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-300"
        to="/list"
      >
        Go to library
      </RouterLink>
    </div>
  </div>
</template>
