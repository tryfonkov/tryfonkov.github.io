$(document).ready(function () {
	var $offCanvas = $('[data-toggle="offcanvas"]'),
		$offCanvas2 = $('.row-offcanvas');
		$offCanvas.on('click', clickEvent);
	function clickEvent (event) {
		$offCanvas2.toggleClass('active');
	}
});