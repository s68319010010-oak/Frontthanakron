<template>
  <div class="flex flex-col justify-center items-center text-center text-center overflow-hidden">
    <h2 class="text-2xl font-bold text-red-600 mb-2">NotFound</h2>
 
        <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p class="text-lg text-gray-700 mb-6">
        The page you're looking for doesn't exist.
        </p>

        <button
        @click="goHome"
        class="px-6 py-2 bg-blue-600 text-whte rounded hover:bg-blue-700 transition"
        >
         Go to Home
              </button>
            </div>
            </template>

            <script>
            export default {
                name: 'NotFound',
                methods: {
                    goHome() {
                        this.$route.push('/');
                    },
                },
            };
        </script>
            <style scoped>
        </style>
           