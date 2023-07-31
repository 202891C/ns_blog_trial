<script>
export default{
    data() {
      return {
        data: null,
      };
    },
    methods: {
      async fetchData() {      
        const response = await fetch("http://localhost:3000/blog"); 
        this.data = await response.json();
      }   
    }
};
</script>
