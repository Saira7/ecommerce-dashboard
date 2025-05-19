<template>
  <div class="flex min-h-screen bg-slate-50 dark:bg-slate-900">
    <!-- Sidebar -->
    <div
      :class="[
        'fixed inset-y-0 left-0 z-50 w-56 sm:w-64 bg-white dark:bg-slate-800 shadow-lg',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:fixed lg:translate-x-0 lg:shadow-none'
      ]"
    >
      <div class="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 border-b border-slate-200 dark:border-slate-700">
        <div class="flex items-center">
          <img src="./assets/logo.svg" alt="Logo" class="h-6 sm:h-8 w-6 sm:w-8" />
          <span class="ml-2 text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">Admin</span>
        </div>
        <button
          @click="toggleSidebar"
          class="p-1 rounded-md text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-700 lg:hidden"
        >
          <svg class="w-5 sm:w-6 h-5 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="py-3 sm:py-4 h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)] overflow-y-auto">
        <nav class="px-2 space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              isActiveRoute(item.href)
                ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50',
              'group flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors'
            ]"
            @click="sidebarOpen = false"
          >
            <component
              :is="item.icon"
              :class="[
                isActiveRoute(item.href)
                  ? 'text-violet-600 dark:text-violet-400'
                  : 'text-slate-500 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300',
                'mr-2 sm:mr-3 flex-shrink-0 h-4 sm:h-5 w-4 sm:w-5 transition-colors'
              ]"
              aria-hidden="true"
            />
            {{ item.name }}
          </router-link>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden lg:ml-47 lg:translate-x-0">
      <!-- Top navigation -->
      <header class="w-full bg-white dark:bg-slate-800 shadow-sm z-0">
        <div class="flex items-center justify-between h-14 sm:h-16  pr-3 sm:pr-4 border-b border-slate-200 dark:border-slate-700">
          <div class="flex items-center space-x-2 sm:space-x-4">
            <button
              @click="toggleSidebar"
              class="p-1.5 rounded-md text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-700 lg:hidden"
            >
              <svg class="w-5 sm:w-6 h-5 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div class="max-w-[10rem] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg overflow-hidden">
              <h1 class="text-base sm:text-lg font-medium text-slate-800 dark:text-white truncate">
                {{ pageTitle }}
              </h1>
            </div>
          </div>

          <div class="flex items-center space-x-2 sm:space-x-3">
            <!-- Mobile search button -->
            <button
              @click="mobileSearchOpen = true"
              class="p-1.5 rounded-md text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-700 md:hidden"
            >
              <svg class="w-5 sm:w-6 h-5 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <!-- Desktop search -->
            <div class="relative hidden md:block">
              <div class="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                <svg class="h-4 sm:h-5 w-4 sm:w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                v-model="searchQuery"
                @focus="searchFocused = true"
                @keyup.esc="clearSearch"
                placeholder="Search..."
                class="pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-slate-200 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 w-48 sm:w-64 text-sm sm:text-base"
              />

              <!-- Search Results Dropdown -->
              <div
                v-if="searchFocused && searchQuery.length > 0"
                class="absolute mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 border border-slate-200 dark:border-slate-700 max-h-80 sm:max-h-96 overflow-y-auto"
                v-click-outside="() => { searchFocused = false }"
              >
                <div v-if="searchResults.length === 0" class="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  No results found for "{{ searchQuery }}"
                </div>

                <template v-else>
                  <div class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Products
                  </div>
                  <router-link
                    v-for="result in searchResults.filter(r => r.type === 'product')"
                    :key="result.id"
                    :to="result.link"
                    class="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    @click="clearSearch"
                  >
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-6 sm:h-8 w-6 sm:w-8">
                        <img class="h-6 sm:h-8 w-6 sm:w-8 rounded-md object-cover" :src="result.image" alt="" />
                      </div>
                      <div class="ml-2 sm:ml-3">
                        <div class="font-medium truncate">{{ result.name }}</div>
                        <div class="text-slate-500 dark:text-slate-400 text-xs">{{ result.category }}</div>
                      </div>
                      <div class="ml-auto text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        ${{ result.price }}
                      </div>
                    </div>
                  </router-link>

                  <div class="border-t border-slate-200 dark:border-slate-700 mt-1 sm:mt-2 pt-1 sm:pt-2"></div>

                  <div class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Orders
                  </div>
                  <router-link
                    v-for="result in searchResults.filter(r => r.type === 'order')"
                    :key="result.id"
                    :to="result.link"
                    class="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    @click="clearSearch"
                  >
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-6 sm:h-8 w-6 sm:w-8 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center">
                        <svg class="h-3 sm:h-4 w-3 sm:w-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <div class="ml-2 sm:ml-3">
                        <div class="font-medium">Order #{{ result.id }}</div>
                        <div class="text-slate-500 dark:text-slate-400 text-xs translate-y-0.5">{{ result.date }}</div>
                      </div>
                      <div class="ml-auto text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        ${{ result.total }}
                      </div>
                    </div>
                  </router-link>

                  <div class="border-t border-slate-200 dark:border-slate-700 mt-1 sm:mt-2 pt-1 sm:pt-2 px-3 sm:px-4 py-1.5 sm:py-2">
                    <router-link
                      to="/search-results"
                      class="text-xs sm:text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium"
                      @click="clearSearch"
                    >
                      View all results
                    </router-link>
                  </div>
                </template>
              </div>
            </div>

            <!-- Notifications -->
            <button class="p-1 sm:p-1.5 rounded-full text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-700 relative">
              <svg class="w-5 sm:w-6 h-5 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-0 right-0 h-2 w-2 rounded-full bg-rose-500"></span>
            </button>

            <!-- Dark mode toggle -->
            <button
              @click="toggleDarkMode"
              class="p-1 sm:p-1.5 rounded-full text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-700"
            >
              <svg v-if="isDarkMode" class="w-5 sm:w-6 h-5 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-5 sm:w-6 h-5 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <!-- Profile dropdown -->
            <div class="relative profile-dropdown">
              <button
                @click="profileOpen = !profileOpen"
                class="flex items-center space-x-1 sm:space-x-2 focus:outline-none"
              >
                <img
                  class="h-6 sm:h-8 w-6 sm:w-8 rounded-full object-cover border-2 border-slate-200 dark:border-slate-600"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
                <span class="hidden md:flex items-center">
                  <span class="text-xs sm:text-sm font-medium text-slate-800 dark:text-white">Admin User</span>
                  <svg class="ml-1 h-4 sm:h-5 w-4 sm:w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <div
                v-if="profileOpen"
                class="absolute right-0 mt-2 w-40 sm:w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 border border-slate-200 dark:border-slate-700"
                v-click-outside="() => { profileOpen = false }"
              >
                <a href="#" class="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Your Profile</a>
                <a href="#" class="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Settings</a>
                <a href="#" class="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
        <!-- Breadcrumbs -->
        <div class="w-full ml-0 pl-0 px-0  sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 sm:space-x-2">
              <li class="inline-flex items-center">
                <router-link
                  to="/"
                  class="inline-flex items-center text-xs sm:text-sm font-medium text-slate-700 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                >
                  <svg class="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </router-link>
              </li>
              <li v-for="(crumb, index) in breadcrumbs" :key="index">
                <div class="flex items-center">
                  <svg class="w-4 sm:w-5 h-4 sm:h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <router-link
                    v-if="index < breadcrumbs.length - 1"
                    :to="crumb.path"
                    class="ml-1 text-xs sm:text-sm font-medium text-slate-700 hover:text-violet-600 sm:ml-2 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    {{ crumb.name }}
                  </router-link>
                  <span
                    v-else
                    class="ml-1 text-xs sm:text-sm font-medium text-slate-500 sm:ml-2 dark:text-slate-500"
                  >
                    {{ crumb.name }}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <!-- Dashboard content -->
    <div class="flex-1 p-4 sm:p-8 lg:p-8 xl:p-10">
          <router-view />
        </div>
      </main>
    </div>
  </div>

  <!-- Mobile search overlay -->
  <div
    v-if="mobileSearchOpen"
    class="fixed inset-0 z-50 bg-slate-900/50 flex items-start justify-center pt-12 sm:pt-16 px-3 sm:px-4 md:hidden"
    @click.self="mobileSearchOpen = false"
  >
    <div class="w-full max-w-md bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
          <svg class="h-4 sm:h-5 w-4 sm:w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="block w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2.5 sm:py-3 border-0 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 text-sm sm:text-base"
          @keyup.esc="mobileSearchOpen = false"
        />
        <button
          @click="mobileSearchOpen = false"
          class="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center"
        >
          <svg class="h-4 sm:h-5 w-4 sm:w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="max-h-80 sm:max-h-96 overflow-y-auto">
        <div v-if="searchQuery.length > 0 && searchResults.length === 0" class="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          No results found for "{{ searchQuery }}"
        </div>

        <template v-if="searchQuery.length > 0 && searchResults.length > 0">
          <div class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Products
          </div>
          <router-link
            v-for="result in searchResults.filter(r => r.type === 'product')"
            :key="result.id"
            :to="result.link"
            class="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            @click="mobileSearchOpen = false"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0 h-6 sm:h-8 w-6 sm:w-8">
                <img class="h-6 sm:h-8 w-6 sm:w-8 rounded-md object-cover" :src="result.image" alt="" />
              </div>
              <div class="ml-2 sm:ml-3">
                <div class="font-medium truncate">{{ result.name }}</div>
                <div class="text-slate-500 dark:text-slate-400 text-xs">{{ result.category }}</div>
              </div>
            </div>
          </router-link>

          <div class="border-t border-slate-200 dark:border-slate-700 mt-1 sm:mt-2 pt-1 sm:pt-2"></div>

          <div class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Orders
          </div>
          <router-link
            v-for="result in searchResults.filter(r => r.type === 'order')"
            :key="result.id"
            :to="result.link"
            class="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            @click="mobileSearchOpen = false"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0 h-6 sm:h-8 w-6 sm:w-8 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center">
                <svg class="h-3 sm:h-4 w-3 sm:w-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div class="ml-2 sm:ml-3">
                <div class="font-medium">Order #{{ result.id }}</div>
                <div class="text-slate-500 dark:text-slate-400 text-xs translate-y-0.5">{{ result.date }}</div>
              </div>
            </div>
          </router-link>
        </template>
      </div>

      <div v-if="searchQuery.length > 0 && searchResults.length > 0" class="border-t border-slate-200 dark:border-slate-700 px-3 sm:px-4 py-2 sm:py-3">
        <router-link
          to="/search-results"
          class="text-xs sm:text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium"
          @click="mobileSearchOpen = false"
        >
          View all results
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Home, BarChart2, Package, ShoppingCart, Users, Settings } from 'lucide-vue-next';

export default {
  name: 'App',
  components: { Home, BarChart2, Package, ShoppingCart, Users, Settings },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const sidebarOpen = ref(false);
    const isDarkMode = ref(false);
    const profileOpen = ref(false);
    const searchQuery = ref('');
    const searchFocused = ref(false);
    const mobileSearchOpen = ref(false);
    const searchResults = ref([]);

    const navigation = [
      { name: 'Dashboard', href: '/', icon: Home },
      { name: 'Revenue Analysis', href: '/revenue-analysis', icon: BarChart2 },
      { name: 'Inventory', href: '/inventory', icon: Package },
      { name: 'Add Product', href: '/add-product', icon: ShoppingCart },
    ];

    const pageTitle = computed(() => {
      const currentRoute = navigation.find(item => isActiveRoute(item.href));
      return currentRoute ? currentRoute.name : 'Dashboard';
    });

    const currentDate = computed(() => {
      const date = new Date();
      return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    });

    const isActiveRoute = (path) => {
      if (path === '/') return route.path === '/';
      return route.path.startsWith(path);
    };

    const breadcrumbs = computed(() => {
      const crumbs = [];
      if (route.path === '/') return crumbs;
      const pathSegments = route.path.split('/').filter(segment => segment);
      let currentPath = '';
      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const navItem = navigation.find(item => item.href === currentPath);
        if (navItem) {
          crumbs.push({ name: navItem.name, path: navItem.href });
        } else {
          const formattedName = segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          crumbs.push({ name: formattedName, path: currentPath });
        }
      });
      return crumbs;
    });

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      applyTheme();
    };

    const applyTheme = () => {
      // Apply dark mode class to HTML element
      document.documentElement.classList.toggle('dark', isDarkMode.value);
      
      // Store preference in localStorage
      localStorage.setItem('darkMode', isDarkMode.value);
      
      // Dispatch event for components that need to react to theme changes
      window.dispatchEvent(new Event('themeChange'));
      
      // Set color scheme meta tag
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isDarkMode.value ? '#1e293b' : '#ffffff');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = isDarkMode.value ? '#1e293b' : '#ffffff';
        document.head.appendChild(meta);
      }
    };

    const clearSearch = () => {
      searchQuery.value = '';
      searchFocused.value = false;
    };

    const sampleProducts = [
      { id: 'P1001', name: 'Wireless Earbuds', category: 'Electronics', price: '49.99', type: 'product', image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', link: '/inventory?product=P1001' },
      { id: 'P1002', name: 'Smart Watch', category: 'Electronics', price: '199.99', type: 'product', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', link: '/inventory?product=P1002' },
      { id: 'P1003', name: 'Yoga Mat', category: 'Sports', price: '29.99', type: 'product', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', link: '/inventory?product=P1003' },
    ];

    const sampleOrders = [
      { id: '10045', date: 'May 15, 2023', total: '149.99', type: 'order', link: '/orders/10045' },
      { id: '10046', date: 'May 16, 2023', total: '89.99', type: 'order', link: '/orders/10046' },
    ];

    watch(searchQuery, (newQuery) => {
      if (newQuery.length > 0) {
        const filteredProducts = sampleProducts.filter(product =>
          product.name.toLowerCase().includes(newQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(newQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(newQuery.toLowerCase())
        );
        const filteredOrders = sampleOrders.filter(order => order.id.includes(newQuery));
        searchResults.value = [...filteredProducts, ...filteredOrders];
      } else {
        searchResults.value = [];
      }
    });

    const vClickOutside = {
      mounted(el, binding) {
        el._clickOutside = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.addEventListener('click', el._clickOutside);
      },
      unmounted(el) {
        document.removeEventListener('click', el._clickOutside);
      }
    };

    onMounted(() => {
      // Check for system preference first
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Then check for stored preference
      const savedDarkMode = localStorage.getItem('darkMode');
      
      // Set initial dark mode state
      if (savedDarkMode === 'true') {
        isDarkMode.value = true;
      } else if (savedDarkMode === 'false') {
        isDarkMode.value = false;
      } else if (prefersDark) {
        // If no stored preference, use system preference
        isDarkMode.value = true;
      }
      
      // Apply the theme
      applyTheme();
      
      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
          // Only auto-switch if user hasn't set a preference
          isDarkMode.value = e.matches;
          applyTheme();
        }
      });
    });

    watch(() => route.path, () => {
      if (window.innerWidth < 1024) {
        sidebarOpen.value = false;
      }
    });

    return {
      navigation,
      sidebarOpen,
      isDarkMode,
      profileOpen,
      pageTitle,
      currentDate,
      breadcrumbs,
      searchQuery,
      searchFocused,
      mobileSearchOpen,
      searchResults,
      toggleSidebar,
      toggleDarkMode,
      clearSearch,
      isActiveRoute,
      vClickOutside
    };
  }
}
</script>