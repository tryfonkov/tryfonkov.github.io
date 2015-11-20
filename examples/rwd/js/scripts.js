/*------------------preloader----------------------------*/
$(window).on('load', function () {
	var $preloaderbg = $('.preloader-bg'),
		$preloader   = $preloaderbg.find('.preloader');

	$preloader.fadeOut();
	$preloaderbg.delay(350).fadeOut('slow');

});
/*------------------/preloader----------------------------*/

/*------------------mobile-menu----------------------------*/
var $menu = $('.js-menu'),
	$menuBtn = $('.js-menu-btn'),
	activeCls = 'is-active';

$menuBtn.on('click', function (event) {
	var $this = $(this);

	event.preventDefault();

	if ($this.hasClass(activeCls)) {
		$menu.removeClass(activeCls);
		$this.removeClass(activeCls);
	} else {
		$menu.addClass(activeCls);
		$this.addClass(activeCls);
	};
});
/*------------------/mobile-menu----------------------------*/