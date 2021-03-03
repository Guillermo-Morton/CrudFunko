import {Funko} from "./funkoClass.js";

let listaFunkopop = [];

const modalFunko = new bootstrap.Modal(document.getElementById('modal'));

let btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click', ()=>{
    limpiarForumulario();
    modalFunko.show();
})
let existeFunko = false;

// al cargar la pagina cargo la funcion que carga los datos y los dibuja
leerDatos();

window.agregarFunkopop= function(event){
    // event.preventDefault();
    console.log("dentro de la funcion agregar");
    let alerta= document.querySelector("#msjEnvio");
    if(validarCodigo(document.getElementById(`codigoProducto`))       
    && campoRequerido(document.getElementById(`nombreProducto`))
    && validarCodigo(document.getElementById(`numSerie`))
    && campoRequerido(document.getElementById(`categoriaProducto`))
    && campoRequerido(document.getElementById(`descProducto`))){
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
   existeFunko=false;
   
   
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
                <button class="btn btn-warning text-light" onclick="editarFunko(this)" id='${_listaFunkopop[i].codigo}'>Editar</button>
                <button class="btn btn-danger text-light" onclick="eliminarFunkopop(this)" id='${_listaFunkopop[i].codigo}'>Borrar</button>
            </td>
          </tr>
        `;
        bodyTablaProductos.innerHTML += codigoHTML;
    }
}

window.eliminarFunkopop= function (funkopop){
    console.log('prueba', funkopop.id);
    Swal.fire({
        title: '¿Estas seguro de eliminar el Funkopop seleccionado?',
        text: "No hay posibilidades de revertir esta accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
            // aqui borrar el producto
            let funkopopFiltrados = listaFunkopop.filter((producto)=>{
              return producto.codigo != funkopop.id;
            })
            // pasamos los funko filtrados al arreglo principal
            listaFunkopop = funkopopFiltrados;
            // guardar los nuevos datos en local storage
            localStorage.setItem('listaFunkoKey', JSON.stringify(listaFunkopop))
            leerDatos();
            console.log(funkopopFiltrados);
          Swal.fire(
            'Eliminado!',
            'El Funko se elimino correctamente.',
            'success'
          )
        }
      })
      
}

window.editarFunko= function(btnEditar){
  console.log(btnEditar.id);
  // limpiar los datos de la ventana modal
  limpiarForumulario();
  // busca el objeto a modificar
  let objetoEncontrado = listaFunkopop.find((producto)=>{
    return producto.codigo==btnEditar.id;
  });
  console.log(objetoEncontrado)
 //cargar los datos en el formulario
 document.getElementById('codigoProducto').value=objetoEncontrado.codigo; 
 document.getElementById('nombreProducto').value=objetoEncontrado.nombre; 
 document.getElementById('numSerie').value=objetoEncontrado.numSerie; 
 document.getElementById('categoriaProducto').value=objetoEncontrado.categoria; 
 document.getElementById('descProducto').value=objetoEncontrado.descripcion; 
 document.getElementById('imgProducto').value=objetoEncontrado.imagen; 
 //cambiar el valor de la variable existeFunko
  existeFunko= true; 
  modalFunko.show();
}
window.guardarFunko= function(event){
  event.preventDefault();
  if(existeFunko===true){

    actualizarDatosFunkopop();
  }else{
    agregarFunkopop();
  }
}
function actualizarDatosFunkopop(){
  // esta funcion guarda en ls con los datos modificados
  console.log('modificar');
  // validar los campos
  if(validarCodigo(document.getElementById(`codigoProducto`))       
  && campoRequerido(document.getElementById(`nombreProducto`))
  && validarSerie(document.getElementById(`numSerie`))
  && campoRequerido(document.getElementById(`categoriaProducto`))
  && campoRequerido(document.getElementById(`descProducto`))){
  let codigo=document.getElementById('codigoProducto').value; 
  let nombre=document.getElementById('nombreProducto').value; 
  let numSerie=document.getElementById('numSerie').value; 
  let categoria=document.getElementById('categoriaProducto').value; 
  let descripcion=document.getElementById('descProducto').value; 
  let imagen=document.getElementById('imgProducto').value; 
  //buscar el objeto que quiero modificar y cambiar sus valores
  for(let i in listaFunkopop){
    if(listaFunkopop[i].codigo===codigo){
      // encontre el funko a editar
      listaFunkopop[i].nombre=nombre;
      listaFunkopop[i].numSerie=numSerie;
      listaFunkopop[i].categoria=categoria;
      listaFunkopop[i].descripcion=descripcion;
      listaFunkopop[i].imagen=imagen;
    }
  }
  // guardar el array en localstorage
  localStorage.setItem('listaFunkoKey', JSON.stringify(listaFunkopop))
  // limpiar los datos
  limpiarForumulario();
  // cerrar ventana
  modalFunko.hide();
  // mostrar mensaje de operacion con exito
  Swal.fire(
    'Perfecto!',
    'Editaste un producto correctamente',
    'success'
  )
  leerDatos();
  }
}   

