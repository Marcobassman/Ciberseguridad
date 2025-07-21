$(document).ready(function() {

    // --- Lógica para la página de Amenazas ---
    
    // Ocultar/Mostrar información en las tarjetas de amenazas
    $('.btn-toggle-info').on('click', function(e) {
        e.preventDefault(); // Evita que la página salte al principio
        $(this).next('.detailed-info').slideToggle('fast');
        
        // Cambiar el texto del botón
        if ($(this).text() === "Saber más") {
            $(this).text("Ocultar");
        } else {
            $(this).text("Saber más");
        }
    });

    // --- Lógica para la página de Consejos ---

    // Validación del Formulario de Contacto
    $('#contactForm').on('submit', function(e) {
        e.preventDefault(); // Prevenimos el envío real del formulario

        let nombre = $('#nombre').val().trim();
        let email = $('#email').val().trim();
        let mensaje = $('#mensaje').val().trim();
        let formMessages = $('#form-messages');
        let isValid = true;
        
        // Limpiamos mensajes anteriores
        formMessages.html('').removeClass('alert alert-success alert-danger');

        // Validación simple
        if (nombre === '' || email === '' || mensaje === '') {
            formMessages.html('>> ERROR: Todos los campos son obligatorios.').addClass('alert alert-danger');
            isValid = false;
        } else if (!validateEmail(email)) {
            formMessages.html('>> ERROR: El formato del email no es válido.').addClass('alert alert-danger');
            isValid = false;
        }

        if (isValid) {
            formMessages.html('>> TRANSMISIÓN RECIBIDA: Gracias por tu mensaje. Nos pondremos en contacto.').addClass('alert alert-success');
            // Aquí podrías agregar código para enviar el form por AJAX si tuvieras un backend
            $('#contactForm')[0].reset(); // Limpiamos el formulario
        }
    });

    // Función para validar email con una expresión regular simple
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    // Lógica del Modal del Test de Seguridad
    $('#checkTestBtn').on('click', function() {
        let score = 0;
        let q1_answer = $('input[name="q1"]:checked').val();
        let q2_answer = $('input[name="q2"]:checked').val();
        let testFeedback = $('#test-feedback');

        // Limpiamos feedback anterior
        testFeedback.html('').removeClass('alert alert-success alert-warning alert-danger');

        if (q1_answer === undefined || q2_answer === undefined) {
             testFeedback.html('>> Debes responder todas las preguntas.').addClass('alert alert-warning');
             return; // Detenemos la función
        }

        if (q1_answer === '1') {
            score++;
        }
        if (q2_answer === '1') {
            score++;
        }

        if (score === 2) {
            testFeedback.html('>> ¡EXCELENTE! Eres un agente consciente. Sabes cómo moverte en las sombras.').addClass('alert alert-success');
        } else if (score === 1) {
            testFeedback.html('>> VAS BIEN, pero no te confíes. Un solo error puede costarte caro.').addClass('alert alert-warning');
        } else {
            testFeedback.html('>> ALERTA: Eres un blanco fácil. Repasa nuestros consejos. ¡Tu seguridad está en riesgo!').addClass('alert alert-danger');
        }
    });
});