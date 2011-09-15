 /*!
 * SMover, a jQuery social media plugin
 *
 * Version 1.1 (14/09/2011)
 *
 * Copyright (C) 2011 Ben Everard
 *
 * http://beneverard.github.com/SMover
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *     
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