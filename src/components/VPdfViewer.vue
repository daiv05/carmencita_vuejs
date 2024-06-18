<template>
  <div class="viewer-mask">
    <div class="viewer-container">
      <div class="viewer-header">
        <button @click="$emit('cerrar')" class="viewer-close">
          <XCircleIcon class="h-8 w-8 text-red-500" />
        </button>
      </div>
      <div class="viewer-body">
        <embed :src="url" width="100%" height="100%" type="application/pdf" />
      </div>
    </div>
  </div>
</template>
<script>
import { XCircleIcon } from '@heroicons/vue/24/outline'
export default {
  components: {
    XCircleIcon
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {
    console.log('VPdfViewer created')
  }
}
</script>

<style>
.viewer-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.viewer-container {
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 20px 30px;
  background-color: #3f3f3f;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.viewer-body {
  margin: 20px 0;
  height: inherit;
}

.viewer-close {
  float: right;
  margin-top: 0;
  margin-bottom: 20px;
}

.viewer-close:hover {
  cursor: pointer;
}

.viewer-enter-from {
  opacity: 0;
}
</style>
