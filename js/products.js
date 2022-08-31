let productsArray = [];
let minCount = undefined;
let maxCount = undefined;

function showProducts(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){ 
        let producto = array[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ producto.name + " " +"-"+ " " + producto.currency + " " + producto.cost +`</h4> 
                        <p> `+ producto.description +`</p> 
                        </div>
                        <small class="text-muted">` + producto.soldCount+ ` vendidos</small>
                    </div>

                </div>
            </div>
        </div>
        `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;   
    }
}
function buscar(productos){
    let buscado = document.getElementById("buscar").value;
    let arrayFiltrado = productos.products.filter( dato => {
        return dato.name.toLowerCase().indexOf(buscado.toLowerCase()) > -1;
    })
    showProducts(arrayFiltrado);
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData( PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProducts(productsArray.products);
        }
        document.getElementById("titulo").innerHTML += "<h3>veras aquí todos los productos de la categoria " + productsArray.catName + "</h3>"

    });

    document.getElementById("buscar").addEventListener("keyup", ()=>{
        buscar(productsArray);
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        let arraySort = productsArray.products;
        result = arraySort.sort(function(a, b) {
            if ( a.cost < b.cost){ return -1; }
            if ( a.cost > b.cost){ return 1; }
            return 0;
        });
        showProducts(arraySort);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        let arraySort = productsArray.products;
        result = arraySort.sort(function(a, b) {
            if ( a.cost > b.cost){ return -1; }
            if ( a.cost < b.cost){ return 1; }
            return 0;
        });
        showProducts(arraySort);

    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        let arraySort = productsArray.products;
        result = arraySort.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
        showProducts(arraySort);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;
        console.log(productsArray.products);
        showProducts(productsArray.products);
    });
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProducts(productsArray.products);
    });

});