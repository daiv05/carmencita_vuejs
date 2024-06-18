<template>
  <!--PAGINACION -->
  <nav aria-label="Page navigation example" class="flex bg-slate-100 py-4 w-full">
    <ul class="inline-flex -space-x-px text-base h-10 mx-auto">
      <li>
        <button
          type="button"
          @click="updateCurrentPage(currentPage - 2)"
          :disabled="currentPage == 1"
          class="flex items-center justify-center rounded-l-xl px-4 h-10 leading-tight text-gray-500"
        >
          <span>&laquo; Anterior</span>
        </button>
      </li>
      <li v-for="(page, index) in paginas">
        <button
          type="button"
          @click="updateCurrentPage(page)"
          :class="{ 'bg-blue-600 text-white': currentPage == index + 1 }"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300"
        >
          <span>{{ index + 1 }}</span>
        </button>
      </li>
      <li>
        <button
          type="button"
          @click="updateCurrentPage(currentPage)"
          :disabled="currentPage == totalPages"
          class="flex items-center justify-center rounded-r-xl px-4 h-10 leading-tight text-gray-500"
        >
          <span>Siguiente &raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {}
  },
  methods: {
    updateCurrentPage(newVal) {
      this.$emit('update:modelValue', newVal + 1)
    }
  },
  computed: {
    paginas() {
      let pages = []
      for (let i = 0; i < this.totalPages; i++) {
        pages.push(i)
      }
      return pages
    }
  }
}
</script>
