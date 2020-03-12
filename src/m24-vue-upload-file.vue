<template>
  <div class="m24-vue-upload-file">
    <div>
      <label>
        <input
          ref="files"
          type="file"
          :multiple="multiple"
          :accept="acceptTypes"
          @change="handleFileUpload()">
      </label>
    </div>
    <div class="vuf-button-holder">
      <button @click="addFiles()">
        File
      </button>
    </div>
    <div class="vuf-file-list">
      <div
        v-for="(file, key) in files"
        :key="key"
        class="pl-4">
        {{ file.name }}
        <button
          class="remove-file"
          @click="removeFile( key )">
          Remove
        </button>
      </div>
    </div>
    <br>
  </div>
</template>
<script>

export default {
  props: {
    acceptTypes: {
      type: String,
      required: false,
      default: ''
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      files: []
    }
  },
  methods: {
    addFiles () {
      this.$refs.files.click()
    },
    handleFileUpload () {
      const uploadedFiles = this.$refs.files.files

      if (!this.multiple) {
        this.files = []
      }

      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }

      this.$emit('files-uploaded', this.files)
    },
    removeFile (key) {
      this.files.splice(key, 1)
      this.$emit('file-removed', this.files)
    }
  }
}
</script>
<style scoped>
  input {
    display: none;
  }
</style>
