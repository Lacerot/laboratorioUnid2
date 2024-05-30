import { Controller, Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { crearProd } from './dto/crearProd';
import { actualizarProd } from './dto/actualizarProd';


@Controller('productos')
export class ProductosController {


    constructor(
        private readonly productosService: ProductosService
    ) {}

    @Get()
    getAllProductos(){
        // return this.productos;
        return this.productosService.findAll();
    }

    @Get(":id")
    getProductosById(@Param("id") id:String){
        // return this.productos[+id];
        return this.productosService.findById(+id);
    }

    @Post()
    crearProducto(@Body() crearDto:crearProd){
        return this.productosService.create(crearDto);

    }
    @Patch(":id")
    actualizarProducto(
        @Param("id") id:String,
        @Body() updateDto:actualizarProd){
        return this.productosService.update(+id,updateDto);
    }

    @Delete(":id")
    eliminarProducto(@Param("id") id:String){
        return this.productosService.delete(+id);
    }

}
