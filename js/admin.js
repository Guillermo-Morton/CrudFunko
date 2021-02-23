import {Funko} from "./funkoClass.js";

let listaFunkopop = [];

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

        Swal.fire(
            'Perfecto!',
            'Agregaste un producto correctamente',
            'success'
          )
    
    }else{
        console.log("datos incorretos");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal!',
          })
    }
    let modalFunko = new bootstrap.Modal(document.getElementById("modalProducto"))
        modalFunko.hide();
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