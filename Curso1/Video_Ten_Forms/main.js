Vue.component('producto',{	
	props:{
		premium:{
			type:Boolean,
			required:true
		}
	},
	template: `
         <div class="row producto">
            <div class="col-md-6 producto-imagen well">
               <img v-bind:src="imagen">
            </div>
            <div class="col-md-6 producto-informacion well">
               <h1>{{marca}} {{ producto }}</h1>
               <p v-if="inventario">En existencia</p>
               <p v-else>Agotado</p>
				<p>Envio: {{ envio }}</p>
               <ul>
                  <li v-for="detalle in detalles">
                     {{detalle}}
                  </li>
               </ul>
               <div v-for="(variante, index) in variantes"
                :key="variante.varianteId"
                class="color-box"
                :style="{ backgroundColor: variante.varianteColor }"
                @mouseover="updateProducto(index)">
               </div>
												
            <button v-on:click="agregarAlCarrito"
                :disabled="!inventario"
                :class="{disabledButton : !inventario}"
                >Agregar al Carrito
            </button>
            </div>
            <br><br><br><br><br>
            <div class="col-md-5">
                <h2>Reviews</h2>
                <p v-if="!reviews.length">Todavía no hay comentarios..</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>{{ review.review }}</p>
                        <p>{{ review.rating }}</p>
                    </li>
                </ul>
            </div>
            <div class="col-md-5">
                <producto-revision @review-submitted="addReview"></producto-revision>
            </div>

         </div>
			`,
data() {
        return {
            marca: 'tommy hilfiger',
            producto: 'Calcetines',
            selectedVariante: 0,
            detalles: ["80% algodón", "20% pliester", "Suavecitos y Calienticos"],
            variantes: [{
                    varianteId: 2234,
                    varianteColor: "green",
                    varianteImagen: './assets/calcetinesverdes.jpg',
                    varianteCantidad: 10
                },
                {
                    varianteId: 2235,
                    varianteColor: "blue",
                    varianteImagen: './assets/calcetinesAzules.jpg',
                    varianteCantidad: 0
                }
            ],
    reviews: []

        }
    },
    methods: {
        agregarAlCarrito() {
            this.$emit('agregar-al-carrito', this.variantes[this.selectedVariante].varianteId)
        },
        updateProducto(index) {
            this.selectedVariante = index
        },
        addReview(productoRevision){
            this.reviews.push(productoRevision)
        }
    },
    computed: {
        titulo() {
            return this.marca + ' ' + this.producto
        },
        imagen() {
            return this.variantes[this.selectedVariante].varianteImagen
        },
        inventario() {
            return this.variantes[this.selectedVariante].varianteCantidad
        },
        envio() {
            if (this.premium) {
                return "free"
            }
            return 5000 + "$"
        }

    }
})

Vue.component('producto-revision',{
		template:`
			<form class="review-form" @submit.prevent="onSubmit">

            <p v-if="errors.length">
                <b>Por favor complete el formulario de una manera correcta !! errore(s):</b>
                <ul>
                    <li v-for="error in  errors">
                        {{ error }}
                    </li>
                </ul>
            </p>

			<p>
				<label for="name">Name:</label>
				<input id="name" v-model="name">
			</p>

			<p>
				<label for="review">Review:</label>
				<textarea id="review" v-model="review"></textarea>
			</p>
			
			<p>
					<label for="rating">Rating:</label>
					<select id="rating" v-model.number="rating">
						<option>5</option>
						<option>4</option>
						<option>3</option>
						<option>2</option>
						<option>1</option>
					</select>
			</p>

			<p>
				<input type="submit" value="Submit">

			</p>

			</form>

			
`,
	data(){
		return{
			name: null,
			review: null,
			rating: null,
            errors : []
		}
	},
    methods: {
        onSubmit(){
            if (this.name && this.review && this.rating) {
                let productoRevision = {
                    name : this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productoRevision)
                this.name = null
                this.review = null
                this.rating = null
            }else{
                if (!this.name) this.errors.push("nombre requerido")
                if (!this.review) this.errors.push("reviews requerido")
                if (!this.rating) this.errors.push("rating requerido")
            }
        }
    }
	
})


var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        carro: []

    },
    methods:{
        updateCart(id){
            this.carro.push(id)
        }
    }
})