(function () {
    var USUARIO = 'Said1Ojeda';
    var lista = document.getElementById('bitacora');
    var estado = document.getElementById('lab-estado');
    if (!lista) return;

    var COLORES = {
        JavaScript: '#f1e05a', TypeScript: '#3178c6', PHP: '#8892bf', 'C#': '#68217a',
        HTML: '#e34c26', CSS: '#7c5bd6', Python: '#3572a5', Java: '#b07219',
        ColdFusion: '#7ab5d6', MATLAB: '#e16737'
    };

    // por si la api no responde o se acaba el limite, se ve algo igual
    var RESPALDO = [
        { name: 'POrtafolioDigiSaid', description: 'Este portafolio', language: 'CSS', has_pages: true },
        { name: 'ConvertDocs', description: 'Herramientas PDF en el navegador, sin subir tus archivos', language: 'JavaScript', has_pages: true },
        { name: 'arbol', description: 'Árboles binarios y AVL paso a paso, con modo retos', language: 'TypeScript', has_pages: true },
        { name: 'JuGeometry', description: 'Juego de ritmo y salto en el navegador', language: 'TypeScript', has_pages: true },
        { name: 'coldfusion8-recetas', description: 'Soluciones cortas con ColdFusion 8', language: 'ColdFusion' },
        { name: 'RestauranteDelicias', description: 'Sistema de restaurante en C# y SQL Server', language: 'C#' }
    ];

    function esc(t) {
        return String(t || '').replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    function fecha(iso) {
        if (!iso) return '';
        var d = new Date(iso);
        var op = { day: 'numeric', month: 'short' };
        if (d.getFullYear() !== new Date().getFullYear()) op.year = 'numeric';
        return '<time datetime="' + iso + '">' + d.toLocaleDateString('es-GT', op).replace('.', '') + '</time>';
    }

    function pintar(repos) {
        lista.innerHTML = repos.map(function (r) {
            var lengua = r.language
                ? '<span class="lengua" style="--color-lengua:' + (COLORES[r.language] || '') + '">' + esc(r.language) + '</span>'
                : '';
            var pages = r.has_pages
                ? '<a href="https://' + USUARIO.toLowerCase() + '.github.io/' + encodeURIComponent(r.name) + '/" target="_blank" rel="noopener">Abrir</a>'
                : '';
            var f = fecha(r.pushed_at);
            return '<li' + (f ? '' : ' class="sin-fecha"') + '>' + f +
                '<div><a class="repo" href="https://github.com/' + USUARIO + '/' + encodeURIComponent(r.name) + '" target="_blank" rel="noopener">' + esc(r.name) + '</a>' +
                (r.description ? '<p>' + esc(r.description) + '</p>' : '') + '</div>' +
                '<div class="lado">' + lengua + pages + '</div>' +
                '</li>';
        }).join('');
    }

    fetch('https://api.github.com/users/' + USUARIO + '/repos?sort=pushed&per_page=100')
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (repos) {
            var propios = repos.filter(function (r) { return !r.fork && r.name !== USUARIO; });
            pintar(propios.slice(0, 8));
            estado.textContent = 'En vivo desde GitHub, ' + propios.length + ' repos públicos';
        })
        .catch(function () {
            pintar(RESPALDO);
            estado.textContent = 'GitHub no respondió, va una lista guardada';
        });
})();
