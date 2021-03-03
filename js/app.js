// logica principal de la pagina    


let listaFunkoPop= [];
leerProductos();

function leerProductos(){
    // el objetivo de esta funcion es traer los datos del localstorage
    if(localStorage.length > 0){
        listaFunkoPop = JSON.parse(localStorage.getItem('listaFunkoKey'));
        dibujarCard();
    }
}

function dibujarCard(){
    let fila = document.getElementById('listaFunko');
    // limpio los datos dentro de la fila 
    fila.innerHTML = '';
    let informacionFunko='';
    // agregar una imagen si el usuario no cargo nada en la propiedad imagen
    let img = '';
    
    console.log('listaFunko');
    for(let i in listaFunkoPop){
        if(listaFunkoPop[i].imagen === ''){
            // agregar una imagen por defecto
            console.log('se agrego una imagen por defecto');
            img= "img/productos/r2-d2.png";
        }else{
            img= `img/productos/${listaFunkoPop[i].imagen}`;
        }
        informacionFunko= `
        <div class="col-md-3 mt-4">
            <div class="card">
             <img src="${img}" class="card-img-top" alt="funkopop ${listaFunkoPop[i].nombre}">
             <div class="card-body">
               <h5 class="card-title">${listaFunkoPop[i].nombre}</h5>
               <p class="card-text">${listaFunkoPop[i].descripcion}</p>
               <a href="#" class="btn btn-primary disabled">ver mas...</a>
             </div>
             </div>
         </div>
        `;
        // agregar las columnas a la fila
        fila.innerHTML += informacionFunko;

    }
}

