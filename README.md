# Super simple File upload component with Vue.js
A super simple unstyled file upload component in Vue.js

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="Software License" />
  </a>
  <a href="https://npmjs.org/package/m24-vue-upload-file">
    <img src="https://img.shields.io/npm/v/m24-vue-upload-file.svg?style=flat-square" alt="Packagist" />
  </a>
</p>

* [Vue.js](http://vuejs.org/) (tested with 2.6.11).

### Installation
```
npm install --save m24-vue-upload-file
```

### Example
```js
import Vue from 'vue'
import FileUpload from 'm24-vue-upload-file'

new Vue({
  el: '#app',
  data: {
    upload: {
      acceptTypes: 'image/*',
      multiple: false
    },
    files: [],
  },
  components: {
    FileUpload
  },
  methods: {
    filesAdded (fileArray) {
      this.files = fileArray
    },
    fileRemoved (fileArray) {
      this.files = fileArray
    },


    ...


    // Example of a file submit
    submitFiles (files) {
      const formData = new FormData()
      for (var i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        formData.append('files[' + i + ']', file)
      }

      axios.post(this.submitEndpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
          // Upload
        })
        .catch(errors => {
          // Upload failes
        })
    },
  }
})
```

```html
<body id="app">
  <file-upload :acceptTypes="upload.acceptTypes"
               :multiple="upload.acceptsMultiple"
               @files-uploaded="filesAdded"
               @file-removed="fileRemoved"></file-upload>
</body>
```

#### Props
| Name          | Type     | Default | Required | Description
| :------------ | :--------| :-------| :--------| :-----------
| acceptTypes   | String   | ''      | false    | [HTML input accept types](https://www.geeksforgeeks.org/html-input-accept-attribute/)
| multiple      | Boolean  | 0       | false    | Should the upload accept one or multiple files

### Events
| Name           | Returns  | Description
| :------------  | :--------| :-----------
| files-uploaded | array of [files](https://developer.mozilla.org/en-US/docs/Web/API/File) | Returns an array with files added
| file-removed   | array of [files](https://developer.mozilla.org/en-US/docs/Web/API/File) | Returns an array of the remaining files

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

[link-author]: https://github.com/pogachar
