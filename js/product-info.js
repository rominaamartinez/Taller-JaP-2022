let producto;
let comentarios;
let comentariosNuevos = [];

function showArticle(prod){
    document.getElementById("catNom").innerHTML += prod.category;
    document.getElementById("fotoPrincipal").innerHTML = '<img class="card-img-top mb-5 mb-md-0" src="'+prod.images[1]+'" alt="..." />';        document.getElementById("precio").innerHTML = prod.currency +" " + producto.cost;
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
            if(categoria == "Autos"){
                estrellas += '<i class="fas fa-car checked"></i>';
            }else if(categoria == "Juguetes"){
                estrellas += '<i class="fas fa-puzzle-piece checked"></i>';
            }else if(categoria == "Muebles"){
                estrellas += '<i class="fas fa-couch checked"></i>';
            }else
            estrellas += '<i class="fas fa-star checked"></i>';
        }else{
            if(categoria == "Autos"){
                estrellas += '<i class="fas fa-car unchecked"></i>'
            }else if(categoria == "Juguetes"){
                estrellas += '<i class="fas fa-puzzle-piece unchecked"></i>';
            }else if(categoria == "Muebles"){
                estrellas += '<i class="fas fa-couch unchecked"></i>';
            }else
            estrellas += '<i class="far fa-star"></i>';
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
        let puntos = document.getElementById("puntuacion").value;
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

document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
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
        /*for(let articulo of producto.relatedProducts){
            articulo.addEventListener("click", ()=>{
                window.href =
            })
        } esto seria para apretar el articulo relacionado y que redirija a la pagina que corresponde, esta sin terminar*/
    
        getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok"){
                comentarios = resultObj.data;
                mostrarComentarios(comentarios, producto.category);
                
            }
        })
        document.getElementById("enviarCom").addEventListener("click", ()=>{
            comentar(comentarios, producto.category);
            document.getElementById("puntuacion").value = "";
            document.getElementById("comentNuevo").value = "";
        })
    });
  
})