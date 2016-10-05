$(function(){
    $('#form_registration').submit(function(event){
         event.preventDefault();
        var value = $('.range').getValue();
        console.log(value);
        data = $('#form_registration').serialize();
        $.ajax({
            type: 'POST',
            url: 'registration',
            data: data,
            success: function(e){
            },
            error: function(e,f){
                console.log('error');
            }
        });
    });
});

