<template>
  <NuxtLayout name="app">
    <div v-if="loading" class="h-screen flex items-center justify-center py-24">
      <pulse-loader :loading="loading" :size="size"></pulse-loader>
    </div>
    <div v-if="!loading && tv" class="transition ease-in-out duration-300">
      <div class="tv-info border-b border-gray-800">
        <div class="container mx-auto px-4 py-16 flex flex-col md:flex-row">
          <div class="flex-none">
            <img :src="tv.poster_path" :alt="tv.name" class="w-64 lg:w-96">
          </div>
          <div class="md:ml-24">
            <h2 class="text-4xl mt-4 md:mt-0 font-semibold">{{ tv.name }}</h2>
            <div class="flex flex-wrap items-center text-gray-400 text-sm">
              <svg class="fill-current text-orange-500 w-4" viewBox="0 0 24 24">
                <g data-name="Layer 2">
                  <path
                      d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                      data-name="star"/>
                </g>
              </svg>
              <span class="ml-1">{{ tv.vote_average }}</span>
              <span class="mx-2">|</span>
              <span>{{ tv.first_air_date }}</span>
              <span class="mx-2">|</span>
              <span>{{ tv.genres }}</span>
            </div>

            <p class="text-gray-300 mt-8">
              {{ tv.overview }}
            </p>

            <div class="mt-12">
              <div class="flex mt-4">
                <div v-for="(crew, index) in tv.created_by" :key="index" class="mr-8">
                  <div>{{ crew.name }}</div>
                  <div class="text-sm text-gray-400">Creator</div>
                </div>
              </div>
            </div>

            <div>
              <div v-if="tv.videos" class="mt-12">
                <button
                    @click="isVideoModalOpen = true"
                    class="flex inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150"
                >
                  <svg class="w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path
                        d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                  <span class="ml-2">Play Trailer</span>
                </button>
              </div>

              <template v-if="isVideoModalOpen">
                <div
                    style="background-color: rgba(0, 0, 0, .5);"
                    class="fixed top-0 left-0 w-full h-full flex items-center shadow-lg overflow-y-auto"
                >
                  <div class="container mx-auto lg:px-32 rounded-lg overflow-y-auto">
                    <div class="bg-gray-900 rounded">
                      <div class="flex justify-end pr-4 pt-2">
                        <button
                            @click="isVideoModalOpen = false"
                            @keydown.escape="isVideoModalOpen = false"
                            class="text-3xl leading-none hover:text-gray-300">&times;
                        </button>
                      </div>
                      <div class="modal-body px-8 py-8">
                        <div class="responsive-container overflow-hidden relative" style="padding-top: 56.25%">
                          <iframe class="responsive-iframe absolute top-0 left-0 w-full h-full"
                                  :src="`https://www.youtube.com/embed/${tv.videos}`"
                                  style="border:0;" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="tv-cast border-b border-gray-800">
        <div class="container mx-auto px-4 py-16">
          <h2 class="text-4xl font-semibold">Cast</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div v-for="(cast, index) in tv.cast" :key="index" class="mt-8">
              <a href="#">
                <img :src="cast.profile_path" :alt="cast.name"
                     class="hover:opacity-75 transition ease-in-out duration-300">
              </a>
              <div class="mt-2">
                <a href="#" class="text-lg mt-2 hover:text-gray:300">{{ cast.name }}</a>
                <div class="text-sm text-gray-400">
                  {{ cast.character }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tv-images">
        <div class="container mx-auto px-4 py-16">
          <h2 class="text-4xl font-semibold">Images</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div v-for="(image, index) in tv.images" :key="index" class="mt-8">
              <a
                  @click.prevent="showImageModal(image.file_path)"
                  href="#"
              >
                <img :src="`https://image.tmdb.org/t/p/w500/${image.file_path}`" alt="image1"
                     class="hover:opacity-75 transition ease-in-out duration-300">
              </a>
            </div>
          </div>

          <div
              style="background-color: rgba(0, 0, 0, .5);"
              class="fixed top-0 left-0 w-full h-full flex items-center shadow-lg overflow-y-auto"
              v-if="isImageModalOpen"
          >
            <div class="container mx-auto lg:px-32 rounded-lg overflow-y-auto">
              <div class="bg-gray-900 rounded">
                <div class="flex justify-end pr-4 pt-2">
                  <button
                      @click="isImageModalOpen = false"
                      @keydown.escape="isImageModalOpen = false"
                      class="text-3xl leading-none hover:text-gray-300">&times;
                  </button>
                </div>
                <div class="modal-body px-8 py-8">
                  <img :src="`https://image.tmdb.org/t/p/original/${photo}`" alt="poster">
                </div>
              </div>
            </div>
          </div>
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
const photo = useState('photo', () => '')
const isVideoModalOpen = useState('isVideoModalOpen', () => false)
const isImageModalOpen = useState('isImageModalOpen', () => false)

const size = useState('size', () => '40px')

const {tv, errors, getTv} = useTvs()
const route = useRoute()

const showImageModal = (image) => {
  isImageModalOpen.value = true
  photo.value = image
}

const fetch = async () => {
  loading.value = true
  await getTv(route.params.id)
  loading.value = false
}

fetch()

</script>