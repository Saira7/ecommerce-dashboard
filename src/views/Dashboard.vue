<template>
  <div class="space-y-4 sm:space-y-6 ml-0 lg:ml-0">
    <!-- Time period selector -->
    <div class="flex justify-end px-3 sm:px-4 lg:pl-0">
      <select
        v-model="timeRange"
        class="w-full sm:w-auto px-2 sm:px-3 py-1.5 sm:py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-slate-200"
      >
        <option value="daily">Today</option>
        <option value="weekly">This Week</option>
        <option value="monthly">This Month</option>
        <option value="yearly">This Year</option>
      </select>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 px-3 sm:px-4 lg:pl-0">
      <div class="pl-4 sm:pl-6 pr-4 sm:pr-6 pt-4 sm:pt-6 pb-4 sm:pb-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="flex flex-col">
          <div class="flex items-center justify-between">
            <h3 class="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Sales</h3>
          </div>
          <div class="mt-2">
            <p class="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-white">120</p>
            <div class="flex items-center mt-1">
              <span class="text-xs font-medium text-purple-500">+12%</span>
              <svg class="w-3 h-3 ml-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </div>
          <div class="mt-4 h-12">
            <svg class="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path
                d="M0,10 L10,12 L20,8 L30,15 L40,10 L50,12 L60,8 L70,15 L80,10 L90,12 L100,8"
                fill="none"
                stroke="#10b981"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="pl-4 sm:pl-6 pr-4 sm:pr-6 pt-4 sm:pt-6 pb-4 sm:pb-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="flex flex-col">
          <div class="flex items-center justify-between">
            <h3 class="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Revenue</h3>
          </div>
          <div class="mt-2">
            <p class="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-white">${{ formatNumber(totalRevenue) }}</p>
            <div class="flex items-center mt-1">
              <span class="text-xs font-medium text-purple-500">+20%</span>
              <svg class="w-3 h-3 ml-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </div>
          <div class="mt-4 h-12">
            <svg class="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path
                d="M0,15 L10,10 L20,12 L30,8 L40,10 L50,5 L60,10 L70,8 L80,12 L90,5 L100,8"
                fill="none"
                stroke="#10b981"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="pl-4 sm:pl-6 pr-4 sm:pr-6 pt-4 sm:pt-6 pb-4 sm:pb-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="flex flex-col">
          <div class="flex items-center justify-between">
            <h3 class="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Visitors</h3>
          </div>
          <div class="mt-2">
            <p class="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-white">360</p>
            <div class="flex items-center mt-1">
              <span class="text-xs font-medium text-rose-500">-24%</span>
              <svg class="w-3 h-3 ml-1 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
          <div class="mt-4 h-12">
            <svg class="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path
                d="M0,5 L10,8 L20,5 L30,10 L40,8 L50,12 L60,10 L70,5 L80,8 L90,10 L100,12"
                fill="none"
                stroke="#f43f5e"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="pl-4 sm:pl-6 pr-4 sm:pr-6 pt-4 sm:pt-6 pb-4 sm:pb-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="flex flex-col">
          <div class="flex items-center justify-between">
            <h3 class="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Stock</h3>
          </div>
          <div class="mt-2">
            <p class="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-white">164</p>
            <div class="flex items-center mt-1">
              <span class="text-xs font-medium text-purple-500">+30%</span>
              <svg class="w-3 h-3 ml-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center justify-center">
            <div class="relative w-16 h-16">
              <svg class="w-full h-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" stroke-width="2"></circle>
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#10b981"
                  stroke-width="2"
                  stroke-dasharray="100"
                  stroke-dashoffset="10"
                  transform="rotate(-90 18 18)"
                ></circle>
              </svg>
              <div class="absolute inset-0 flex items-center justify-center text-xs font-medium text-purple-500">90%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 px-3 sm:px-4 lg:pl-0">
      <div class="lg:col-span-2 pl-4 sm:pl-6 pr-4 sm:pr-6 pt-4 sm:pt-6 pb-4 sm:pb-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base sm:text-lg font-medium text-slate-800 dark:text-white">Revenue Overview</h2>
          <select
            v-model="chartPeriod"
            class="w-full sm:w-auto px-2 sm:px-3 py-1 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-slate-200"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div class="h-64 sm:h-80">
          <canvas ref="revenueChart"></canvas>
        </div>
      </div>

      <div class="pl-4 sm:pl-6 pr-4 sm:pr-6 pt-4 sm:pt-6 pb-4 sm:pb-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <h2 class="text-base sm:text-lg font-medium text-slate-800 dark:text-white mb-4">Sales by Category</h2>
        <div class="h-64 sm:h-80">
          <canvas ref="categoryChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Sales Table -->
    <div class="pl-4 sm:pl-6 pr-4 sm:pr-6 pt-4 sm:pt-6 pb-4 sm:pb-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm px-3 sm:px-4 lg:pl-0">
      <div class="flex items-center justify-between mb-4 flex-col sm:flex-row gap-4">
        <h2 class="text-base sm:text-lg font-medium text-slate-800 dark:text-white">Recent Sales</h2>
        <div class="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search"
            class="w-full sm:w-48 py-1 pl-8 pr-4 text-sm bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
          />
          <svg class="absolute w-4 h-4 text-slate-400 left-2 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700 table-responsive">
          <thead>
            <tr>
              <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-4 sm:px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            <tr v-for="product in recentSales" :key="product.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td class="px-4 sm:px-6 py-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-md object-cover" :src="product.image" alt="" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{{ product.name }}</div>
                    <div class="text-sm text-slate-500 dark:text-slate-400">#{{ product.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 sm:px-6 py-4">
                <div class="text-sm text-slate-500 dark:text-slate-400 truncate">{{ product.category }}</div>
              </td>
              <td class="px-4 sm:px-6 py-4">
                <div class="text-sm text-slate-800 dark:text-slate-200">${{ formatNumber(product.price) }}</div>
              </td>
              <td class="px-4 sm:px-6 py-4">
                <span :class="[
                  'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                  product.stock > 10 ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                  product.stock > 0 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                  'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400'
                ]">
                  {{ product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock' }}
                </span>
              </td>
              <td class="px-4 sm:px-6 py-4 text-right text-sm font-medium">
                <button class="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 mr-3">
                  View
                </button>
                <button class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Top Products -->
    <div class="pl-4 sm:pl-6 pr-4 sm:pr-6 pt-4 sm:pt-6 pb-4 sm:pb-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm px-3 sm:px-4 lg:pl-0">
      <h2 class="text-base sm:text-lg font-medium text-slate-800 dark:text-white mb-4">Top Products</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <div v-for="product in topProducts" :key="product.id" class="flex items-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <img :src="product.image" alt="" class="w-12 sm:w-16 h-12 sm:h-16 rounded-md object-cover flex-shrink-0" />
          <div class="ml-3 sm:ml-4">
            <h3 class="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{{ product.name }}</h3>
            <div class="flex items-center mt-1">
              <div class="flex">
                <svg v-for="i in 5" :key="i" :class="[
                  'w-3 sm:w-4 h-3 sm:h-4',
                  i <= product.rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'
                ]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="ml-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">${{ formatNumber(product.price) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'Dashboard',
  setup() {
    const timeRange = ref('monthly');
    const chartPeriod = ref('week');
    const revenueChart = ref(null);
    const categoryChart = ref(null);
    let revenueChartInstance = null;
    let categoryChartInstance = null;

    const totalRevenue = ref(4500);
    const revenueGrowth = ref(12.5);
    const totalOrders = ref(1254);
    const orderGrowth = ref(8.2);
    const totalCustomers = ref(3842);
    const customerGrowth = ref(5.7);
    const lowStockItems = ref(12);

    const recentSales = ref([
      {
        id: 'P1001',
        name: 'Bamboo Watch',
        category: 'Accessories',
        price: 65.00,
        stock: 24,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'P1002',
        name: 'Black Watch',
        category: 'Accessories',
        price: 72.00,
        stock: 61,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'P1003',
        name: 'Blue Band',
        category: 'Fitness',
        price: 79.00,
        stock: 2,
        image: 'https://images.unsplash.com/photo-1535487256295-3e7b3d497e62?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'P1004',
        name: 'Blue T-Shirt',
        category: 'Clothing',
        price: 29.00,
        stock: 25,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'P1005',
        name: 'Bluetooth Speaker',
        category: 'Electronics',
        price: 199.00,
        stock: 0,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
    ]);

    const topProducts = ref([
      {
        id: 'P1001',
        name: 'Bamboo Watch',
        price: 65.00,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'P1002',
        name: 'Black Watch',
        price: 72.00,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'P1003',
        name: 'Blue Band',
        price: 79.00,
        rating: 3,
        image: 'https://images.unsplash.com/photo-1535487256295-3e7b3d497e62?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'P1004',
        name: 'Blue T-Shirt',
        price: 29.00,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
    ]);

    const chartData = {
      week: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        revenue: [65, 59, 80, 81, 56, 55, 40],
        profit: [28, 48, 40, 19, 86, 27, 90]
      },
      month: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        revenue: [65, 59, 80, 81],
        profit: [28, 48, 40, 19]
      },
      year: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        revenue: [65, 59, 80, 81, 56, 55, 40, 55, 60, 70, 65, 75],
        profit: [28, 48, 40, 19, 86, 27, 90, 30, 40, 35, 45, 50]
      }
    };

    const categoryData = {
      labels: ['Electronics', 'Fashion', 'Household'],
      data: [65, 15, 20]
    };

    const formatNumber = (num) => {
      return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const getChartTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return {
        textColor: isDark ? '#cbd5e1' : '#64748b',
        gridColor: isDark ? 'rgba(203, 213, 225, 0.1)' : 'rgba(100, 116, 139, 0.1)',
        backgroundColor: isDark ? '#1e293b' : '#ffffff'
      };
    };

    const initRevenueChart = () => {
      if (!revenueChart.value) return;

      const ctx = revenueChart.value.getContext('2d');
      const data = chartData[chartPeriod.value];
      const theme = getChartTheme();

      if (revenueChartInstance) {
        revenueChartInstance.destroy();
      }

      revenueChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Revenue',
              data: data.revenue,
              backgroundColor: '#8b5cf6',
              borderColor: '#8b5cf6',
              borderWidth: 0,
              borderRadius: 4,
              barThickness: 12,
            },
            {
              label: 'Profit',
              data: data.profit,
              backgroundColor: '#c4b5fd',
              borderColor: '#c4b5fd',
              borderWidth: 0,
              borderRadius: 4,
              barThickness: 12,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: theme.gridColor,
                drawBorder: false,
              },
              ticks: {
                color: theme.textColor,
                font: { size: 12 }
              }
            },
            x: {
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                color: theme.textColor,
                font: { size: 12 }
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: theme.textColor,
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                font: { size: 12 }
              }
            },
            tooltip: {
              backgroundColor: theme.backgroundColor,
              titleColor: theme.textColor,
              bodyColor: theme.textColor,
              borderColor: theme.gridColor,
              borderWidth: 1,
              padding: 12,
              displayColors: false,
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.raw;
                }
              }
            }
          }
        }
      });
    };

    const initCategoryChart = () => {
      if (!categoryChart.value) return;

      const ctx = categoryChart.value.getContext('2d');
      const theme = getChartTheme();

      if (categoryChartInstance) {
        categoryChartInstance.destroy();
      }

      categoryChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: categoryData.labels,
          datasets: [{
            data: categoryData.data, // FIXED: Changed from totalRevenue.value to categoryData.data
            backgroundColor: ['#6d28d9', '#8b5cf6', '#c4b5fd'],
            borderWidth: 0,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: theme.textColor,
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                font: { size: 12 }
              }
            },
            tooltip: {
              backgroundColor: theme.backgroundColor,
              titleColor: theme.textColor,
              bodyColor: theme.textColor,
              borderColor: theme.gridColor,
              borderWidth: 1,
              padding: 12,
              displayColors: false,
              callbacks: {
                label: function(context) {
                  return context.label + ': ' + context.raw + '%';
                }
              }
            }
          }
        }
      });
    };

    const handleThemeChange = () => {
      initRevenueChart();
      initCategoryChart();
    };

    watch([timeRange, chartPeriod], () => {
      initRevenueChart();
    });

    onMounted(() => {
      setTimeout(() => {
        initRevenueChart();
        initCategoryChart();
      }, 100);

      window.addEventListener('themeChange', handleThemeChange);

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            handleThemeChange();
          }
        });
      });

      observer.observe(document.documentElement, { attributes: true });

      onBeforeUnmount(() => {
        window.removeEventListener('themeChange', handleThemeChange);
        observer.disconnect();
        if (revenueChartInstance) {
          revenueChartInstance.destroy();
        }
        if (categoryChartInstance) {
          categoryChartInstance.destroy();
        }
      });
    });

    return {
      timeRange,
      chartPeriod,
      revenueChart,
      categoryChart,
      totalRevenue,
      revenueGrowth,
      totalOrders,
      orderGrowth,
      totalCustomers,
      customerGrowth,
      lowStockItems,
      recentSales,
      topProducts,
      formatNumber
    };
  }
};
</script>

<style scoped>
.table-responsive th,
.table-responsive td {
  min-width: 100px;
}
@media (max-width: 640px) {
  .table-responsive th,
  .table-responsive td {
    font-size: 0.75rem;
    padding: 0.5rem;
    min-width: 80px;
  }
  .table-responsive td img {
    width: 2rem;
    height: 2rem;
  }
  .table-responsive td .ml-4 {
    margin-left: 0.5rem;
  }
  .table-responsive td button {
    font-size: 0.75rem;
    margin-right: 0.25rem;
  }
}
</style>