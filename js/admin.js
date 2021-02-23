import {Funko} from "./funkoClass.js";

let listaFunkopop = [];

const modalFunko = new bootstrap.Modal(document.getElementById('modal'));

let btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click', ()=>{
    modalFunko.show()
})

window.agregarFunkopop= function(event){
    event.preventDefault();
    console.log("dentro de la funcion agregar");
    let alerta= document.querySelector("#msjEnvio");
    if(validarCodigo(document.getElementById(`codigoProducto`))       
    && campoRequerido(document.getElementById(`nombreProducto`))
    && validarCodigo(document.getElementById(`numSerie`))
    && campoRequerido(document.getElementById(`categoriaProducto`))
    && campoRequerido(document.getElementById(`descProducto`))
    && campoRequerido(document.getElementById(`imgProducto`))){
        console.log(`todo correcto`);
        // se crea un funkopop
        
        let nuevoFunko = new Funko(document.getElementById(`codigoProducto`).value,
        document.getElementById(`nombreProducto`).value,
        document.getElementById(`numSerie`).value,
        document.getElementById(`categoriaProducto`).value,
        document.getElementById(`descProducto`).value,
        document.getElementById(`imgProducto`).value);
        // guardar el funkopop en el array
        console.log(nuevoFunko);
        listaFunkopop.push(nuevoFunko);
        
        // guardar los datos en localstorage

        localStorage.setItem('listaFunkoKey', JSON.stringify(listaFunkopop));
       
        // mostrar cartel de datos guardados

        // limpiar el formulario
        limpiarForumulario();
        // leer datos
        leerDatos();
        
        Swal.fire(
            'Perfecto!',
            'Agregaste un producto correctamente',
            'success'
          )
        modalFunko.hide();
    }else{
        console.log("datos incorretos");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal!',
          })
    }
    
        
}

function limpiarForumulario(){
   let formulario = document.getElementById('formulario');
   formulario.reset();
   let codigoProducto= document.getElementById(`codigoProducto`);
   codigoProducto.className= "form-control";
   
   let nombreProducto= document.getElementById(`nombreProducto`);
   nombreProducto.className= "form-control";
   
   let numSerie= document.getElementById(`numSerie`);
   numSerie.className= "form-control";
   
   let categoriaProducto= document.getElementById(`categoriaProducto`);
   categoriaProducto.className= "form-control";
   
   let descProducto= document.getElementById(`descProducto`);
   descProducto.className= "form-control";
   
   let imgProducto= document.getElementById(`imgProducto`);
   imgProducto.className= "form-control";
   
   
}
function leerDatos(){
    // esta funcion se encarga de leer los datos almacenados en localstorage
    if(localStorage.length > 0){
        let _listaFunkopop = JSON.parse(localStorage.getItem('listaFunkoKey')) ;
        // si el arreglo de funkopop esta vacio igualar con los que traje de localstorage
        if(listaFunkopop.length === 0){
            listaFunkopop= _listaFunkopop;
    
        }
        // dibujar todos los objetos funko en la tabla
        dibujarDatos(_listaFunkopop);
    }
    
}

function dibujarDatos(_listaFunkopop){
    // traigo el elemento padre
    let bodyTablaProductos = document.getElementById('tbodyProductos');
    bodyTablaProductos.innerHTML = '';
    let codigoHTML = '';
    // for(let i=0; i > _listaFunkopop.length; i++)
    for(let i in _listaFunkopop){
        codigoHTML = `
         <tr>
            <th scope="row">${_listaFunkopop[i].codigo}</th>
            <td>${_listaFunkopop[i].nombre}</td>
            <td>${_listaFunkopop[i].numSerie}</td>
            <td>${_listaFunkopop[i].categoria}</td>
            <td>${_listaFunkopop[i].descripcion}</td>
            <td>${_listaFunkopop[i].imagen}</td>
            <td>
                <button class="btn btn-warning text-light">Editar</button>
                <button class="btn btn-danger text-light">Borrar</button>
            </td>
          </tr>
        `;
        bodyTablaProductos.innerHTML += codigoHTML;
    }
}
