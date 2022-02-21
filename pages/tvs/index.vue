<template>
  <NuxtLayout name="app">
    <div class="container mx-auto px-4 pt-16">
      <div class="tvs">
        <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold">Popular Tvs</h2>

        <div v-if="!loading && popularTvs" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <template v-for="(tv, index) in popularTvs" :key="index">
            <TvsCard :tv="tv"></TvsCard>
          </template>
        </div>
        <div v-if="loading" class="h-screen flex items-center justify-center py-24">
          <pulse-loader :loading="loading" :size="size"></pulse-loader>
        </div>
      </div>
      <div class="top-rated-tvs py-24">
        <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold">Now Playing</h2>
        <div v-if="!loading && topRatedTvs" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <template v-for="(tv, index) in topRatedTvs" :key="index">
            <TvsCard :tv="tv"></TvsCard>
          </template>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import {useState} from "#app";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import useTvs from "../../composables/useTvs";

definePageMeta({
  layout: false,
});

const loading = useState('loading', () => true)

const size = useState('size', () => '40px')

const {popularTvs, topRatedTvs, errors, getTvs} = useTvs()

const fetch = async () => {
  loading.value = true
  await getTvs()
  loading.value = false
}

fetch()


</script>