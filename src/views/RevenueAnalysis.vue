<template>
  <div class="space-y-6">
    <div class="flex justify-end flex-wrap items-center gap-2 mb-6">
      <select 
        v-model="timeRange" 
        @change="updateData"
        class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <option value="daily">Today</option>
        <option value="weekly">This Week</option>
        <option value="monthly">This Month</option>
        <option value="yearly">This Year</option>
      </select>
      <select 
        v-model="selectedCategory" 
        @change="updateData"
        class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <option value="all">All Categories</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
    </div>

       <!-- Stats cards -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex flex-col">
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</p>
            <div class="flex items-center mt-2">
              <div class="w-10 h-10 flex items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30 mr-4">
                <svg class="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-slate-800 dark:text-white">${{ formatNumber(filteredStats.totalRevenue) }}</p>
                <p class="text-sm text-emerald-600 dark:text-emerald-400 flex items-center mt-1">
                  <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  {{ filteredStats.revenueGrowth }}% from previous period
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex flex-col">
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Total Orders</p>
            <div class="flex items-center mt-2">
              <div class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mr-4">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ filteredStats.totalOrders }}</p>
                <p class="text-sm text-emerald-600 dark:text-emerald-400 flex items-center mt-1">
                  <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  {{ filteredStats.orderGrowth }}% from previous period
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex flex-col">
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Order Value</p>
            <div class="flex items-center mt-2">
              <div class="w-10 h-10 flex items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30 mr-4">
                <svg class="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-slate-800 dark:text-white">${{ formatNumber(filteredStats.avgOrderValue) }}</p>
                <p class="text-sm text-emerald-600 dark:text-emerald-400 flex items-center mt-1">
                  <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  {{ filteredStats.aovGrowth }}% from previous period
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex flex-col">
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Conversion Rate</p>
            <div class="flex items-center mt-2">
              <div class="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 mr-4">
                <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-slate-800 dark:text-white">{{ filteredStats.conversionRate }}%</p>
                <p class="text-sm text-emerald-600 dark:text-emerald-400 flex items-center mt-1">
                  <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  {{ filteredStats.conversionGrowth }}% from previous period
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Revenue Trends Chart -->
    <div class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
      <h2 class="mb-4 text-lg font-medium text-slate-800 dark:text-white">Revenue Trends</h2>
      <div class="h-80">
        <canvas ref="revenueChart"></canvas>
      </div>
    </div>

    <!-- Category and Channel Charts -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Revenue by Category -->
      <div class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <h2 class="mb-4 text-lg font-medium text-slate-800 dark:text-white">Revenue by Category</h2>
        <div class="h-64">
          <canvas ref="categoryChart"></canvas>
        </div>
      </div>

      <!-- Revenue by Channel -->
      <div class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <h2 class="mb-4 text-lg font-medium text-slate-800 dark:text-white">Revenue by Channel</h2>
        <div class="h-64">
          <canvas ref="channelChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Top products table -->
    <div class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
      <h2 class="mb-4 text-lg font-medium text-slate-800 dark:text-white">Top Selling Products</h2>
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
                Units Sold
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Revenue
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Growth
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
                {{ product.unitsSold }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                ${{ formatNumber(product.revenue) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex items-center">
                  <svg v-if="product.growth > 0" class="w-4 h-4 mr-1 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <svg v-else class="w-4 h-4 mr-1 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span :class="product.growth > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                    {{ Math.abs(product.growth) }}%
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'RevenueAnalysis',
  data() {
    return {
      timeRange: 'monthly',
      selectedCategory: 'all',
      categories: ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Books'],
      
      // Chart instances
      revenueChartInstance: null,
      categoryChartInstance: null,
      channelChartInstance: null,
      
      // Base stats (will be filtered)
      baseStats: {
        daily: {
          totalRevenue: 28750,
          revenueGrowth: 8.5,
          totalOrders: 254,
          orderGrowth: 5.2,
          avgOrderValue: 113.19,
          aovGrowth: 3.1,
          conversionRate: 2.8,
          conversionGrowth: 0.3
        },
        weekly: {
          totalRevenue: 78250,
          revenueGrowth: 10.2,
          totalOrders: 754,
          orderGrowth: 6.8,
          avgOrderValue: 103.78,
          aovGrowth: 3.8,
          conversionRate: 3.0,
          conversionGrowth: 0.4
        },
        monthly: {
          totalRevenue: 128750,
          revenueGrowth: 12.5,
          totalOrders: 1254,
          orderGrowth: 8.2,
          avgOrderValue: 102.67,
          aovGrowth: 4.3,
          conversionRate: 3.2,
          conversionGrowth: 0.5
        },
        yearly: {
          totalRevenue: 1458750,
          revenueGrowth: 15.8,
          totalOrders: 14254,
          orderGrowth: 10.5,
          avgOrderValue: 102.34,
          aovGrowth: 5.1,
          conversionRate: 3.5,
          conversionGrowth: 0.7
        }
      },
      
      // Category multipliers for filtering
      categoryMultipliers: {
        'all': 1.0,
        'Electronics': 0.35,
        'Clothing': 0.25,
        'Home & Kitchen': 0.19,
        'Beauty': 0.14,
        'Books': 0.07
      },
      
      // Time range data for charts
      timeRangeData: {
        daily: {
          labels: ['9AM', '12PM', '3PM', '6PM', '9PM'],
          revenue: [12000, 19000, 30000, 50000, 30000],
          orders: [120, 190, 300, 500, 300]
        },
        weekly: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          revenue: [12000, 19000, 15000, 22000, 30000, 40000, 25000],
          orders: [120, 190, 150, 220, 300, 400, 250]
        },
        monthly: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          revenue: [48000, 59000, 70000, 81000],
          orders: [480, 590, 700, 810]
        },
        yearly: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          revenue: [65000, 59000, 80000, 81000, 56000, 85000, 90000, 100000, 110000, 95000, 105000, 120000],
          orders: [650, 590, 800, 810, 560, 850, 900, 1000, 1100, 950, 1050, 1200]
        }
      },
      
      // Category data for pie chart
      categoryData: [
        { name: 'Electronics', value: 45000, percentage: 35 },
        { name: 'Clothing', value: 32000, percentage: 25 },
        { name: 'Home & Kitchen', value: 25000, percentage: 19 },
        { name: 'Beauty', value: 18000, percentage: 14 },
        { name: 'Books', value: 8750, percentage: 7 }
      ],
      
      // Channel data for pie chart
      channelData: [
        { name: 'Amazon', value: 55000, percentage: 42, color: '#8b5cf6' },
        { name: 'Walmart', value: 35000, percentage: 27, color: '#a78bfa' },
        { name: 'Website', value: 25000, percentage: 19, color: '#c4b5fd' },
        { name: 'eBay', value: 10000, percentage: 8, color: '#ddd6fe' },
        { name: 'Other', value: 3750, percentage: 4, color: '#ede9fe' }
      ],
      
      // Top products data
      allProducts: [
        { 
          id: 'P1001', 
          name: 'Wireless Earbuds', 
          category: 'Electronics', 
          unitsSold: 342, 
          revenue: 17100, 
          growth: 24,
          image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1002', 
          name: 'Smart Watch', 
          category: 'Electronics', 
          unitsSold: 253, 
          revenue: 12650, 
          growth: 18,
          image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1003', 
          name: 'Yoga Mat', 
          category: 'Home & Kitchen', 
          unitsSold: 187, 
          revenue: 5610, 
          growth: 12,
          image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1004', 
          name: 'Coffee Maker', 
          category: 'Home & Kitchen', 
          unitsSold: 156, 
          revenue: 9360, 
          growth: 8,
          image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1005', 
          name: 'Bluetooth Speaker', 
          category: 'Electronics', 
          unitsSold: 132, 
          revenue: 7920, 
          growth: -3,
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1006', 
          name: 'Designer T-Shirt', 
          category: 'Clothing', 
          unitsSold: 210, 
          revenue: 6300, 
          growth: 15,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1007', 
          name: 'Skincare Set', 
          category: 'Beauty', 
          unitsSold: 98, 
          revenue: 4900, 
          growth: 22,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        { 
          id: 'P1008', 
          name: 'Bestseller Novel', 
          category: 'Books', 
          unitsSold: 145, 
          revenue: 2175, 
          growth: 5,
          image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
      ]
    }
  },
  computed: {
    // Filtered stats based on selected time range and category
    filteredStats() {
      const baseTimeStats = this.baseStats[this.timeRange];
      const multiplier = this.categoryMultipliers[this.selectedCategory];
      
      return {
        totalRevenue: Math.round(baseTimeStats.totalRevenue * multiplier),
        revenueGrowth: parseFloat((baseTimeStats.revenueGrowth * (multiplier * 0.9 + 0.1)).toFixed(1)),
        totalOrders: Math.round(baseTimeStats.totalOrders * multiplier),
        orderGrowth: parseFloat((baseTimeStats.orderGrowth * (multiplier * 0.9 + 0.1)).toFixed(1)),
        avgOrderValue: parseFloat((baseTimeStats.avgOrderValue * (multiplier * 0.2 + 0.8)).toFixed(2)),
        aovGrowth: parseFloat((baseTimeStats.aovGrowth * (multiplier * 0.5 + 0.5)).toFixed(1)),
        conversionRate: parseFloat((baseTimeStats.conversionRate * (multiplier * 0.3 + 0.7)).toFixed(1)),
        conversionGrowth: parseFloat((baseTimeStats.conversionGrowth * (multiplier * 0.5 + 0.5)).toFixed(1))
      };
    },
    
    // Filtered products based on selected category
    filteredProducts() {
      if (this.selectedCategory === 'all') {
        return this.allProducts;
      } else {
        return this.allProducts.filter(product => product.category === this.selectedCategory);
      }
    },
    
    // Get chart data based on selected time range and category
    chartData() {
      const data = this.timeRangeData[this.timeRange];
      const multiplier = this.categoryMultipliers[this.selectedCategory];
      
      return {
        labels: data.labels,
        revenue: data.revenue.map(val => Math.round(val * multiplier)),
        orders: data.orders.map(val => Math.round(val * multiplier))
      };
    },
    
    // Get filtered category data
    filteredCategoryData() {
      if (this.selectedCategory === 'all') {
        return this.categoryData;
      } else {
        // Show only the selected category at 100%
        return [{ name: this.selectedCategory, value: 100, percentage: 100 }];
      }
    }
  },
  methods: {
    formatNumber(num) {
      return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    
    // Initialize and update charts
    initCharts() {
      this.initRevenueChart();
      this.initCategoryChart();
      this.initChannelChart();
    },
    
    initRevenueChart() {
      const ctx = this.$refs.revenueChart.getContext('2d');
      const data = this.chartData;
      const isDark = document.documentElement.classList.contains('dark');
      const textColor = isDark ? '#cbd5e1' : '#64748b';
      const gridColor = isDark ? 'rgba(203, 213, 225, 0.1)' : 'rgba(100, 116, 139, 0.1)';
      
      if (this.revenueChartInstance) {
        this.revenueChartInstance.destroy();
      }
      
      this.revenueChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Revenue',
              data: data.revenue,
              borderColor: '#8b5cf6',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              tension: 0.3,
              fill: true
            },
            {
              label: 'Orders',
              data: data.orders,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.3,
              fill: true,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Revenue ($)',
                color: textColor
              },
              grid: {
                color: gridColor
              },
              ticks: {
                color: textColor
              }
            },
            y1: {
              beginAtZero: true,
              position: 'right',
              title: {
                display: true,
                text: 'Orders',
                color: textColor
              },
              grid: {
                display: false
              },
              ticks: {
                color: textColor
              }
            },
            x: {
              grid: {
                color: gridColor
              },
              ticks: {
                color: textColor
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: textColor
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          }
        }
      });
    },
    
    initCategoryChart() {
      const ctx = this.$refs.categoryChart.getContext('2d');
      const isDark = document.documentElement.classList.contains('dark');
      const textColor = isDark ? '#cbd5e1' : '#64748b';
      
      if (this.categoryChartInstance) {
        this.categoryChartInstance.destroy();
      }
      
      this.categoryChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.filteredCategoryData.map(cat => cat.name),
          datasets: [{
            label: 'Revenue by Category',
            data: this.filteredCategoryData.map(cat => cat.value),
            backgroundColor: [
              '#8b5cf6', // Violet-500
              '#a78bfa', // Violet-400
              '#c4b5fd', // Violet-300
              '#ddd6fe', // Violet-200
              '#ede9fe'  // Violet-100
            ],
            borderWidth: 0,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: isDark ? 'rgba(203, 213, 225, 0.1)' : 'rgba(100, 116, 139, 0.1)'
              },
              ticks: {
                color: textColor
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: textColor
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Revenue: $${context.raw.toLocaleString()}`;
                }
              }
            }
          }
        }
      });
    },
    
    initChannelChart() {
      const ctx = this.$refs.channelChart.getContext('2d');
      const isDark = document.documentElement.classList.contains('dark');
      const textColor = isDark ? '#cbd5e1' : '#64748b';
      
      if (this.channelChartInstance) {
        this.channelChartInstance.destroy();
      }
      
      this.channelChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.channelData.map(channel => channel.name),
          datasets: [{
            data: this.channelData.map(channel => channel.percentage),
            backgroundColor: this.channelData.map(channel => channel.color),
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: textColor,
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw}%`;
                }
              }
            }
          }
        }
      });
    },
    
    // Update all data and charts when filters change
    updateData() {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        this.initRevenueChart();
        this.initCategoryChart();
        this.initChannelChart();
      }, 50);
    },
    
    // Handle theme changes
    handleThemeChange() {
      this.updateData();
    }
  },
  mounted() {
    // Initialize charts
    this.$nextTick(() => {
      this.initCharts();
      
      // Listen for theme changes
      window.addEventListener('themeChange', this.handleThemeChange);
      
      // Create MutationObserver to detect class changes on html element (for dark mode)
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            this.handleThemeChange();
          }
        });
      });
      
      observer.observe(document.documentElement, { attributes: true });
      
      // Cleanup
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('themeChange', this.handleThemeChange);
        observer.disconnect();
        
        // Destroy chart instances
        if (this.revenueChartInstance) {
          this.revenueChartInstance.destroy();
        }
        if (this.categoryChartInstance) {
          this.categoryChartInstance.destroy();
        }
        if (this.channelChartInstance) {
          this.channelChartInstance.destroy();
        }
      });
    });
  }
}
</script>