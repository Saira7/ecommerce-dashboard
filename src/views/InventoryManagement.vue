<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-2">
        <select 
          v-model="selectedCategory" 
          @change="filterProducts"
          class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="all">All Categories</option>
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
        <select 
          v-model="stockFilter" 
          @change="filterProducts"
          class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="all">All Stock</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>
      <div class="relative">
        <input 
          v-model="searchQuery" 
          @input="filterProducts"
          type="text" 
          placeholder="Search products..." 
          class="w-64 py-2 pl-10 pr-4 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
        />
        <svg class="absolute w-5 h-5 text-slate-400 left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- Inventory Stats -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-violet-100 dark:bg-violet-900/30">
            <svg class="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Total Products</p>
            <p class="text-2xl font-semibold text-slate-800 dark:text-white">{{ totalProductsCount }}</p>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">In Stock</p>
            <p class="text-2xl font-semibold text-slate-800 dark:text-white">{{ inStockCount }}</p>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
            <svg class="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Low Stock</p>
            <p class="text-2xl font-semibold text-slate-800 dark:text-white">{{ lowStockCount }}</p>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-rose-100 dark:bg-rose-900/30">
            <svg class="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Out of Stock</p>
            <p class="text-2xl font-semibold text-slate-800 dark:text-white">{{ outOfStockCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Inventory Table -->
    <div class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
      <div class="flex items-center justify-between mb-4">
  <h2 class="relative text-2xl font-semibold text-slate-800 dark:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-10 after:h-1 after:bg-violet-500 rounded after:rounded-full">
    Inventory
  </h2>
  <router-link
    to="/add-product"
    class="inline-flex items-center gap-2 px-5 py-2.5 text-base font-semibold tracking-wide text-white uppercase transition duration-150 ease-in-out bg-gradient-to-r from-violet-600 to-violet-500 rounded-lg shadow-lg hover:from-violet-700 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:from-violet-500 dark:to-violet-400 dark:hover:from-violet-400 dark:hover:to-violet-300"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    Add Product
  </router-link>
</div>
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm text-slate-500 dark:text-slate-400">Showing {{ filteredProducts.length }} of {{ totalProductsCount }} products</p>
        <button @click="filterProducts" class="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500">
          Filter
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead class="bg-slate-50 dark:bg-slate-700/50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Stock
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-md object-cover" :src="product.image" alt="" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-slate-800 dark:text-slate-200">{{ product.name }}</div>
                    <div class="text-sm text-slate-500 dark:text-slate-400">#{{ product.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {{ product.category }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                ${{ formatNumber(product.price) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {{ product.stock }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                  product.stock > 10 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400' :
                  product.stock > 0 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                  'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400'
                ]">
                  {{ product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-violet-600 dark:text-violet-400 hover:text-violet-900 dark:hover:text-violet-300 mr-3">
                  Edit
                </button>
                <button class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700 sm:px-6">
        <div class="flex justify-between flex-1 sm:hidden">
          <button class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
            Previous
          </button>
          <button class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
            Next
          </button>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-slate-700 dark:text-slate-300">
              Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">{{ totalProductsCount }}</span> results
            </p>
          </div>
          <div>
            <nav class="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-l-md hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700">
                <span class="sr-only">Previous</span>
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                </svg>
              </button>
              <button class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-violet-600 border border-slate-300 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-violet-400 dark:hover:bg-slate-700">
                1
              </button>
              <button class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700">
                2
              </button>
              <button class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700">
                3
              </button>
              <button class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-r-md hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700">
                <span class="sr-only">Next</span>
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InventoryManagement',
  data() {
    return {
      selectedCategory: 'all',
      stockFilter: 'all',
      searchQuery: '',
      categories: ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Books', 'Sports'],
      
      // All products data
      allProducts: [
        { 
          id: 'P1001', 
          name: 'Wireless Earbuds', 
          category: 'Electronics', 
          price: 49.99, 
          stock: 24,
          image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1002', 
          name: 'Smart Watch', 
          category: 'Electronics', 
          price: 199.99, 
          stock: 15,
          image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1003', 
          name: 'Yoga Mat', 
          category: 'Sports', 
          price: 29.99, 
          stock: 8,
          image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1004', 
          name: 'Coffee Maker', 
          category: 'Home & Kitchen', 
          price: 59.99, 
          stock: 12,
          image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1005', 
          name: 'Bluetooth Speaker', 
          category: 'Electronics', 
          price: 79.99, 
          stock: 0,
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1006', 
          name: 'Designer T-Shirt', 
          category: 'Clothing', 
          price: 24.99, 
          stock: 35,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1007', 
          name: 'Skincare Set', 
          category: 'Beauty', 
          price: 49.99, 
          stock: 7,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1008', 
          name: 'Bestseller Novel', 
          category: 'Books', 
          price: 14.99, 
          stock: 42,
          image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1009', 
          name: 'Wireless Headphones', 
          category: 'Electronics', 
          price: 149.99, 
          stock: 18,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1010', 
          name: 'Running Shoes', 
          category: 'Sports', 
          price: 89.99, 
          stock: 0,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
      ],
      
      // Filtered products
      filteredProducts: []
    }
  },
  computed: {
    totalProductsCount() {
      return this.allProducts.length;
    },
    inStockCount() {
      return this.allProducts.filter(product => product.stock > 10).length;
    },
    lowStockCount() {
      return this.allProducts.filter(product => product.stock > 0 && product.stock <= 10).length;
    },
    outOfStockCount() {
      return this.allProducts.filter(product => product.stock === 0).length;
    }
  },
  methods: {
    formatNumber(num) {
      return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    filterProducts() {
      // Start with all products
      let filtered = [...this.allProducts];
      
      // Filter by category
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === this.selectedCategory);
      }
      
      // Filter by stock status
      if (this.stockFilter !== 'all') {
        if (this.stockFilter === 'in-stock') {
          filtered = filtered.filter(product => product.stock > 10);
        } else if (this.stockFilter === 'low-stock') {
          filtered = filtered.filter(product => product.stock > 0 && product.stock <= 10);
        } else if (this.stockFilter === 'out-of-stock') {
          filtered = filtered.filter(product => product.stock === 0);
        }
      }
      
      // Filter by search query
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.id.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }
      
      this.filteredProducts = filtered;
    }
  },
  mounted() {
    // Initialize filtered products
    this.filteredProducts = [...this.allProducts];
  }
}
</script>