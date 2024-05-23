<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask bg-white">
      <div class="modal-container">
        <div class="flex justify-end">
          <button href="#" @click="$emit('input', false)">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_429_11083)">
                <path
                  d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
                  stroke="#292929"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_429_11083">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <p class="text-xl font-bold mb-6 text-center">{{ titulo }}</p>
        <div class="mb-4">
          <slot name="contenido"></slot>
        </div>
        <div>
          <div class="text-center">
            <slot name="acciones"></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    titulo: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 50%;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
