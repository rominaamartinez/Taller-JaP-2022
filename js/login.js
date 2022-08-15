function login(){
    let usuario = document.getElementById("form2Example18").value;
    let password = document.getElementById("form2Example28").value;
    if(usuario == "" || password == ""){
        document.getElementById("form2Example28").classList.add("error");
        document.getElementById("form2Example18").classList.add("error");
        alert("Debe ingresar usuario y contraseña");
    }else {
        location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("boton").addEventListener("click", ()=>{
        login();
    })
})