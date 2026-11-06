(function () {
    var raiz = document.documentElement;
    var USUARIO = 'Said1Ojeda';

    // tema claro u oscuro, se guarda si el navegador deja
    var botonTema = document.getElementById('tema');
    if (botonTema) {
        botonTema.addEventListener('click', function () {
            var actual = raiz.dataset.tema ||
                (matchMedia('(prefers-color-scheme: light)').matches ? 'claro' : 'oscuro');
            var nuevo = actual === 'claro' ? 'oscuro' : 'claro';
            raiz.dataset.tema = nuevo;
            try { localStorage.setItem('plano-tema', nuevo); } catch (e) {}
        });
    }

    // largo real de cada trazo para que el dibujo no se corte ni se pase
    document.querySelectorAll('.dibujar .d-linea, .dibujar .d-caja, .por-dibujar .d-linea, .por-dibujar .d-caja').forEach(function (el) {
        if (typeof el.getTotalLength !== 'function') return;
        var largo = Math.ceil(el.getTotalLength()) + 2;
        el.style.setProperty('--largo', largo);
    });

    // el retraso del grupo lo heredan las cajas y textos
    document.querySelectorAll('.dibujar g[style], .por-dibujar g[style]').forEach(function (g) {
        var r = g.style.getPropertyValue('--retraso');
        if (!r) return;
        g.querySelectorAll('*').forEach(function (h) {
            if (!h.style.getPropertyValue('--retraso')) h.style.setProperty('--retraso', r);
        });
    });

    var anio = document.getElementById('anio');
    if (anio) anio.textContent = new Date().getFullYear();

    // cajetin, cambia segun la hoja que se ve
    var hojas = document.querySelectorAll('.hoja[data-hoja]');
    var num = document.getElementById('hoja-num');
    var titulo = document.getElementById('hoja-titulo');
    if ('IntersectionObserver' in window && hojas.length) {
        var obsHoja = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (e) {
                if (!e.isIntersecting) return;
                if (num) num.textContent = e.target.dataset.hoja;
                if (titulo) titulo.textContent = e.target.dataset.titulo;
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        hojas.forEach(function (h) { obsHoja.observe(h); });
    }

    // aparecer al bajar
    var revelar = document.querySelectorAll('.revelar');
    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('visto'); obs.unobserve(e.target); }
            });
        }, { threshold: .15 });
        revelar.forEach(function (el) { obs.observe(el); });
    } else {
        revelar.forEach(function (el) { el.classList.add('visto'); });
    }

    // los planos de abajo empiezan a dibujarse cuando entran a la pantalla
    var porDibujar = document.querySelectorAll('.por-dibujar');
    if ('IntersectionObserver' in window) {
        var obsDibujo = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('dibujar'); obsDibujo.unobserve(e.target); }
            });
        }, { threshold: .35 });
        porDibujar.forEach(function (el) { obsDibujo.observe(el); });
    } else {
        porDibujar.forEach(function (el) { el.classList.add('dibujar'); });
    }

    // numeros en vivo, si la api no responde se quedan los de respaldo
    function poner(id, valor) {
        var el = document.getElementById(id);
        if (el && valor > 0) el.textContent = valor;
    }

    fetch('https://api.github.com/users/' + USUARIO)
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { if (d) poner('c-repos', d.public_repos); })
        .catch(function () {});

    // ojo la busqueda tiene limite bajo sin token, por eso va una sola vez
    fetch('https://api.github.com/search/issues?per_page=1&q=' +
        encodeURIComponent('author:' + USUARIO + ' type:pr is:merged is:public'))
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { if (d) poner('c-prs', d.total_count); })
        .catch(function () {});

    window.PLANO = { usuario: USUARIO };
})();
