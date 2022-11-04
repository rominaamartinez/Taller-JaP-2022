let producto;
let comentarios;
let comentariosNuevos = [];

function showArticle(prod){
    document.getElementById("catNom").innerHTML += prod.category;
    document.getElementById("fotoPrincipal").innerHTML = '<img class="card-img-top mb-5 mb-md-0" src="'+prod.images[0]+'" alt="..." />';        
    document.getElementById("precio").innerHTML = prod.currency +" " + producto.cost;
    document.getElementById("descripcion").innerHTML += prod.description;
    document.getElementById("nombre").innerHTML = prod.name;
    document.getElementById("vendidos").innerHTML += prod.soldCount;
    mostrarImagenes(prod);
}

function mostrarImagenes(prod){
    let htmlToAppend= '';
    for(imagen of prod.images){
        htmlToAppend +='<button class="seleccionar" ><img  class="card-img-top mb-5 mb-md-0" src="'+ imagen +'">';      
    }
    document.getElementById("fotos").innerHTML += htmlToAppend;
}

function setRelID(id){
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function mostrarProdRelacionados(prodRelacionado){
    let htmlContentToAppend = `

    <div onclick="setRelID(${prodRelacionado[0].id})" class="carousel-item active">
    <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" src="${prodRelacionado[0].image}" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${prodRelacionado[0].name}</h5>
                </div>
            </div>
        </div>
    </div>;`
    for(let i=1; i< prodRelacionado.length; i++){
        let product = prodRelacionado[i];
        htmlContentToAppend += `
        <div onclick="setRelID(${product.id})" class="carousel-item">
        <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" src=" ${product.image}" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${product.name}</h5>
                </div>
            </div>
        </div>
        </div>
    `
    }
    document.getElementById("carouselItems").innerHTML += htmlContentToAppend;
}

function puntosEstrella(puntos, categoria){
    let estrellas = "";
    for(let i=1; i<=5; i++){
        if(i<=puntos){
            switch(categoria){
            case"Autos":
                estrellas += '<i class="fas fa-car checked"></i>';
            break;
            case "Juguetes":
                estrellas += '<i class="fas fa-puzzle-piece checked"></i>';
            break;
            case "Muebles":
                estrellas += '<i class="fas fa-couch checked"></i>';
            break;
            default:
            estrellas += '<i class="fas fa-star checked"></i>';
            }
        }else {
            switch(categoria){
            case "Autos":
                estrellas += '<i class="fas fa-car unchecked"></i>'
            break;
            case "Juguetes":
                estrellas += '<i class="fas fa-puzzle-piece unchecked"></i>';
            break;
            case "Muebles":
                estrellas += '<i class="fas fa-couch unchecked"></i>';
            break;
            default:
            estrellas += '<i class="far fa-star"></i>';
            }
        }
    }
    return estrellas;
}

function mostrarComentarios(coment, categoria){
    let htmlContentToAppend = "";
        for(let comentario of coment){
        let puntuacion = puntosEstrella(comentario.score, categoria);
        if(comentario.score < 3){
            htmlContentToAppend += ' <li class="list-group-item list-group-item-danger"> <strong>'+ comentario.user +'</strong>'+"-"+ comentario.dateTime +'-'+puntuacion+'<br>'+comentario.description +'</li>'
        }else if(comentario.score > 3){
            htmlContentToAppend += ' <li class="list-group-item list-group-item-success"> <strong>'+ comentario.user +'</strong>'+"-"+ comentario.dateTime +'-'+ puntuacion +'<br>'+comentario.description +'</li>'

        }else{
            htmlContentToAppend += ' <li class="list-group-item list-group-item-warning"> <strong>'+ comentario.user +'</strong>'+"-"+ comentario.dateTime +'-'+ puntuacion +'<br>'+comentario.description +'</li>'
        }
        
    }
    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
}

function muestraReloj() {
    let fechaHora = new Date();
    let dia = fechaHora.getDate();
    let mes = fechaHora.getMonth()+1;
    let anio = fechaHora.getFullYear();
    let horas = fechaHora.getHours();
    let minutos = fechaHora.getMinutes();
    let segundos = fechaHora.getSeconds();

    if(dia < 10) { dia = '0' + dia; }
    if(mes < 10) { mes = '0' + mes; }
    if(anio < 10) { anio = '0' + anio; }
    if(horas < 10) { horas = '0' + horas; }
    if(minutos < 10) { minutos = '0' + minutos; }
    if(segundos < 10) { segundos = '0' + segundos; }
  
    return anio+"-"+ mes +"-"+ dia +" "+ horas+':'+minutos+':'+segundos;
}


function comentar(comentarios, categoria){
        
        let puntos = document.getElementById("valor").innerHTML;
        let texto = document.getElementById("comentNuevo").value;
        let usuario = localStorage.getItem("user");
        let fechaYHora = muestraReloj();
        comentarios.push({
            user: usuario,
            dateTime: fechaYHora,
            score: puntos,
            description: texto
        });
        mostrarComentarios(comentarios, categoria);
}

function puntosDinamicos(cat){
    let din = "";
    switch(cat){
    case "Autos":

        din = `
        <input id="radio1" type="radio" name="estrellas" value="5"onclick="document.getElementById('valor').innerHTML='5'"><!--
  --><label for="radio1"><i class="fas fa-car "></i></label><!--
  --><input id="radio2" type="radio" name="estrellas" value="4" onclick="document.getElementById('valor').innerHTML='4'"><!--
  --><label for="radio2"><i class="fas fa-car "></i></i></label><!--
  --><input id="radio3" type="radio" name="estrellas" value="3" onclick="document.getElementById('valor').innerHTML='3'"><!--
  --><label for="radio3"><i class="fas fa-car "></i></label><!--
  --><input id="radio4" type="radio" name="estrellas" value="2"onclick="document.getElementById('valor').innerHTML='2'"><!--
  --><label for="radio4"><i class="fas fa-car "></i></label><!--
  --><input checked id="radio5" type="radio" name="estrellas" value="1" onclick="document.getElementById('valor').innerHTML='1'"><!--
  --><label for="radio5"><i class="fas fa-car "></i></label><br>`
  break;

    case "Juguetes":
        din = `
        <input id="radio1" type="radio" name="estrellas" value="5"onclick="document.getElementById('valor').innerHTML='5'"><!--
  --><label for="radio1"><i class="fas fa-puzzle-piece"></i></label><!--
  --><input id="radio2" type="radio" name="estrellas" value="4" onclick="document.getElementById('valor').innerHTML='4'"><!--
  --><label for="radio2"><i class="fas fa-puzzle-piece"></i></i></label><!--
  --><input id="radio3" type="radio" name="estrellas" value="3" onclick="document.getElementById('valor').innerHTML='3'"><!--
  --><label for="radio3"><i class="fas fa-puzzle-piece"></i></label><!--
  --><input id="radio4" type="radio" name="estrellas" value="2"onclick="document.getElementById('valor').innerHTML='2'"><!--
  --><label for="radio4"><i class="fas fa-puzzle-piece"></i></label><!--
  --><input checked id="radio5" type="radio" name="estrellas" value="1" onclick="document.getElementById('valor').innerHTML='1'"><!--
  --><label for="radio5"><i class="fas fa-puzzle-piece"></i></label><br>`
  break;
    case "Muebles":
        din = `
        <input id="radio1" type="radio" name="estrellas" value="5"onclick="document.getElementById('valor').innerHTML='5'"><!--
  --><label for="radio1"><i class="fas fa-couch"></i></label><!--
  --><input id="radio2" type="radio" name="estrellas" value="4" onclick="document.getElementById('valor').innerHTML='4'"><!--
  --><label for="radio2"><i class="fas fa-couch"></i></i></label><!--
  --><input id="radio3" type="radio" name="estrellas" value="3" onclick="document.getElementById('valor').innerHTML='3'"><!--
  --><label for="radio3"><i class="fas fa-couch"></i></label><!--
  --><input id="radio4" type="radio" name="estrellas" value="2"onclick="document.getElementById('valor').innerHTML='2'"><!--
  --><label for="radio4"><i class="fas fa-couch"></i></label><!--
  --><input checked id="radio5" type="radio" name="estrellas" value="1" onclick="document.getElementById('valor').innerHTML='1'"><!--
  --><label for="radio5"><i class="fas fa-couch"></i></label><br>`
  break;
    default:
    din = `
    <input id="radio1" type="radio" name="estrellas" value="5"onclick="document.getElementById('valor').innerHTML='5'"><!--
--><label for="radio1"><i class="fas fa-star"></i></label><!--
--><input id="radio2" type="radio" name="estrellas" value="4" onclick="document.getElementById('valor').innerHTML='4'"><!--
--><label for="radio2"><i class="fas fa-star"></i></i></label><!--
--><input id="radio3" type="radio" name="estrellas" value="3" onclick="document.getElementById('valor').innerHTML='3'"><!--
--><label for="radio3"><i class="fas fa-star"></i></label><!--
--><input id="radio4" type="radio" name="estrellas" value="2"onclick="document.getElementById('valor').innerHTML='2'"><!--
--><label for="radio4"><i class="fas fa-star"></i></label><!--
--><input checked id="radio5" type="radio" name="estrellas" value="1" onclick="document.getElementById('valor').innerHTML='1'"><!--
--><label for="radio5"><i class="fas fa-star"></i></label><br>`

}
    document.getElementById("puntDinam").innerHTML = din;  
}


document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            producto = resultObj.data;
            showArticle(producto);
            mostrarProdRelacionados(producto.relatedProducts);
        }
        let fotos = document.getElementsByClassName("seleccionar");

        for(let foto of fotos){
            foto.addEventListener("click", ()=>{
            document.getElementById("fotoPrincipal").innerHTML = foto.innerHTML;
            })
        }
        
        getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok"){
                comentarios = resultObj.data;
                mostrarComentarios(comentarios, producto.category);
                puntosDinamicos(producto.category);
            }
            
        })
        document.getElementById("enviarCom").addEventListener("click", ()=>{
            comentar(comentarios, producto.category);
            puntosDinamicos(producto.category);
            document.getElementById("comentNuevo").value = "";
        })
        document.getElementById("añadirCarrito").addEventListener("click", ()=>{
            document.getElementById("animacion").innerHTML = `<lottie-player src="https://assets8.lottiefiles.com/packages/lf20_vbrwdppa.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"autoplay></lottie-player>`
            setTimeout(function(){
                document.getElementById("animacion").innerHTML = ``;
            }, 3000);
            let aux = localStorage.getItem("carrito2");
            let array = [];
            if( aux != "null"){ //si no if y else no anda
                array = JSON.parse(localStorage.getItem("carrito2"))
                array.push({
                    id: producto.id,
                    name: producto.name,
                    currency: producto.currency,
                    unitCost: producto.cost,
                    image: producto.images[0]
                });
                localStorage.setItem("carrito2", JSON.stringify(array));
            }else{
                array.push({
                    id: producto.id,
                    name: producto.name,
                    currency: producto.currency,
                    unitCost: producto.cost,
                    image: producto.images[0]
                });
                localStorage.setItem("carrito2", JSON.stringify(array));
            }
        })
    });
    
  
})
