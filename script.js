document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
    cargarDatos();
});

function verificarSesion() {
    var usuarioActivo = localStorage.getItem('usuarioActivo');
    if (usuarioActivo) {
        mostrarMainContainer();
    } else {
        mostrarLoginContainer();
    }
}

function iniciarSesion() {
    var usuario = document.getElementById('usuario').value;
    var password = document.getElementById('password').value;
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    var usuarioValido = usuarios.find(function(u) {
        return u.usuario === usuario && u.password === password;
    });

    if (usuarioValido) {
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));
        mostrarMainContainer();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function registrar() {
    var usuario = document.getElementById('usuario').value;
    var password = document.getElementById('password').value;
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    var usuarioExistente = usuarios.find(function(u) {
        return u.usuario === usuario;
    });

    if (usuarioExistente) {
        alert('El usuario ya existe');
    } else {
        usuarios.push({ usuario: usuario, password: password });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuario registrado correctamente');
    }
}

function mostrarMainContainer() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
}

function mostrarLoginContainer() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('main-container').style.display = 'none';
}

function guardarDatos() {
    var cuenta = document.getElementById('cuenta').value;
    var comprador = document.getElementById('comprador').value;
    var fechaCompra = new Date();
    var fechaCompraFormateada = fechaCompra.toLocaleDateString() + ' ' + fechaCompra.toLocaleTimeString();
    var fechaVencimiento = new Date(fechaCompra);
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 29);
    var fechaVencimientoFormateada = fechaVencimiento.toLocaleDateString() + ' ' + fechaVencimiento.toLocaleTimeString();
    var proveedor = "VENDE Y GANA";

    if (cuenta && comprador) {
        var registros = JSON.parse(localStorage.getItem('registros')) || [];
        
        var nuevoRegistro = {
            cuenta: cuenta,
            comprador: comprador,
            fechaCompra: fechaCompraFormateada,
            fechaVencimiento: fechaVencimientoFormateada,
            proveedor: proveedor
        };
        
        registros.push(nuevoRegistro);
        localStorage.setItem('registros', JSON.stringify(registros));
        
        agregarRegistroATabla(nuevoRegistro);

        document.getElementById('cuenta').value = '';
        document.getElementById('comprador').value = '';
    } else {
        alert('Por favor, ingrese todos los datos.');
    }
}

function cargarDatos() {
    var registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.forEach(agregarRegistroATabla);
}

function agregarRegistroATabla(registro)