//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script = {
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
  data: function data () {
    return {
      files: []
    }
  },
  methods: {
    addFiles: function addFiles () {
      this.$refs.files.click();
    },
    handleFileUpload: function handleFileUpload () {
      var uploadedFiles = this.$refs.files.files;

      if (!this.multiple) {
        this.files = [];
      }

      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }

      this.$emit('file-uploaded', this.files);
    },
    removeFile: function removeFile (key) {
      this.files.splice(key, 1);
      this.$emit('file-removed', this.files);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "file-upload" }, [
    _c("div", [
      _c("label", [
        _c("input", {
          ref: "files",
          attrs: {
            type: "file",
            multiple: _vm.multiple,
            accept: _vm.acceptTypes
          },
          on: {
            change: function($event) {
              return _vm.handleFileUpload()
            }
          }
        })
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "flex justify-start items-center" },
      [
        _c(
          "button",
          {
            staticClass: "btn btn-yellow",
            on: {
              click: function($event) {
                return _vm.addFiles()
              }
            }
          },
          [_vm._v("\n      File\n    ")]
        ),
        _vm._v(" "),
        _vm._l(_vm.files, function(file, key) {
          return _c("div", { key: key, staticClass: "pl-4" }, [
            _vm._v("\n      " + _vm._s(file.name) + "\n      "),
            _vm.multiple
              ? _c(
                  "span",
                  {
                    staticClass: "remove-file",
                    on: {
                      click: function($event) {
                        return _vm.removeFile(key)
                      }
                    }
                  },
                  [_vm._v("\n        Remove\n      ")]
                )
              : _vm._e()
          ])
        })
      ],
      2
    ),
    _vm._v(" "),
    _c("br")
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-787e9cfc_0", { source: "\ninput[data-v-787e9cfc] {\n  display: none;\n}\n", map: {"version":3,"sources":["/home/adam/www/vue-upload-file/src/m24-vue-upload-file.vue"],"names":[],"mappings":";AA+EA;EACA,aAAA;AACA","file":"m24-vue-upload-file.vue","sourcesContent":["<template>\n  <div class=\"file-upload\">\n    <div>\n      <label>\n        <input\n          ref=\"files\"\n          type=\"file\"\n          :multiple=\"multiple\"\n          :accept=\"acceptTypes\"\n          @change=\"handleFileUpload()\">\n      </label>\n    </div>\n    <div class=\"flex justify-start items-center\">\n      <button\n        class=\"btn btn-yellow\"\n        @click=\"addFiles()\">\n        File\n      </button>\n      <div\n        v-for=\"(file, key) in files\"\n        :key=\"key\"\n        class=\"pl-4\">\n        {{ file.name }}\n        <span\n          v-if=\"multiple\"\n          class=\"remove-file\"\n          @click=\"removeFile( key )\">\n          Remove\n        </span>\n      </div>\n    </div>\n    <br>\n  </div>\n</template>\n<script>\n\nexport default {\n  props: {\n    acceptTypes: {\n      type: String,\n      required: false,\n      default: ''\n    },\n    multiple: {\n      type: Boolean,\n      required: false,\n      default: false\n    }\n  },\n  data () {\n    return {\n      files: []\n    }\n  },\n  methods: {\n    addFiles () {\n      this.$refs.files.click()\n    },\n    handleFileUpload () {\n      const uploadedFiles = this.$refs.files.files\n\n      if (!this.multiple) {\n        this.files = []\n      }\n\n      for (var i = 0; i < uploadedFiles.length; i++) {\n        this.files.push(uploadedFiles[i])\n      }\n\n      this.$emit('file-uploaded', this.files)\n    },\n    removeFile (key) {\n      this.files.splice(key, 1)\n      this.$emit('file-removed', this.files)\n    }\n  }\n}\n</script>\n<style scoped>\n  input {\n    display: none;\n  }\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-787e9cfc";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;
