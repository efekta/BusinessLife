$(document).ready(function() {
    if ($('.container').width() > 720) {
    } else {
        $('form.gorizontal').removeClass('gorizontal').addClass('vertical');
    }
    $('input[name="phone"]').mask("+7(999) 999-9999");
});