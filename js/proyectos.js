(function () {
    // estado honesto, uso es que se usa de verdad, probado es que paso pruebas, lo demas es lo que dice
    var ESTADOS = {
        uso: 'En uso',
        probado: 'Probado',
        prototipo: 'Prototipo',
        propuesta: 'Propuesta',
        academico: 'Académico'
    };
    var GH = 'https://github.com/Said1Ojeda/';
    var PAGES = 'https://said1ojeda.github.io/';

    var PROYECTOS = [
        { n: 'Mejoras a sistemas en ColdFusion', d: 'Módulos nuevos, pantallas y consultas sobre sistemas que ya están en producción.', s: ['ColdFusion', 'SQL Server', 'JavaScript'], e: 'uso', g: ['trabajo', 'web'] },
        { n: 'Reportes en PDF', d: 'Reportes generados desde ColdFusion con texto justificado y campos largos.', s: ['ColdFusion', 'SQL Server'], e: 'uso', g: ['trabajo', 'web'] },
        { n: 'Sistema de correspondencia', d: 'Registro, asignación y seguimiento de documentos, con correlativos, bitácora y documentos Word generados.', s: ['PHP', 'MySQL', 'JavaScript', 'Power Automate'], e: 'uso', g: ['trabajo', 'web'] },
        { n: 'Cargas de trabajo y plazas', d: 'Convocatorias, plazas, responsables, fases y estados, con filtros, importación CSV y gráficos.', s: ['PHP', 'MySQL', 'DataTables'], e: 'uso', g: ['trabajo', 'web'] },
        { n: 'ConvertDocs', d: 'Comprimir, unir, separar y convertir PDF en el navegador, sin subir los archivos.', s: ['JavaScript', 'PDF.js', 'PDF-Lib'], e: 'uso', g: ['trabajo', 'web'], repo: 'ConvertDocs', web: PAGES + 'ConvertDocs/' },
        { n: 'Asistencia con código QR', d: 'Entrada y salida en eventos escaneando el código o buscando a la persona, con conteo por evento.', s: ['Power Apps', 'SharePoint', 'Power Automate'], e: 'uso', g: ['trabajo', 'power'] },
        { n: 'Reservas de eventos', d: 'Cupos limitados con control de concurrencia y envío del QR por correo, sin reservas duplicadas.', s: ['Power Apps', 'Power Automate', 'SharePoint', 'API REST'], e: 'probado', g: ['trabajo', 'power'] },
        { n: 'Tablero de asistencia', d: 'Registrados, presentes, porcentaje de asistencia e ingresos por franja de hora.', s: ['Excel', 'Fórmulas', 'Gráficos'], e: 'probado', g: ['trabajo', 'excel'] },
        { n: 'Correspondencia en Excel', d: 'El sistema de correspondencia llevado a un libro con macros, con las mismas funciones.', s: ['Excel', 'VBA'], e: 'probado', g: ['trabajo', 'excel'] },
        { n: 'Banco de candidatos y bajas', d: 'Formularios, consultas y niveles de acceso dentro de Excel.', s: ['Excel', 'VBA', 'UserForms'], e: 'probado', g: ['trabajo', 'excel'] },
        { n: 'Reportes con filtros en cascada', d: 'Filtros de varios niveles, gráficos que siguen la selección y exportación.', s: ['Excel', 'VBA', 'SQL'], e: 'probado', g: ['excel'] },
        { n: 'Quiniela del Mundial 2026', d: 'Pronósticos por partido, puntos automáticos y tabla de posiciones.', s: ['Power Apps', 'SharePoint', 'Power Automate'], e: 'prototipo', g: ['power'] },
        { n: 'Calculadoras de ISR', d: 'Cálculos por reglas y escenarios con tablas de parámetros.', s: ['Excel', 'Fórmulas'], e: 'prototipo', g: ['excel'] },
        { n: 'Gestión de una iglesia', d: 'Miembros, expedientes, formación, asistencia, notas y reportes en PDF.', s: ['PHP', 'MySQL', 'PDO', 'Dompdf'], e: 'prototipo', g: ['web'] },
        { n: 'Generador de estampas', d: 'Editor en el navegador para armar estampas y exportarlas como imagen.', s: ['Canvas', 'JavaScript'], e: 'prototipo', g: ['web'] },
        { n: 'JuGeometry', d: 'Juego de ritmo y salto en el navegador, con modos que cambian por portales.', s: ['TypeScript', 'Canvas'], e: 'prototipo', g: ['web'], repo: 'JuGeometry', web: PAGES + 'JuGeometry/' },
        { n: 'Recetas de ColdFusion 8', d: 'Soluciones cortas a problemas de todos los días con ColdFusion 8.', s: ['ColdFusion', 'SQL'], e: 'probado', g: ['web'], repo: 'coldfusion8-recetas' },
        { n: 'Árboles binarios paso a paso', d: 'Inserción, recorridos y rotaciones AVL animados, con modo retos.', s: ['TypeScript'], e: 'academico', g: ['academico', 'web'], repo: 'arbol', web: PAGES + 'arbol/' },
        { n: 'Restaurante Delicias', d: 'Mesas, órdenes, cocina y caja en un solo sistema de escritorio.', s: ['C#', 'WinForms', 'SQL Server'], e: 'academico', g: ['academico'], repo: 'RestauranteDelicias' },
        { n: 'Gestión escolar', d: 'Roles de administrador, docente y alumno, horarios, notas y asistencia.', s: ['PHP', 'MySQL', 'Bootstrap'], e: 'academico', g: ['academico', 'web'] },
        { n: 'Métodos numéricos', d: 'Newton-Raphson, secante, Gauss-Jordan y LU con iteraciones y errores a la vista.', s: ['MATLAB'], e: 'academico', g: ['academico'] },
        { n: 'Estructuras de datos y autómatas', d: 'Pilas, colas, listas, árboles y ejercicios de autómatas.', s: ['C#', 'WinForms'], e: 'academico', g: ['academico'] },
        { n: 'Misión 5S', d: 'Retos por equipo con evidencias y puntos para promover orden en el trabajo.', s: ['Power Platform'], e: 'propuesta', g: ['power'] },
        { n: 'Guía de reclutamiento interno', d: 'Etapas, requisitos y preguntas frecuentes en un solo lugar para quien aplica.', s: ['Documentación', 'UX'], e: 'propuesta', g: ['trabajo'] }
    ];

    var GRUPOS = [
        ['todos', 'Todos'],
        ['trabajo', 'Del trabajo'],
        ['web', 'Web'],
        ['power', 'Power Platform'],
        ['excel', 'Excel y VBA'],
        ['academico', 'Universidad']
    ];

    var cuerpo = document.getElementById('matriz-cuerpo');
    var filtros = document.getElementById('filtros');
    var resumen = document.getElementById('matriz-resumen');
    if (!cuerpo || !filtros) return;

    var cifra = document.getElementById('c-proyectos');
    if (cifra) cifra.textContent = PROYECTOS.length;

    function esc(t) {
        return String(t).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    function enlaces(p) {
        var h = '';
        if (p.web) h += '<a href="' + p.web + '" target="_blank" rel="noopener">Abrir</a>';
        if (p.repo) h += '<a href="' + GH + p.repo + '" target="_blank" rel="noopener">Código</a>';
        if (h) return h;
        return '<span class="privado">' + (p.g.indexOf('trabajo') !== -1 ? 'Privado' : 'Sin publicar') + '</span>';
    }

    function pintar(grupo) {
        var lista = PROYECTOS.filter(function (p) { return grupo === 'todos' || p.g.indexOf(grupo) !== -1; });
        cuerpo.innerHTML = lista.map(function (p) {
            return '<tr>' +
                '<th scope="row"><span class="m-nombre">' + esc(p.n) + '</span><span class="m-desc">' + esc(p.d) + '</span></th>' +
                '<td class="m-stack"><ul class="stack">' + p.s.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></td>' +
                '<td><span class="estado" data-estado="' + p.e + '">' + ESTADOS[p.e] + '</span></td>' +
                '<td class="m-enlaces">' + enlaces(p) + '</td>' +
                '</tr>';
        }).join('');
        if (resumen) resumen.textContent = lista.length === 1 ? '1 proyecto' : lista.length + ' proyectos';
    }

    filtros.innerHTML = GRUPOS.map(function (g, i) {
        return '<button type="button" class="chip" data-grupo="' + g[0] + '" aria-pressed="' + (i === 0) + '">' + g[1] + '</button>';
    }).join('');

    filtros.addEventListener('click', function (ev) {
        var b = ev.target.closest('.chip');
        if (!b) return;
        filtros.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c === b); });
        pintar(b.dataset.grupo);
    });

    pintar('todos');
})();
