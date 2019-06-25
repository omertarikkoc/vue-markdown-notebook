// New VueJS instance

new Vue({
  // CSS selector of the root DOM element
  el: '#notebook',

  // Some data
  data() {
    return  {
      content: this.content = localStorage.getItem('content') || 'You can write in **markdown**!'
    }
  },

  // Computed properties
  computed: {
    notePreview (){
      // Markdown rendered to HTML
      return marked(this.content)
    }
  },

  methods: {
    saveNote () {
      console.log('saving note', this.content);
      localStorage.setItem('content', this.content)
    }
  },

  watch: {
    //Watching content data property
    content: 'saveNote'
  },


});


console.log('restored note:', localStorage.getItem('content'))