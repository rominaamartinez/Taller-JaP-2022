let articulosArray = [];
let arrayLocal = [];
let flag1 = false;
let flag2 = false;


    // Fetch all the forms we want to apply custom Bootstrap validation styles to
  
    // Loop over them and prevent submission
        
 

function setProdId(i){
    let id = articulosArray[i].id;
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function mostrarArticulos(articulos){
    let htmlContentToAppend = "";
    for(let i=0; i<articulos.length; i++ ){
        let articulo= articulos[i];
        htmlContentToAppend += `
        <tr>
            <td class="p-4">
                 <div class="media align-items-center">
                    <div class="media-body">
                            <a onclick="setProdId(${i})" href=# class="d-block text-dark">${articulo.name}</a>
                    </div>   
                    <img src= ${articulo.image} class="d-block ui-w-40 ui-bordered mr-4 " alt="">
                        
                </div>
            </td>
            <td class="text-right font-weight-semibold align-middle p-4">${articulo.currency +" " + articulo.unitCost}</td>
            <td class="align-middle p-4">
            <input onchange="calcularPrecioPorCant(${i})" id="${articulo.id}" type="number" class="form-control text-center cantItem" value="1">
            </td>
            <td class="text-right font-weight-semibold align-middle p-4">${articulo.currency} 
            <p id="${articulo.name}"> ${articulo.unitCost} </p>
            </td>
            <td class="text-center align-middle px-0"><a href="#" class="shop-tooltip close float-none text-danger" title="" data-original-title="Remove"><i class="fas fa-trash-alt" name="borrar"></i></a></td>
        </tr>
        `
        document.getElementById("listaArt").innerHTML = htmlContentToAppend;
    }
}

function calcularPrecioSubtotal(articulos){
    let htmlContentToAppend ="";
    let contador = 0;
    let cant;
    let costo;
    for(let articulo of articulos){
        if(articulo.currency == "UYU"){
            costo = parseInt(articulo.unitCost) / 40;
        }else{
            costo = articulo.unitCost;
        }
        cant = document.getElementById(articulo.id).value;
        contador += cant * costo;
    }
    htmlContentToAppend = ` 
    <div>
        <label class="text-muted font-weight-normal m-0">Precio Total</label>
        <hr>
        <div class="row">
            <div class="col">
                <p>Subtotal </p>
            </div>
            <div class="col">
                <span class="float-end" id="cantSubtotal">USD ${contador}</span>
            </div>
        </div>
        <div id="costoEnvio">
        </div>
        <div id="costoTotal">
        </div>
    </div>`
    
    document.getElementById("precioTotal").innerHTML = htmlContentToAppend;
}

function calcularPrecioPorCant(i){
    let nombre = articulosArray[i].name
    let precio = articulosArray[i].unitCost;
    let id= articulosArray[i].id;
    let cant = document.getElementById(id).value;
    document.getElementById(nombre).innerHTML = cant*precio;
   calcularPrecioSubtotal(articulosArray);
   let tipoEnvio = localStorage.getItem("tipoEnvio");
   
   mostrarCostoEnvio(tipoEnvio);
    mostrarPrecioTotal(tipoEnvio);
}

function calcularCostoEnvio(tipoEnvio, subtotal){
    if(subtotal != 0){
    switch(tipoEnvio){
        case "Premium": return subtotal * 0.15;
        break;
        case "Express": return subtotal * 0.07;
        break;
        case "Standard": return subtotal* 0.05;
        break;
    }
    }else {
            return 0;
        }
    
}

function mostrarCostoEnvio(tipoEnvio){
    let subtotal = document.getElementById("cantSubtotal").innerHTML;
    subtotal = subtotal.substring(4, subtotal.length);
    console.log(subtotal)
    let costoEnvio = calcularCostoEnvio(tipoEnvio, parseInt(subtotal));
    
    let htmlContentToAppend = `
        <div class="row">
            <div class="col">
                <p>Costo de envío</p>
            </div>
            <div class="col">
                <span class="float-end" id="cantCostoEnvio">
                USD ${costoEnvio}
                </span>
            </div>
        </div>
    `
    document.getElementById("costoEnvio").innerHTML = htmlContentToAppend;
}

function mostrarPrecioTotal(tipoEnvio){
    let subtotal = document.getElementById("cantSubtotal").innerHTML;
    subtotal = subtotal.substring(4, subtotal.length);
    let costEnvio = calcularCostoEnvio(tipoEnvio, parseInt(subtotal))
    
    let total = parseInt(subtotal) + parseInt(costEnvio);

    let htmlContentToAppend =`
    <hr>
    <div class="row">
            <div class="col">
                <p><strong>Total</strong></p>
            </div>
            <div class="col">
                <span class="float-end" id="cantCostoEnvio">
                USD ${total}
                </span>
            </div>
        </div>
    `
    document.getElementById("costoTotal").innerHTML = htmlContentToAppend;
}

function mostrarDetallesDePago(pago){
    let html =``;
    if(pago === "Transferencia"){
 
        html =`
        <div class="containerPago">
            <h4>Transferencia Bancaria</h4>
            <hr>
            
            <label for="validationCustom01" class="form-label">Numero de cuenta</label>
            <input id="nCuenta" type="text" class="form-control" value="">
            </div>
 
        `
    }else{
        
        html=`
            <div class="containerPago">
            <h4>Tarjeta de crédito</h4>
            <hr>
            
            <label for="validationCustom01" class="form-label">Numero de tarjeta</label>
            <input id="nTarjeta" type="text" class="form-control" value="" >
            <label for="validationCustom01" class="form-label">Codigo de seg.</label>
            <input id="codSeg" type="text" class="form-control" value="" >
            <label for="validationCustom01" class="form-label">Vencimiento(MM/AA)</label>
            <input id="vence" type="text" class="form-control" value="" >
            </div>
        `
    }
    document.getElementById("collapseTipoPago").innerHTML = html


}
function validarCantidades(){
    let items = document.getElementsByClassName("cantItem");
    let i = 0;
    while(i<items.length-1 && items[i].value != 0){ 
        i++;
    }
    console.log(i)
    if(items[i].value == 0){
        document.getElementById("cantIncorrecta").innerHTML = `<p class="incompleto">No pueden haber productos con cantidad 0</p>`
        return false;
    }else{
        document.getElementById("cantIncorrecta").innerHTML = ``
        return true;
    }
}

function validarTipoPago(tipoPago){
    if(tipoPago === "Transferencia"){
        let nCuenta = document.getElementById("nCuenta")
        if(nCuenta.value == ""){
            document.getElementById("pagoIncompleto").innerHTML = "<p>Hay campos sin completar</p>"
            nCuenta.classList.add("error")
            return false;
        }else{
            document.getElementById("pagoIncompleto").innerHTML = ""
            return true;
        }
        
    }else{
        let nTarjeta = document.getElementById("nTarjeta")
        let codSeg = document.getElementById("codSeg")
        let vence = document.getElementById("vence")

        if(nTarjeta.value == "" || codSeg.value == "" || vence.value == ""){
            if(nTarjeta.value == ""){
                nTarjeta.classList.add("error")
            }
            if(codSeg.value == ""){
                codSeg.classList.add("error")
            }
            if(vence.value == ""){
                vence.classList.add("error")
            }
            document.getElementById("pagoIncompleto").innerHTML = "<p>Hay campos sin completar</p>"
            return false;
        }else{
            document.getElementById("pagoIncompleto").innerHTML = ""
            return true;
        }
        
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    
    getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function(resultObj){
        if(resultObj.status === "ok"){
            articulosArray = resultObj.data.articles;
            arrayLocal = localStorage.getItem("carrito2")
            if(arrayLocal != "null"){
                let array = JSON.parse(arrayLocal);
                for(let item of array){
                    articulosArray.push(item);
                } 
            }
            mostrarArticulos(articulosArray);
            
            calcularPrecioSubtotal(articulosArray);
            mostrarCostoEnvio("Premium");
            mostrarPrecioTotal("Premium");
            localStorage.setItem("tipoEnvio", "Premium")
            localStorage.setItem("tipoPago", "Transferencia")
            mostrarDetallesDePago("Transferencia");
        }
    let borrarArray = document.getElementsByName("borrar"); 
    
    for(let i=0; i< borrarArray.length; i++){
        let borra = borrarArray[i];
        borra.addEventListener("click", ()=>{
            articulosArray.splice(i,1);
            let tipoEnvio = localStorage.getItem("tipoEnvio")
            //localStorage.setItem("carrito2", JSON.stringify(articulosArray))
            mostrarArticulos(articulosArray);
            calcularPrecioSubtotal(articulosArray);
            mostrarCostoEnvio(tipoEnvio);
            mostrarPrecioTotal(tipoEnvio);
        })
    }
    })


    

    document.getElementById("btnTipoEnvio").addEventListener("click", ()=>{
            
            document.getElementById("opcion1").addEventListener("click", ()=>{
                localStorage.setItem("tipoEnvio", "Premium")
                document.getElementById("infoEnvio").innerHTML =`
                    <p>Seleccionaste <strong>Premium</strong>: 2 a 5 dias (15%)</p>
                `
                let tipoEnvio = document.getElementById("opcion1").innerHTML
                mostrarCostoEnvio(tipoEnvio);
                mostrarPrecioTotal(tipoEnvio);
            })
            document.getElementById("opcion2").addEventListener("click", ()=>{
                localStorage.setItem("tipoEnvio", "Express")

                document.getElementById("infoEnvio").innerHTML =`
                    <p>Seleccionaste <strong>Express</strong>: 5 a 8 dias (7%)</p>
                `
                let tipoEnvio = document.getElementById("opcion1").innerHTML
                mostrarCostoEnvio(tipoEnvio);
                mostrarPrecioTotal(tipoEnvio);
            })
            document.getElementById("opcion3").addEventListener("click", ()=>{
                localStorage.setItem("tipoEnvio", "Standard")
                document.getElementById("infoEnvio").innerHTML =`
                    <p>Seleccionaste <strong>Standard</strong>: 12 a 15 dias (5%)</p>
                `
                let tipoEnvio = document.getElementById("opcion1").innerHTML
                mostrarCostoEnvio(tipoEnvio);
                mostrarPrecioTotal(tipoEnvio);
            })

    })
    document.getElementById("credito").addEventListener("click", ()=>{
        localStorage.setItem("tipoPago", "Credito")
        mostrarDetallesDePago("Credito")
    })
    document.getElementById("transferencia").addEventListener("click", ()=>{
        localStorage.setItem("tipoPago", "Transferencia");
        mostrarDetallesDePago("Transferencia")
    })
    document.getElementById("finCompra").addEventListener("click", ()=>{
        let tipoPago= localStorage.getItem("tipoPago")
        flag1=validarTipoPago(tipoPago);
        flag2=validarCantidades();
    })

   let form = document.getElementById("formulario");
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity() || flag1 == false || flag2==false) {
        if(!form.checkValidity()){
        document.getElementById("avisoIncompleto").innerHTML = "<p>Hay campos sin completar</p>"
        } 
        event.preventDefault()
        event.stopPropagation()
        form.classList.add('was-validated')
        if(form.checkValidity()){
            document.getElementById("avisoIncompleto").innerHTML = ""
        }
      }else{
        document.getElementById("avisoIncompleto").innerHTML = ""
            Swal.fire({
                icon: 'success',
                title: 'Finalizó la compra con éxito',
            })
            event.preventDefault()
            //event.stopPropagation()
      }

    })

})
