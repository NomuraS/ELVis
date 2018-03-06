
/**
 * Functionality specific to Bushwick.
 *
 * Provides helper functions to enhance the theme experience.
 */

( function( $ ) {

	/**
	 * Masonry.
	 */
	$( window ).on('load', function() {

		var widgets_area = $( '.widget-container' );

		$( '.widget-handle' ).on( 'click.bushwick', function( event ) {
			event.preventDefault();
			$( this ).toggleClass( 'open' );

			// Remove mejs players from sidebar
			$( '#secondary .mejs-container' ).each( function( i, el ) {
				if ( mejs.players[ el.id ] ) {
					mejs.players[ el.id ].remove();
				}
			} );

			if( $( this ).hasClass( 'open' ) ) {
				$( '#secondary' ).slideDown( 300 );
				// Trigger resize to make sure widgets fit prefectly.
				$( this ).trigger( 'resize' );
				// Masonry blocks
				// widgets_area.imagesLoaded( function() {
				// 	widgets_area.masonry( {
				// 		itemSelector: '.widget',
				// 		gutter: 0,
				// 		transitionDuration: 0,
				// 		isOriginLeft: ! $( 'body' ).is( '.rtl' )
				// 	} );
				// } );

				// Re-initialize mediaelement players.
				setTimeout( function() {
					if ( window.wp && window.wp.mediaelement ) {
						window.wp.mediaelement.initialize();
					}
				} );

				// Trigger resize event to display VideoPress player.
				setTimeout( function(){
					if ( typeof( Event ) === 'function' ) {
						window.dispatchEvent( new Event( 'resize' ) );
					} else {
						var event = window.document.createEvent( 'UIEvents' );
						event.initUIEvent( 'resize', true, false, window, 0 );
						window.dispatchEvent( event );
					}
				} );
			} else {
				$( '#secondary' ).slideUp( 300 );
			}
		} );

		// $( '#404-widgets' ).masonry( {
		// 	itemSelector: '.widget',
		// 	gutter: 0,
		// 	transitionDuration: 0,
		// 	isOriginLeft: ! $( 'body' ).is( '.rtl' )
		// } );

		$( window ).resize( function () {

			// Force layout correction after 1500 milliseconds
			// setTimeout( function () {
			// 	widgets_area.masonry();
			// }, 1500 );

		} );

	} );

	/**
	 * Wrap entry title if too many characters.
	 */
	$( window ).on('load', function() {
		var count = $( '.single .entry-title' ).text().length;
		if ( count > 150 ) {
			$( '.single .entry-title' ).wrapInner( '<small />' );
		}
	} );

	/**
	 * Enables menu toggle for small screens.
	 */
	( function() {
		var container, button, menu;

		container = document.getElementById( 'site-navigation' );
		if ( ! container )
			return;

		button = container.getElementsByTagName( 'h1' )[0];
		if ( 'undefined' === typeof button )
			return;

		menu = container.getElementsByTagName( 'ul' )[0];

		// Hide menu toggle button if menu is empty and return early.
		if ( 'undefined' === typeof menu ) {
			button.style.display = 'none';
			return;
		}

		if ( -1 === menu.className.indexOf( 'nav-menu' ) )
			menu.className += ' nav-menu';

		button.onclick = function() {
			if ( -1 !== container.className.indexOf( 'toggled' ) )
				container.className = container.className.replace( ' toggled', '' );
			else
				container.className += ' toggled';
		};

	// Fix child menus for touch devices.
	function fixMenuTouchTaps( container ) {
		var touchStartFn,
		parentLink = container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		if ( 'ontouchstart' in window ) {
			touchStartFn = function( e ) {
				var menuItem = this.parentNode;

				if ( ! menuItem.classList.contains( 'focus' ) ) {
					e.preventDefault();
					for( var i = 0; i < menuItem.parentNode.children.length; ++i ) {
						if ( menuItem === menuItem.parentNode.children[i] ) {
							continue;
						}
						menuItem.parentNode.children[i].classList.remove( 'focus' );
					}
					menuItem.classList.add( 'focus' );
				} else {
					menuItem.classList.remove( 'focus' );
				}
			};

			for ( var i = 0; i < parentLink.length; ++i ) {
				parentLink[i].addEventListener( 'touchstart', touchStartFn, false );
			}
		}
	}

	fixMenuTouchTaps( container );
	} )();

	$( '.navigation-main' ).find( 'a' ).on( 'focus blur', function() {
 		$( this ).parents().toggleClass( 'focus' );
 	} );

	/**
	 * Makes "skip to content" link work correctly in IE9 and Chrome for better
	 * accessibility.
	 *
	 * @link http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
	 */
	$( window ).on( 'hashchange.bushwick', function() {
		var element = document.getElementById( location.hash.substring( 1 ) );

		if ( element ) {
			if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) )
				element.tabIndex = -1;

			element.focus();
		}
	} );

	/**
	 * Adds a class .home-link class to the navigation list item containing the home link.
	 */

} )( jQuery );	
