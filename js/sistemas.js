(function () {
    var $ = function (id) { return document.getElementById(id); };

    // simulacion del ultimo cupo, A llega primero y B choca con la version vieja
    var botonCupo = $('simular-cupo');
    if (botonCupo) {
        botonCupo.addEventListener('click', function () {
            var resA = $('res-a'), resB = $('res-b'), sub = $('cupo-sub'), caja = $('cupo-caja');
            botonCupo.disabled = true;
            resA.textContent = 'enviando'; resB.textContent = 'enviando';
            resA.classList.remove('bien'); resB.classList.remove('mal');
            caja.classList.remove('marcada');
            sub.textContent = '1 disponible';

            var movA = $('mov-a'), movB = $('mov-b');
            var puntos = document.querySelectorAll('.viaje');
            puntos.forEach(function (c) { c.style.opacity = 1; });
            if (movA && movA.beginElement) { movA.beginElement(); movB.beginElement(); }

            setTimeout(function () {
                resA.textContent = 'confirmada';
                resA.classList.add('bien');
                caja.classList.add('marcada');
                sub.textContent = '0 disponibles';
            }, 1000);
            setTimeout(function () {
                resB.textContent = 'conflicto';
                resB.classList.add('mal');
            }, 1250);
            setTimeout(function () {
                sub.textContent = 'sin sobrecupo';
                puntos.forEach(function (c) { c.style.opacity = 0; });
                botonCupo.disabled = false;
                botonCupo.textContent = 'Simular otra vez';
            }, 2000);
        });
    }

    // escaner de asistencia, cada clic es una persona que pasa por la puerta
    var botonQR = $('escanear');
    if (botonQR) {
        var n = { pendiente: 6, presente: 0, retirado: 0 };
        var clics = 0;
        var marcar = function (paso) {
            document.querySelectorAll('[data-paso]').forEach(function (c) {
                c.classList.toggle('marcada', c.dataset.paso === paso);
            });
        };
        var pintar = function () {
            $('n-pendiente').textContent = n.pendiente;
            $('n-presente').textContent = n.presente;
            $('n-retirado').textContent = n.retirado;
        };

        botonQR.addEventListener('click', function () {
            clics++;
            if (n.pendiente === 0 && n.presente === 0) {
                n = { pendiente: 6, presente: 0, retirado: 0 };
                marcar('pendiente');
                botonQR.textContent = 'Escanear un código';
            } else if ((clics % 3 === 0 && n.presente > 0) || n.pendiente === 0) {
                n.presente--; n.retirado++;
                marcar('retirado');
            } else {
                n.pendiente--; n.presente++;
                marcar('presente');
            }
            if (n.pendiente === 0 && n.presente === 0) botonQR.textContent = 'Empezar otro evento';
            pintar();
        });
    }
})();
