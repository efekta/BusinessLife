$(document).ready(function() {
    if ($('.container').width() > 720) {
    } else {
        $('form.gorizontal').removeClass('gorizontal').addClass('vertical');
    }
    $('input[name="phone"]').mask("+7(999) 999-9999");
});

//slider
$(document).ready(function() {
        $('.speakers-slider').slick({
        	arrows: false,
          dots: false,
          infinite: false,
          speed: 300,
          slidesToShow: 6,
				  slidesToScroll: 1,
				  autoplay: true,
				  autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
});