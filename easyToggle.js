/* 
Written by Andrew Throener
My first Jquery plugin
*/

(function( $ ) {

var settings =  {
	      'onButtonText'		: 'ON',
	      'offButtonText'		: 'OFF',
	      'confirm'			: false,
	      'confirmText'		: 'Are you sure?',
	      'disabledText'		: 'Disabled',
};

var methods = {
	init: function(){
		var container = $(this);
		container.addClass("easytoggle-contain");
		container.find('span').hide()
		container.find('input').hide();
		
		container.find("input").each(function(){		
			$(this).wrap('<div class="toggle-contain"></div>');
			
			
			if($(this).is(':disabled'))
			{
				$(this).after('<ul><li class="easytoggle-disabled">'+settings['disabledText']+'</li></ul>​');	
				
			}
			else
			{
	
				$(this).after('<ul><li '+(($(this).is(':checked')) ? ' class="easytoggle-on" ' : '' )+'>'+settings['onButtonText']+'</li><li '+((!$(this).is(':checked')) ? ' class="easytoggle-off" ' : '' )+'>'+settings['offButtonText']+'</li></ul>​');
			}
		
			
			
			
		});	
		
		//Setup click functions for li tags
		container.find("div.toggle-contain").each(function(){
			var single = $(this);
			single.find("ul > li").each(function(){
				
				console.log(single);
				$(this).click(function(){
					if(settings.confirm)
					{
						if(!confirm(settings.confirmText))
							return false;
					}
				
				
					methods.etoggle.call(this,single);
				
				});
			});
		
		});
	},
	
	etoggle: function(contain){
		var input = contain.find('input');
		if(input.is(':checked'))
		{
			contain.find('ul > li').attr('class','');
			contain.find('ul > li:last-child').attr('class','easytoggle-off');
			input.removeAttr('checked');
			
			
		}
		else
		{
			contain.find('ul > li').attr('class','');
			contain.find('ul > li:first-child').attr('class','easytoggle-on');
			input.attr('checked','checked');
		}
		
		if(settings.after)
			settings.after.call($this);
	},
};


$.fn.easyToggle = function( options ) {
	
	settings = $.extend( settings, options);
	
	return this.each(function() {
		
		methods.init.call(this);
	});
};

})( jQuery );
