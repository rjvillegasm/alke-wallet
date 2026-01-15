

// filtrado de transacciones de la pantalla transactions

$(document).ready(function () {
    console.log("Filtro con clases CSS");

    // la función remueve o agrega la clase hidden-transaction
    // la clase contiene un display none 

    $('input[name="filter"]').change(function () {
        var filter = $(this).attr('id');
        console.log("Filtrando: " + filter);

        // Remover clase hidden de todos (niega el display none)
        $('.transaction-item').removeClass('hidden-transaction');

        //Agrega clase hidden de todos ( habilita display none)
        if (filter === 'deposits') {
            // Oculta enviados
            $('.send').closest('.transaction-item').addClass('hidden-transaction');
        }
        else if (filter === 'sent') {
            // Oculta depositos
            $('.deposit').closest('.transaction-item').addClass('hidden-transaction');
        }
        // ALL  no hace nada porque removimos la clase al principio
    });
});

// simula carga en en pantalla transacciones

$(document).ready(function () {
    $('.btn-purple').click(function (e) {
        e.preventDefault();

        var $btn = $(this);
        var originalText = $btn.html();

        // Muestra el spinner
        $btn.html('<span class="spinner-border spinner-border-sm me-2"></span>Cargando...');
        $btn.prop('disabled', true);

        // Simular carga
        setTimeout(function () {

            $btn.html(originalText);
            $btn.prop('disabled', false);


            alert('Más transacciones cargadas (simulado)');
        }, 2000);
    });
});

// valida negativos en enviar dinero

$(document).ready(function () {
    $('#form-send-money').on('submit', function (event) {
        var monto = $('#amount').val();
        var montoNumero = parseFloat(monto);

        if (monto && montoNumero <= 0) {
            // Cambia  mensaje de Bootstrap
            $('#amount')[0].setCustomValidity('El monto debe ser mayor a 0');
            $('#amount')[0].reportValidity();
            event.preventDefault();
        } else {
            $('#amount')[0].setCustomValidity('');
        }
    });
});

//valida negativos en deposit

$('#form-deposit').on('submit', function(event) {
    var monto = $('#amount').val(); // Mismo ID que sendmoney
    var montoNumero = parseFloat(monto);
    
    if (monto && montoNumero <= 0) {
        $('#amount')[0].setCustomValidity('El monto debe ser mayor a 0');
        $('#amount')[0].reportValidity();
        event.preventDefault();
    } else {
        $('#amount')[0].setCustomValidity('');
    }
});

// confirmación al realizar depósito
$('#form-deposit').submit(function (e) {
    e.preventDefault();

    var monto = $('#amount').val();

    if (confirm("¿Confirmar depósito de $" + monto + "?")) {

        window.location.href = "transactions.html";
    }

});