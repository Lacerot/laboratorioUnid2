import { Injectable, NotFoundException } from '@nestjs/common';
import { crearProd } from './dto/crearProd';
import {  actualizarProd } from './dto/actualizarProd';
import { Producto } from './interface/producto.interf';


@Injectable()
export class ProductosService {


    
    private productos0: Producto[] = [
        {id:1,nombre:'Pedro',categoria:'Estudiante'},
        { id:2,nombre:'Carmelo',categoria:'Docente'},
        { id:3,nombre:'Pepe',categoria:'Docente'}, 
        { id:4,nombre:'Jouseias',categoria:'Estudiante'}, 
        { id:5,nombre:'Pedruzco',categoria:'Docente'},
        { id:5,nombre:'Mario',categoria:'Estudiante'},
        { id:5,nombre:'Mateo',categoria:'Docente'} 
    ];

    findAll(){
        return this.productos0;
    }

    findById(id:Number){
        const prod = this.productos0.find( p => p.id === id );
        if ( !prod ) throw new NotFoundException(`Producto con el id '${ id }' no encontrado`);
        
        return prod;
    }


    create(nuevo:crearProd){

    
        const prodNew: Producto = {
            id: this.productos0.length+1,
            nombre:nuevo.nombre,
            categoria:nuevo.categoria
        }

        this.productos0.push( prodNew );

    }

    /**
     * Actualiza un producto a partir del id proporcionado
     * @param id 
     * @param prodActualizar 
     * @returns 
     */
    update(id:number, prodActualizar:actualizarProd){
            let prod = this.findById(id);
            console.log(prod);
            /*
            if( prodActualizar.id && prodActualizar.id !== id )
                throw new BadRequestException(`El id del producto no es el mismo que el body ${prodActualizar.id} - ${id} `);
            */
            
            this.productos0 = this.productos0.map( p => {

                if ( p.id === id ) {
                    prod.nombre = prodActualizar.nombre;
                    prod.categoria = prodActualizar.categoria;
                    return prod;
                }
    
                return p;
            })

            return prod;
            
    }


    delete(id:number){
        let prod = this.findById(id);
        if(prod){
            this.productos0 = this.productos0.filter (pp => pp.id !== id)
        }

    }



}
