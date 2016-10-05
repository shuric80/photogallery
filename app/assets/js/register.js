$(function(){
    $('#form_registration').submit(function(event){
        event.preventDefault();
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

// DOM готова
$(function() {
	var el, newPoint, newPlace, offset;
    // Выбираем все элементы range, для которых будем отслеживать изменения
	$("input[type='range']").change(function() {
	    // Кэшируем значение
	    el = $(this);
	    // Получаем ширину элемента range
	    width = el.width();
	    // Вычисляем процентное положение текущего значения между правой и левой точками элемента
	    newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
	    // Эмпирически вычисленное значение смещения для приподнятого положения указателя
	    offset = 19;
	    // Предотвращаем смещение пузырька за левую или правую границу (для неподдерживающих браузеров)
	    if (newPoint < 0) { newPlace = 0; }
	    else if (newPoint > 1) { newPlace = width; }
	    else { newPlace = width * newPoint + offset; offset -= newPoint; }
	    // Перемещаем пузырек
	    el
	        .next("output")
	        .css({
	            left: newPlace,
	            marginLeft: offset + "%"
	        })
	        .text(el.val());
	})
	// Генерируем событие для позиционирования пузырька
	    .trigger('change');
});
