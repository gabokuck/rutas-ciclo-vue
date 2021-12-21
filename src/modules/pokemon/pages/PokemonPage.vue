<template>
    <h1>Producto <span>#{{ id }}</span> </h1>

    <div v-if="pokemon">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
    </div>

</template>

<script>
export default {

    props:{
        id: {
            type:Number,
            required: true
        },
        name: {
            type: String
        },
        apellido: {
            type: String
        }
    },

    data(){
        return{
            // id: this.$route.params.id
            pokemon: null
        }
    },

    created(){
        // const { id } = this.$route.params

        // console.log(id);
        // this.id = id
        // console.log(this.$attrs);
        this.getProducto()
    },
    methods: {
        async getProducto(){

            try {
                const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`).then( r => r.json() )
                console.log(pokemon);
                this.pokemon = pokemon
            } catch (error) {

                this.$router.push('/')
                console.log('No se encontro');
                
            }

            
        }
    },
    watch: {
        id(){
            this.getProducto()
        }
    }
}
</script>