var app = new Vue({
		el:'#app',
		data:{
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
			}

		}
})