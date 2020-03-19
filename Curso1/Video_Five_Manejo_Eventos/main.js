var app = new Vue({
		el:'#app',
		data:{
			producto: 'Calcetines',
			imagen: './assets/calcetinesverdes.jpg',
			inventario: true,
			detalles: ["80% algodón","20% pliester","Suavecitos y Calienticos"],
			variantes:[
				{
				varianteId: 2234,
				varianteColor:"Verde",
				varianteImagen:'./assets/calcetinesverdes.jpg'
				},
				{
				varianteId: 2235,
				varianteColor:"Azul",
				varianteImagen:'./assets/calcetinesAzules.jpg'
				}
			],
			carro: 0
		},
		methods:{
			agregarAlCarrito(){
				this.carro += 1
			},
			updateProducto:function(varianteImagen){
					this.imagen = varianteImagen
			}
		}
})