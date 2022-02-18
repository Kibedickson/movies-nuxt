<template>
  <NuxtLayout name="app">
    <div class="container mx-auto px-4 pt-16">
      <div class="popular-movies">
        <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold">Popular Movies</h2>

        <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <template v-for="(movie, index) in popularMovies" :key="index">
            <MoviesCard :movie="movie"></MoviesCard>
          </template>
        </div>
        <div v-else class="flex items-center justify-center py-24">
          <pulse-loader :loading="loading" :size="size"></pulse-loader>
        </div>
      </div>
      <div class="now-playing-movies py-24">
        <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold">Now Playing</h2>
        <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <template v-for="(movie, index) in nowPlayingMovies" :key="index">
            <MoviesCard :movie="movie"></MoviesCard>
          </template>
        </div>
        <div v-else class="flex items-center justify-center py-24">
          <pulse-loader :loading="loading" :size="size"></pulse-loader>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import {useState} from "#app";
import useMovies from "../composables/useMovies";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

definePageMeta({
  layout: false,
});

const loading = useState('loading', () => true)

const size = useState('size', () => '40px')

const {popularMovies, nowPlayingMovies, errors, getMovies} = useMovies()

loading.value = false
getMovies()


</script>