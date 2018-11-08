jQuery(document).ready(function($) {
	// toggle menu
	$('.toggle-menu').click(function () {
		$(this).toggleClass('active');
		$('.header-menu').toggleClass('active');
		$('.header-menu.mobile .header-menu__link').click(function (event) {
			event.preventDefault();
			$('.toggle-menu').removeClass('active');
			$('.header-menu').removeClass('active');
		});
	});

	// slick slider
	$('.js-top-slider').slick({
		dots: true,
		arrows: false
	});

	// scroll to section
	$('a[data-target=anchor]').bind('click.smoothscroll', function () {
		var target = $(this).attr('href'),
		bl_top = $(target).offset().top;
		$('body, html').animate({
			scrollTop: bl_top
		}, 700);
		return false;
	});

	// go top
	$('body').append('<a href="#" id="go-top" title="Up"></a>');
	$.fn.scrollToTop = function() {
		$(this).hide().removeAttr("href");
		if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
			var scrollDiv = $(this);
		$(window).scroll(function() {
			if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
				else $(scrollDiv).fadeIn("slow")
			});
		$(this).click(function() {
			$("html, body").animate({scrollTop: 0}, "slow")
		})
	}
	$("#go-top").scrollToTop();

	// from home to what-i-do
	$(window).scroll(function () {
		var st = $(this).scrollTop();
		if ($('#what-i-do').offset().top >= st + 30) {
			$('#home .scroll-down__link').fadeIn('slow');
			$('#what-i-do .scroll-down__link').fadeOut('slow');
		} else if ($('#what-i-do').offset().top <= st + 30) {
			$('#home .scroll-down__link').fadeOut('slow');
			$('#what-i-do .scroll-down__link').fadeIn('slow');
		}
	});
});