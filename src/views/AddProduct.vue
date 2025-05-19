<template>
  <div class="space-y-4 sm:space-y-6 bg-slate-50 dark:bg-slate-900 rounded-lg shadow-sm lg:ml-58 lg:mr-60">
    <div class="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
      <form @submit.prevent="submitForm">
        <div class="space-y-4 sm:space-y-6">
          <!-- Basic Information -->
          <div>
            <h3 class="text-base sm:text-lg font-medium text-slate-800 dark:text-white">Add Product</h3>
            <div class="mt-3 sm:mt-4 grid grid-cols-1 gap-y-4 sm:gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="product-name" class="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Product Name
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    id="product-name"
                    v-model="product.name"
                    class="block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="product-id" class="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Product ID
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    id="product-id"
                    v-model="product.id"
                    class="block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="category" class="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Category
                </label>
                <div class="mt-1">
                  <select
                    id="category"
                    v-model="product.category"
                    class="block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm sm:text-base"
                    required
                  >
                    <option value="">Select a category</option>
                    <option v-for="category in categories" :key="category">{{ category }}</option>
                  </select>
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="price" class="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Price
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <span class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    v-model="product.price"
                    min="0"
                    step="0.01"
                    class="block w-full pl-6 sm:pl-7 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div class="sm:col-span-6">
                <label for="description" class="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <div class="mt-1">
                  <textarea
                    id="description"
                    v-model="product.description"
                    rows="3 sm:rows-4"
                    class="block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm sm:text-base"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Inventory Information -->
          <div class="pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700">
            <h3 class="text-base sm:text-lg font-medium text-slate-800 dark:text-white">Inventory Information</h3>
            <div class="mt-3 sm:mt-4 grid grid-cols-1 gap-y-4 sm:gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-2">
                <label for="sku" class="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  SKU
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    id="sku"
                    v-model="product.sku"
                    class="block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="stock" class="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Stock Quantity
                </label>
                <div class="mt-1">
                  <input
                    type="number"
                    id="stock"
                    v-model="product.stock"
                    min="0"
                    class="block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="weight" class="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Weight (kg)
                </label>
                <div class="mt-1">
                  <input
                    type="number"
                    id="weight"
                    v-model="product.weight"
                    min="0"
                    step="0.01"
                    class="block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Product Images -->
          <div class="pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700">
            <h3 class="text-base sm:text-lg font-medium text-slate-800 dark:text-white">Product Images</h3>
            <div class="mt-3 sm:mt-4">
              <div class="flex items-center justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-5 sm:pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-8 sm:h-12 w-8 sm:w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex flex-col sm:flex-row text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer rounded-md font-medium text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-violet-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                    </label>
                    <p class="pl-0 sm:pl-1 mt-1 sm:mt-0">or drag and drop</p>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Buttons -->
          <div class="pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700">
            <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold tracking-wide text-white uppercase transition duration-150 ease-in-out bg-gradient-to-r from-violet-600 to-violet-500 border border-transparent rounded-lg shadow-md hover:from-violet-700 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:from-violet-700 dark:to-violet-600 dark:hover:from-violet-600 dark:hover:to-violet-500"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data() {
    return {
      categories: ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Books', 'Sports'],
      product: {
        id: '',
        name: '',
        category: '',
        price: '',
        description: '',
        sku: '',
        stock: 0,
        weight: '',
        images: []
      }
    }
  },
  methods: {
    submitForm() {
      // Here you would typically send the data to your backend
      console.log('Product data:', this.product);
      
      // Show success message
      alert('Product saved successfully!');
      
      // Reset form
      this.resetForm();
    },
    resetForm() {
      this.product = {
        id: '',
        name: '',
        category: '',
        price: '',
        description: '',
        sku: '',
        stock: 0,
        weight: '',
        images: []
      };
    }
  }
}
</script>
