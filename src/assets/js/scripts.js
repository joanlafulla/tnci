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
	this.myAnimation_elements = $('.testimony_item, .recomended');

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

// *********************************************  //
// UP //
// *********************************************  //
    function smk_jump_to_it( _selector, _speed ){
        _speed = parseInt(_speed, 10) === _speed ? _speed : 300;
        $( _selector ).on('click', function(event){
            event.preventDefault();
            var url = $(this).attr('href'); //cache the url.
 
            // Animate the jump
            $("html, body").animate({ 
                scrollTop: parseInt( $(url).offset().top ) - 50
            }, _speed);
        });
    }

    smk_jump_to_it( '.up_link', 500);

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

$("[data-more]").on("click", function(e){
	e.preventDefault();
	var target = $(this).data("more");
	var target_item = $("[data-more-item='" + target + "']");
	var target_item_class = $(this).data("animation");
	var target_add_data = target_item.attr("data-direction", target_item_class);
	target_item.addClass(target_item_class);
	function be_visible() {
		target_item.find("div").addClass("be-visible");
		target_item.find(".products-content-more-close").addClass("be-visible");
		target_item.find("#badgetCRM").addClass("be-visible");
	}
	setTimeout(be_visible, 550);
	
});

$(".products-content-more-close").on("click", function(e) {
	e.preventDefault();
	var target = $(this).closest("div");
	var class_to_remove = target.data("direction");
	$(this).next().removeClass("be-visible");
	$(this).removeClass("be-visible");
	$("#badgetCRM").removeClass("be-visible");
	function closePanel () {
		target.removeClass(class_to_remove);	
	}
	setTimeout(closePanel, 250);
});

$("[data-link]").on("click", function(e){
	e.preventDefault();
	var modalTarget = $(this).attr("data-link");
	var modal = $("#" + modalTarget);
	modal.toggleClass("be-visible");
	console.log(modal);
});

$("[data-close]").on("click", function(e){
	e.preventDefault();
	var modalCloseTarget = $(this).attr("data-close");
	var modalClose = $("#" + modalCloseTarget);
	modalClose.toggleClass("be-visible");
	console.log(modalClose);
});



