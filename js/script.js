jQuery(document).ready(function($) {


	$('body').bind('touchmove', function(e) {
		// if($('#content').scrollTop() === 0){
		// }
		if(!$(e.target).parents('#content').length) {
			e.preventDefault();
		}
	});

	/** OVERDROP **/

	function overDropMenu(element, margin) {

		// margin = typeof margin !== 'undefined' ? margin : 20;

		if(typeof(margin) !== 'number'){
			margin = 10;
		}

		var $element		=		$(element),
			elementHeight	=		null,
			$lis			=		null,
			oDButtonClass	=		'dropit',
			oDButtonElement	=		'<div class="'+oDButtonClass+'"></div>',
			$oDMenu		=		null,
			oDTimeOut		=		null,
			highestOffset	=		null,
			droppedArray	=		[];

		$element.append(oDButtonElement);
		

		//Set up the hover box and hide the button initially
		$element.find('.'+oDButtonClass).hide().append('<div id="overdrop_menu"><ul></ul></div>');
		$oDMenu = $element.find('#overdrop_menu');
		$oDMenuUl = $oDMenu.find('ul');

		doButtonAction(0);

		$(window).bind('resize', doButtonAction);

		bindHovers();

		function bindHovers () {

			var config = {
				over: showDropdown, // function = onMouseOver callback (REQUIRED)
				timeout: 500, // number = milliseconds delay before onMouseOut
				out: hideDropdown // function = onMouseOut callback (REQUIRED)
			};

			$element.find('.'+oDButtonClass).hoverIntent( config );

			function showDropdown() {
				$oDMenu.show();
			}
			function hideDropdown() {
				$oDMenu.hide();
			}

		}

		function doButtonAction (delay) {

			showOverflownElements();

			if(typeof(delay) !== 'number'){
				delay = 300;
			}
			clearTimeout(oDTimeOut);

			oDTimeOut =setTimeout(function(){

				$element		=		$(element), //nav
				elementHeight	=		parseInt($element.outerHeight(),0), //nav
				$lis			=		$element.find('li'), //ul
				$dOButtonSel	=		$element.find('.'+oDButtonClass),
				highestOffset	=		0;


				$lis.each(function() {
					var	$currentLi		=		$(this),
						liOffset		=		$currentLi.position().top;

					if( liOffset > highestOffset ){
						highestOffset = liOffset;
					} else  {
						highestOffset = highestOffset;
					}

				});

				console.log(highestOffset);


				if( highestOffset > elementHeight-20  ) {
					$element.find('.'+oDButtonClass).show();
				} else {
					$element.find('.'+oDButtonClass).hide();
				}

				// showOverflownElements();

			},delay);


		}

		function showOverflownElements () {

			$oDMenuUl.html('');
			droppedArray		=		[],
			$lis				=		$(element).find('li'),
			highestOffset		=		0;

			$lis.each(function() {

				var $currentLi		=		$(this),
					liOffset		=		$currentLi.position().top;

				if( liOffset > highestOffset ){
					droppedArray.push($currentLi.clone());
				}
			});

			$oDMenuUl.html(droppedArray);

		}


	}


	overDropMenu('nav');

});