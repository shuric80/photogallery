
$('#formz').submit(function(event){
    event.preventDefault();
    data = $('#formz').serialize();
    console.log(data);
    $.ajax({
        type: 'POST',
        url: 'registration',
        data: data,
        success: function(e){
        },
        error: function(e,f){
            console.log('er');}
    })
});

