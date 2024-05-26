<template>
  <div :id="editorRef" ></div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    forceSet: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      editor: null,
    };
  },
  computed: {
    editorRef() {
      return `editor-${this._uid}`; 
    }
  },
  mounted() {
    let _this = this;

    this.editor = new Quill(`#${this.editorRef}`, {
      modules: {
        toolbar: [['bold', 'italic', 'underline']]
      },
      theme: 'snow',
      placeholder: "Type Here"
    });
    
    this.editor.root.innerHTML = this.value;
    this.editor.on('text-change', function () {
      return _this.update();
    });
  },
  methods: {
    update: function update() {
      this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : '');
    }
  },
  watch: {
    forceSet() {
      this.editor.root.innerHTML = this.value;
    }
  }
}
</script>

<style>
  .ql-toolbar {
    border: 2px #FF9B00 solid !important;
    background-color: #eecc9a;
  }
</style>