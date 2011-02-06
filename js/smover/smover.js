/*
 * SMover 1.0 - jQuery social media plugin
 *
 * Copyright (c) 2010 Ben Everard (http://beneverard.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * * 
 */
(function($){

	$.fn.slideFadeToggle = function(speed, easing, callback) {
		return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);  
	};
	
	$.fn.extend({ 

		smover: function(options) {

			var defaults = {				
				titleElement  : 'span',
				linksElement  : 'ul',
				fillerText    : ' on ',
				mouseoutDelay : 500
			};
			
			// merge the passed options with the defaults
			var options = $.extend({}, defaults, options);

			// loop through each element we're bound to
			$(this).each(function() {
				
				/* set element vars */
				var $self = $(this);
				var $title = $(options.titleElement,$self);
				var $links = $(options.linksElement,$self);

				/* set the original title text */
				var title_text = $title.html();
				
				/* append ... to the end of the title */
				$title.html(title_text+"...");
 				
 				/* bind the various events */
				$self.hoverIntent({    
					over: function() { 
						$links.slideFadeToggle('slow');
					},
					timeout: options.mouseoutDelay,    
					out: function() {
						$links.slideFadeToggle('slow');
					}
				});
				
				$('a',$self).hover(
					function () {
						$title.html(title_text+options.fillerText+$(this).attr('title'));
					}, 
					function () {
						$title.html(title_text+"...");
					}
				);
				
				$('a',$self).click(function (event) {
					event.stopPropagation();
				});
			
			});
		}
	});

})(jQuery);