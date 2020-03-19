

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
																							>Agregar al Carrito</button>
															<div class="carro col-md-offset-4">
																	<p>Carro ({{carro}})</p>
															</div>
            </div>
         </div>
			`,
			data(){
				return  {
			marca : 'tommy hilfiger',
			producto: 'Calcetines',
			selectedVariante: 0,
			detalles: ["80% algodón","20% pliester","Suavecitos y Calienticos"],
			variantes:[
				{
				varianteId: 2234,
				varianteColor:"green",
				varianteImagen:'./assets/calcetinesverdes.jpg',
				varianteCantidad: 10
				},
				{
				varianteId: 2235,
				varianteColor:"blue",
				varianteImagen:'./assets/calcetinesAzules.jpg',
				varianteCantidad: 0
				}
			],
			carro: 0
		}
			},
		methods:{
			agregarAlCarrito(){
				this.carro += 1
			},
			updateProducto(index){
					this.selectedVariante = index
					console.log(index)
			}
		},
		computed:{
			titulo(){
				return this.marca + ' ' + this.producto
			},
			imagen(){
				return this.variantes[this.selectedVariante].varianteImagen
			},
			inventario(){
				return this.variantes[this.selectedVariante].varianteCantidad
			},
			envio(){
				if(this.premium){
					return "free"
				}
				return 5000+"$"
			}

		}
})



var app = new Vue({
		el:'#app',
		data: {
			premium: false
		}

})