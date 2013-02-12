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
};

var methods = {
	init: function(){
		
		$(this).addClass("easytoggle-contain");
		$(this).find('span').hide()
		$(this).find('input').hide();
		
		if($(this).find("input").is(':disabled'))
		{
			
			$(this).append('<ul><li>'+$(this).find('span').text()+'</li></ul>​');
			$(this).find('ul > li:first-child').addClass('easytoggle-disabled');
			return true;
		}
		
		
		$(this).append('<ul><li>'+settings['onButtonText']+'</li><li>'+settings['offButtonText']+'</li></ul>​');
		
		if($(this).find('input').is(':checked'))
			$(this).find("ul > li:first-child").addClass('easytoggle-on');
		else
			$(this).find("ul > li:last-child").addClass('easytoggle-off');
			
		
	},
};


$.fn.easyToggle = function( options ) {
	
	settings = $.extend( settings, options);
	
	return this.each(function() {
		var $this = $(this);
		var input = $this.find("input");
		methods.init.call(this);
		
		if(input.is(':disabled'))
		{
			return true;	
		}
		
		
		
		$this.find('ul > li').click(function(){
		
			if(!$(this).hasClass('easytoggle-on') && !$(this).hasClass('easytoggle-off') && !input.is(':disabled'))
			{	
				if(settings.confirm)
				{
					if(!confirm(settings.confirmText))
						return false;
				}
				
				input.trigger('click');
				$(this).removeClass("easytoggle-on easytoggle-off");
				
				if(input.is(':checked'))
				{
					$(this).next().removeClass("easytoggle-on easytoggle-off");
					$(this).addClass("easytoggle-on");
					input.attr('checked','checked');
				}
				else
				{
					$(this).prev().removeClass("easytoggle-on easytoggle-off");
					$(this).addClass("easytoggle-off");
					input.removeAttr('checked');
				}
				if(settings.after)
					settings.after.call($this);
			}
		});	
	});
};

})( jQuery );
