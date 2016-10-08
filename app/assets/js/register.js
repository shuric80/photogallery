$(function(){
    $('#form_registration').submit(function(event){
        event.preventDefault();
        data = $('#form_registration').serialize();
        $.ajax({
            type: 'POST',
            url: '/event/registration',
            data: data,
            success: function(e){
                bootbox.alert({
                    title:'Registration',
                    message: '<h4>Thank you! Wait confirm email</h4>',
                    size:'small',
                    callback: function(){
                        $("#form_registration").find("input, textarea").val("");
                    }
                });
            },
            error: function(e,f){
                bootbox.alert({
                    title:'Error!',
                    message:'<h4>You are not registration</h4>',
                    size:'small'
                });

            }
        });
    });
});

