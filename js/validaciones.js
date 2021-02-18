function campoRequerido(elemento){
    console.log("en la funcion campo requerido");
    if(elemento.value === ``){
        elemento.className = `form-control is-invalid`;
        return false;
    } else{
        elemento.className = `form-control is-valid`;
        return true;
    }
}

// var input=  document.getElementById('numero');
// input.addEventListener('input',function(){
//   if (this.value.length > 12) 
//      this.value = this.value.slice(0,12); 
// })

// let codigo= document.getElementById("codigoProducto");
// codigo.addEventListener(`blur`, validarCodigo);
    function validarCodigo(codigo){
        console.log("dentro de la funcion validarCodigo");
        let expresion = /\d$/;
        if(expresion.test(codigo.value) && codigo.value.length >=10){
            console.log("salio todo bien");
            codigo.value = codigo.value.slice(0,10);
            codigo.className=`form-control is-valid`;
            return true;
        }
        else{
            console.log("todo mal flaco hubo un error");
            codigo.value = codigo.value.slice(0,10);
            codigo.className=`form-control is-invalid`;
            return false;
        }
    }


    function validarGeneral(event){
        event.preventDefault();
        console.log("dentro de la funcion validarGeneral");
        let alerta= document.querySelector("#msjEnvio");
        if(validarCodigo(document.getElementById(`codigoProducto`))
        && validarCodigo(document.getElementById(`numSerie`))
        && campoRequerido(document.getElementById(`numSerie`))
        && campoRequerido(document.getElementById(`categoriaProducto`))
        && campoRequerido(document.getElementById(`descProducto`))
        && campoRequerido(document.getElementById(`imgProducto`))){
            console.log(`todo correcto`);
        }
    }