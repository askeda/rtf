<script setup>
const route = useRoute()

// Mapowanie identyfikatorów zadania (1, 2) na identyfikatory zdjęć w picsum.
// Pozwala wyświetlać nowsze zdjęcia z serwisu, zachowując kanoniczne ID używane
// w routingu oraz w pliku comments.json.
const PICSUUM_IDS = {
  1: '1015',
  2: '1062',
}

// Identyfikator zdjęcia pobierany z parametru ścieżki (widoczny dla kandydata).
const photoId = computed(() => String(route.params.id))

const { pending, error, filteredComments } = useComments(photoId.value)

// Wewnętrzny identyfikator używany do budowania adresów w picsum.photos.
const picsumId = computed(
  () => PICSUUM_IDS[photoId.value] ?? photoId.value,
)

// Adres zdjęcia z picsum.photos — stały rozmiar dla spójnego layoutu.
const photoUrl = computed(
  () => `https://picsum.photos/id/${picsumId.value}/1200/800`,
)

// Adres endpointu z informacjami o zdjęciu.
const photoInfoUrl = computed(
  () => `https://picsum.photos/id/${picsumId.value}/info`,
)

useHead(() => ({
  title: `Zdjęcie ${photoId.value}`,
}))
</script>

<template>
  <section class="max-w-4xl mx-auto">
    <header class="mb-8">
      <nuxt-link
        to="/"
        class="inline-block text-gray-500 text-sm mb-3 hover:text-blue-600 transition-colors"
      >
        ← Wróć do strony głównej
      </nuxt-link>
      <h1 class="text-2xl sm:text-3xl font-bold m-0">
        Zdjęcie {{ photoId }}
      </h1>
    </header>

    <photo-viewer :src="photoUrl" :alt="`Zdjęcie numer ${photoId}`" />

    <metadata-display :info-url="photoInfoUrl" />

    <section class="bg-white border border-dashed border-gray-300 rounded-xl p-6 sm:p-8">
      <div class="mb-2 flex justify-between items-center">
        <h2 class="text-lg font-semibold">
          Komentarze
        </h2>

        <span v-if="filteredComments.length" class="text-gray-500">
          ({{ filteredComments.length }})
        </span>
      </div>

      <div v-if="pending">
        Pending...
      </div>

      <error-message v-else-if="error" message="Nie udało się pobrać komentarzy." />

      <photo-comments v-else :comments="filteredComments" />
    </section>
  </section>
</template>
