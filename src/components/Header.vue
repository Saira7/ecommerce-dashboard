<template>
  <header class="sticky top-0 z-10 flex items-center h-16 px-4 bg-indigo-100 dark:bg-indigo-900/30">
    <h1 class="text-xl font-bold text-slate-800 dark:text-white">{{ title }}</h1>
    
    <div class="flex-1 mx-4">
      <div class="relative max-w-md mx-auto">
        <input 
          type="text" 
          placeholder="Search here..." 
          class="w-full py-2 pl-10 pr-4 text-sm bg-white dark:bg-slate-800 border-0 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
        />
        <svg class="absolute w-5 h-5 text-slate-400 left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    
    <div class="flex items-center space-x-4">
      <button class="relative p-1 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      
      <div class="flex items-center">
        <div class="w-8 h-8 overflow-hidden rounded-full">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" class="object-cover w-full h-full" />
        </div>
        <div class="ml-2">
          <p class="text-sm font-medium text-slate-700 dark:text-slate-300">John Doe</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Admin</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'DashboardHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>