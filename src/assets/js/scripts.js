$(function(){
// *********************************************  //
// HERO//
// *********************************************  //

var GetHeightHero = function () {
	var self = this;
	this.init = function (){
		self.getUnits();
		self.applyHeight();
	};

	this.getUnits = function() {
		this.ratio = 8;
		this.applyRatio = function(){
			var myratio = $(".hero").data("ratio");
			if (myratio === "full") {
				this.ratio2 = this.ratio;
				return this.ratio2;
			} else if (myratio==="third") {
				this.ratio2 = this.ratio - 1.5;
				return this.ratio2;
			}
		}
		this.myWindow = $(window);
		this.myWindow_height = this.myWindow.height();
		this.myWindow_output = Math.round((this.myWindow_height/this.ratio)*this.applyRatio());
		this.data_position = $(".hero").data("position");
	};

	this.applyHeight = function() {
		$(".hero").css({
			"height": this.myWindow_output + "px",
			"background-position": "center " + this.data_position
		})
	};
};


 	var myHero = new GetHeightHero();
 	myHero.init();

	$(window).on("resize", function (){
 		myHero.init();
	});

// *********************************************  //
// CLAIM WIDTH                                    //
// *********************************************  //

var ClaimWidth = function() {
	var self = this;
	this.claimWidth = $("#hero_claim").data("claim");

	this.init = function(){
		self.applyWidthClaim();
	}

	this.applyWidthClaim = function() {
		$("#hero_claim").css({
			"width": this.claimWidth
		})
	}
}

var myClaim = new ClaimWidth();
myClaim.init();

// *********************************************  //
// SCROLL ANIMATION//
// *********************************************  //
var ScrollAnimation = function () {
	var self = this;
	this.init = function() {
		self.check_if_in_view();
	};
	this.myWindow = $(window);
	this.myAnimation_elements = $('.testimony_item');

	this.check_if_in_view = function() {
	  	var window_height = this.myWindow.height();
	  	var window_top_position = this.myWindow.scrollTop();
	  	var window_bottom_position = (window_top_position + window_height);

	  	$.each(this.myAnimation_elements, function() {
		    var $element = $(this);
		    var element_height = $element.outerHeight();
		    var element_top_position = $element.offset().top;
		    var element_bottom_position = (element_top_position + element_height);

		    if ((element_bottom_position >= window_top_position) &&
		        (element_top_position <= window_bottom_position)) {
		      $element.addClass('in-view');
		    } 
	  	});
	}
}

var myScrollAnimation = new ScrollAnimation();

$(window).on("scroll resize", function (){
 		myScrollAnimation.init();
});
$(window).trigger('scroll');
});

// *********************************************  //
// SECONDARY NAV//
// *********************************************  //

var SedondaryNav = function() {
	var self = this;

	this.header = $("#header");
	this.headerHeight = this.header.height();
	this.secondary = $("#secondary-nav");

	this.init = function() {
		self.toggleSecondaryNav();
	};

	this.toggleSecondaryNav = function() {
		$(document).on("scroll", function() {
			var y = $(this).scrollTop();
			if (y > (self.headerHeight * 2)) {
				self.secondary.addClass("secondary-nav--on");
			} else {
				self.secondary.removeClass("secondary-nav--on");
			}
		})
	};
}

var secondaryNav = new SedondaryNav();
secondaryNav.init();

/*
* FlowType.JS v1.1
* Copyright 2013-2014, Simple Focus http://simplefocus.com/
*
* FlowType.JS by Simple Focus (http://simplefocus.com/)
* is licensed under the MIT License. Read a copy of the
* license in the LICENSE.txt file or at
* http://choosealicense.com/licenses/mit
*
* Thanks to Giovanni Difeterici (http://www.gdifeterici.com/)
*/

(function($) {
   $.fn.flowtype = function(options) {

// Establish default settings/variables
// ====================================
      var settings = $.extend({
         maximum   : 9999,
         minimum   : 1,
         maxFont   : 9999,
         minFont   : 1,
         fontRatio : 35
      }, options),

// Do the magic math
// =================
      changes = function(el) {
         var $el = $(el),
            elw = $el.width(),
            width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
            fontBase = width / settings.fontRatio,
            fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
         $el.css('font-size', fontSize + 'px');
      };

// Make the magic visible
// ======================
      return this.each(function() {
      // Context for resize callback
         var that = this;
      // Make changes upon resize
         $(window).resize(function(){changes(that);});
      // Set changes on load
         changes(this);
      });
   };
}(jQuery));

$('.hero').flowtype({
 minFont : 16,
});