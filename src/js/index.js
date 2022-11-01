const inptNombre = document.getElementById('agr-nombre');
const inptPrecioLote = document.getElementById('agr-precioLote');
const inptPrecioUnidad = document.getElementById('agr-precioUnitario');
const inptCategoria = document.getElementById('agr-categoria');
const inptCantidad = document.getElementById('agr-cantidad');
const btnAgregar = document.getElementById('btn-agregar');
const formAgr = document.getElementById('notifyAgr'); 

document.addEventListener('DOMContentLoaded',function(){
    app()
});
function app(){
    validarFormulario();   
}
// Valida el formulario antes de agregar
function validarFormulario(){
    btnAgregar.addEventListener('click', function(e){
        e.preventDefault();
        if(inptNombre.value.trim() ==='' || inptPrecioLote.value === '' || inptPrecioUnidad.value === '' || inptCategoria.value === '' || inptCantidad.value === ''){
            messageError('Llena todos los campos, porfavor.');
            return; 
        }else{
            agregarProducto();
            limpiarCampos();
            messageSuccess('Producto Agregado.')
        }
    });
}

// Agrega el producto a las tablas
function agregarProducto(){
    const producto = {
        nombre: inptNombre.value,
        cantidad: inptCantidad.value,
        precioLote: inptPrecioLote.value,
        precioUnitario: inptPrecioUnidad.value,
        categoria: inptCategoria.value
    }
    const tableProducts = document.getElementById('tabla-products-body');
    const trProduct = document.createElement('TR');
    trProduct.innerHTML = `
    <td>${producto.nombre}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.precioLote}</td>
    <td>${producto.precioUnitario}</td>
    <td>${producto.categoria}</td>
    <td>
        <button class="btn-delete"><span class="material-symbols-outlined">delete</span></button>
        <button class="btn-upgrade"><span class="material-symbols-outlined">upgrade</span></button>
    </td>
    `
    tableProducts.appendChild(trProduct);
    eliminarProducto();
}
// Eliminamos producto.
function eliminarProducto(){
    const btnDelete = document.getElementsByClassName('btn-delete');
    const newArray = Array.from(btnDelete); //Convierte un objeto a un array
    newArray.forEach(element => {
       element.addEventListener('click',function(){
        const trDelete = element.closest('tr');
        trDelete.remove();
        messageSuccess('Producto Eliminado Correctamente.');
       })
    });
    //console.log(btnDelete.item(0).closest('tr'));
}
// Limpiamos los campos
function limpiarCampos(){
     inptNombre.value = '';
     inptPrecioUnidad.value = '';
     inptPrecioLote.value = '';
     inptCategoria.value = '';
     inptCantidad.value = '';
}
// Crea el mensaje de error
function messageError(messageError){
    const message = document.createElement('P')
    message.textContent = messageError;
    formAgr.classList.add('error');
    formAgr.appendChild(message);
    setTimeout(function(){
        formAgr.classList.remove('error')
        formAgr.removeChild(message);
    }, 2000);
}
// Crea un mensaje de ok
function messageSuccess(messageSuccess){
    const message = document.createElement('P')
    message.textContent = messageSuccess;
    formAgr.classList.add('success');
    formAgr.appendChild(message);
    setTimeout(function(){
        formAgr.classList.remove('success')
        formAgr.removeChild(message);
    }, 2000);
}