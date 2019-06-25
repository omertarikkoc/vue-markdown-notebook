// New VueJS instance

new Vue({
  // CSS selector of the root DOM element
  el: '#notebook',

  // Some data
  data() {
    return  {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: localStorage.getItem('selected-id') || null
    }
  },

  // Computed properties
  computed: {
    notePreview (){
      // Markdown rendered to HTML
      return this.selectedNote ? marked(this.selectedNote.content) : '';
    },
    selectedNote() {
      return this.notes.find(note => note.id === this.selectedId)
    }
  },

  methods: {
    addNote (){
      const time = Date.now();
      const note = {
        id: String(time),
        title: 'New note ' + (this.notes.length + 1),
        content: `# Note ${this.notes.length + 1} \n**Hi !** This notebook is using markdown`,
        created: time,
        favorite: false,
      };
      // Add to the list
      this.notes.push(note);
    },
    selectNote(note) {
      console.log("Note selected: ", note.id);
      this.selectedId = note.id;
    },
    saveNotes() {
      // First stringify to JSON
      localStorage.setItem('notes', JSON.stringify(this.notes));
      console.log('Notes saved', new Date());
    }

  },

  watch: {
    notes: {
      handler: 'saveNotes',
      deep: true,
    },
    selectedId (val) {
      localStorage.setItem('selected-id', val);
    }
  }


});


console.log('restored note:', localStorage.getItem('content'))