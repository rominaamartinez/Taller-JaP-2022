let productsArray = [];

function showProducts(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.products.length; i++){ 
        let producto = array.products[i];
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
        
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japceibal.github.io/emercado-api/cats_products/101.json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProducts(productsArray);
        }
    });
});