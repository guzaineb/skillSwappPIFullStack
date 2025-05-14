/*
Author       : Dreamguys
Template Name: Dreams LMS - Bootstrap Template
Version      : 1.0
*/

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
(function($) {
    "use strict";

    var $slimScrolls = $('.slimscroll');

    // Stick Sidebar
	
	if ($(window).width() > 767) {
		if($('.theiaStickySidebar').length > 0) {
			$('.theiaStickySidebar').theiaStickySidebar({
			  // Settings
			  additionalMarginTop: 70
			});
		}
	}
		
	if($('.toggle-password').length > 0) {
		$(document).on('click', '.toggle-password', function() {
<<<<<<< HEAD
=======
(function ($) {
	"use strict";

	var $slimScrolls = $('.slimscroll');

	// Stick Sidebar

	if ($(window).width() > 767) {
		if ($('.theiaStickySidebar').length > 0) {
			$('.theiaStickySidebar').theiaStickySidebar({
				// Settings
				additionalMarginTop: 70
			});
		}
	}

	if ($('.toggle-password').length > 0) {
		$(document).on('click', '.toggle-password', function () {
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
			$(this).toggleClass("feather-eye feather-eye-off");
			var input = $(".pass-input");
			if (input.attr("type") == "password") {
				input.attr("type", "text");
			} else {
				input.attr("type", "password");
			}
		});
	}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	
	// Sidebar
	
	if($(window).width() <= 991){
	var Sidemenu = function() {
		this.$menuItem = $('.main-nav a');
	};
	
	function init() {
		var $this = Sidemenu;
		$('.main-nav a').on('click', function(e) {
			if($(this).parent().hasClass('has-submenu')) {
				e.preventDefault();
			}
			if(!$(this).hasClass('submenu')) {
				$('ul', $(this).parents('ul:first')).slideUp(350);
				$('a', $(this).parents('ul:first')).removeClass('submenu');
				$(this).next('ul').slideDown(350);
				$(this).addClass('submenu');
			} else if($(this).hasClass('submenu')) {
				$(this).removeClass('submenu');
				$(this).next('ul').slideUp(350);
			}
		});
	}

	// Sidebar Initiate
	
	init();
	}
	
	// Icon Btn
	
	$('.course-share .fa-heart').on('click', function (e) {
		e.preventDefault();
      	$(this).toggleClass('color-active');
    });
	
	// Toggle
	
	if($('#edit-rating').length > 0) {
<<<<<<< HEAD
=======

	// Sidebar

	if ($(window).width() <= 991) {
		var Sidemenu = function () {
			this.$menuItem = $('.main-nav a');
		};

		function init() {
			var $this = Sidemenu;
			$('.main-nav a').on('click', function (e) {
				if ($(this).parent().hasClass('has-submenu')) {
					e.preventDefault();
				}
				if (!$(this).hasClass('submenu')) {
					$('ul', $(this).parents('ul:first')).slideUp(350);
					$('a', $(this).parents('ul:first')).removeClass('submenu');
					$(this).next('ul').slideDown(350);
					$(this).addClass('submenu');
				} else if ($(this).hasClass('submenu')) {
					$(this).removeClass('submenu');
					$(this).next('ul').slideUp(350);
				}
			});
		}

		// Sidebar Initiate

		init();
	}

	// Icon Btn

	$('.course-share .fa-heart').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('color-active');
	});

	// Toggle

	if ($('#edit-rating').length > 0) {
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
		$('#edit-rating').on('click', function () {
			$('.publish-rate').toggle('1000');
			$('.stip-grp').toggle('1000');
		});
	}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	
	// JQuery counterUp

	if($('.course-count .counterUp').length > 0) {
		$('.course-count .counterUp, .course-inner-content h4 span, .rate-head span, .rate-head-five h2 span').counterUp({
            delay: 15,
            time: 1500
        });
	}
	
	// Mobile menu sidebar overlay
	
	$('.header-fixed').append('<div class="sidebar-overlay"></div>');
	$(document).on('click', '#mobile_btn', function() {
<<<<<<< HEAD
=======

	// JQuery counterUp

	if ($('.course-count .counterUp').length > 0) {
		$('.course-count .counterUp, .course-inner-content h4 span, .rate-head span, .rate-head-five h2 span').counterUp({
			delay: 15,
			time: 1500
		});
	}

	// Mobile menu sidebar overlay

	$('.header-fixed').append('<div class="sidebar-overlay"></div>');
	$(document).on('click', '#mobile_btn', function () {
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
		$('main-wrapper').toggleClass('slide-nav');
		$('.sidebar-overlay').toggleClass('opened');
		$('html').addClass('menu-opened');
		return false;
	});
<<<<<<< HEAD
<<<<<<< HEAD
	
	$(document).on('click', '.sidebar-overlay', function() {
=======

	$(document).on('click', '.sidebar-overlay', function () {
>>>>>>> origin/tasks
=======
	
	$(document).on('click', '.sidebar-overlay', function() {
>>>>>>> origin/meeting
		$('html').removeClass('menu-opened');
		$(this).removeClass('opened');
		$('main-wrapper').removeClass('slide-nav');
	});
<<<<<<< HEAD
<<<<<<< HEAD
	
	$(document).on('click', '#menu_close', function() {
=======

	$(document).on('click', '#menu_close', function () {
>>>>>>> origin/tasks
=======
	
	$(document).on('click', '#menu_close', function() {
>>>>>>> origin/meeting
		$('html').removeClass('menu-opened');
		$('.sidebar-overlay').removeClass('opened');
		$('main-wrapper').removeClass('slide-nav');
	});
<<<<<<< HEAD
<<<<<<< HEAD
	
	// Select 2
	
=======

	// Select 2

>>>>>>> origin/tasks
=======
	
	// Select 2
	
>>>>>>> origin/meeting
	if ($('.select').length > 0) {
		$('.select').select2({
			minimumResultsForSearch: -1,
			width: '100%'
		});
	}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	
	// tooltip
	
	$(document).ready(function(){
		$('[data-bs-toggle="tooltip"]').tooltip();   
	});

	//feather.replace()
	
	// Home popular mentor slider

	if($('.owl-carousel.mentoring-course').length > 0 ){
		var owl = $('.owl-carousel.mentoring-course');
	      	owl.owlCarousel({
	        margin: 25,
	        nav : false,
	        nav: true,
	        loop: true,
	        responsive: {
	          	0: {
	            	items: 1
	          	},
	          	768 : {
	            	items: 3
	          	},
	          	1170: {
	            	items: 4
	          	}
	        }
	    });
    }

	// Home Three Choose favourite Course from top Category

	if($('.owl-carousel.home-three-favourite-carousel').length > 0 ){
		var owl = $('.owl-carousel.home-three-favourite-carousel');
			  owl.owlCarousel({
			margin: 24,
			nav : false,
			nav: true,
			loop: true,
			responsive: {
				  0: {
					items: 1
				  },
				  500:{
					items:1,
					
				},
				768:{
					items:1,
					
				},
				900:{
					items:2,
					
				},
				1000:{
					items:3,
					
				},
				1300:{
					items:5,
					
<<<<<<< HEAD
=======

	// tooltip

	$(document).ready(function () {
		$('[data-bs-toggle="tooltip"]').tooltip();
	});

	//feather.replace()

	// Home popular mentor slider

	if ($('.owl-carousel.mentoring-course').length > 0) {
		var owl = $('.owl-carousel.mentoring-course');
		owl.owlCarousel({
			margin: 25,
			nav: false,
			nav: true,
			loop: true,
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 3
				},
				1170: {
					items: 4
=======
>>>>>>> origin/meeting
				}
			}
		});
	}
<<<<<<< HEAD

	// Home Three Choose favourite Course from top Category

	if ($('.owl-carousel.home-three-favourite-carousel').length > 0) {
		var owl = $('.owl-carousel.home-three-favourite-carousel');
		owl.owlCarousel({
			margin: 24,
			nav: false,
			nav: true,
			loop: true,
			responsive: {
				0: {
					items: 1
				},
				500: {
					items: 1,

				},
				768: {
					items: 1,

				},
				900: {
					items: 2,

				},
				1000: {
					items: 3,

				},
				1300: {
					items: 5,

>>>>>>> origin/tasks
				}
			}
		});
	}
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	
	// Home Three Most Trending Courses

	if($('.owl-carousel.home-three-trending-course').length > 0 ){
		var owl = $('.owl-carousel.home-three-trending-course');
			  owl.owlCarousel({
			margin: 25,
			nav : true,
			nav: true,
			loop: true,
			responsive: {
				  0: {
					items: 1
				  },
				  500:{
					items:1,
					
				},
				768:{
					items:1,
					
				},
				1000:{
					items:3,
					
				},
				1300:{
					items:4,
					
<<<<<<< HEAD
=======

	// Home Three Most Trending Courses

	if ($('.owl-carousel.home-three-trending-course').length > 0) {
		var owl = $('.owl-carousel.home-three-trending-course');
		owl.owlCarousel({
			margin: 25,
			nav: true,
			nav: true,
			loop: true,
			responsive: {
				0: {
					items: 1
				},
				500: {
					items: 1,

				},
				768: {
					items: 1,

				},
				1000: {
					items: 3,

				},
				1300: {
					items: 4,

>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
				}
			}
		});
	}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
    // Treand Course

	if($('.owl-carousel.trending-course').length > 0 ){
		var owl = $('.owl-carousel.trending-course');
	      	owl.owlCarousel({
	        margin: 24,
	        nav : false,
	        nav: true,
	        loop: true,
	        responsive: {
	          	0: {
	            	items: 1
	          	},
	          	768 : {
	            	items: 2
	          	},
	          	1170: {
	            	items: 3
	          	}
	        }
	    });
    }

    // Leading Companies

	if($('.owl-carousel.lead-group-slider').length > 0 ){
		var owl = $('.owl-carousel.lead-group-slider');
      		owl.owlCarousel({
			margin: 24,
			nav : false,
			dots: false,
			loop: true,
			autoplay:false,
			autoplaySpeed: 2000,
		    responsive: {
	          0: {
            	items: 3,
				nav : false,
				dots: false,
	        },
	        768 : {
            	items: 3,
				nav : false,
				dots: false,
	        },
          	1170: {
            	items: 6,
				dots: false,
          		}
    		}
	   });
    }

	// Leading Companies

	if($('.owl-carousel.leading-univercities').length > 0 ){
		var owl = $('.owl-carousel.leading-univercities');
		  	owl.owlCarousel({
	 		margin: 24,
	        nav : false,
			dot: false,
	        loop: true,
			autoplay:false,
			autoplaySpeed: 2000,
		    responsive: {
		        0: {
		           items: 3
		        },
	          	768 : {
	            	items: 3
	          	},
	          	1170: {
	            	items: 5
	          	}
	    	}
<<<<<<< HEAD
=======
	// Treand Course

	if ($('.owl-carousel.trending-course').length > 0) {
		var owl = $('.owl-carousel.trending-course');
		owl.owlCarousel({
			margin: 24,
			nav: false,
			nav: true,
			loop: true,
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 2
				},
				1170: {
					items: 3
				}
			}
		});
	}

	// Leading Companies

	if ($('.owl-carousel.lead-group-slider').length > 0) {
		var owl = $('.owl-carousel.lead-group-slider');
		owl.owlCarousel({
			margin: 24,
			nav: false,
			dots: false,
			loop: true,
			autoplay: false,
			autoplaySpeed: 2000,
			responsive: {
				0: {
					items: 3,
					nav: false,
					dots: false,
				},
				768: {
					items: 3,
					nav: false,
					dots: false,
				},
				1170: {
					items: 6,
					dots: false,
				}
			}
		});
	}

	// Leading Companies

	if ($('.owl-carousel.leading-univercities').length > 0) {
		var owl = $('.owl-carousel.leading-univercities');
		owl.owlCarousel({
			margin: 24,
			nav: false,
			dot: false,
			loop: true,
			autoplay: false,
			autoplaySpeed: 2000,
			responsive: {
				0: {
					items: 3
				},
				768: {
					items: 3
				},
				1170: {
					items: 5
				}
			}
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
		});
	}

	// Leading Slider

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.owl-carousel.leading-slider-five').length > 0 ){
		var owl = $('.owl-carousel.leading-slider-five');
	      	owl.owlCarousel({
	        margin: 24,
			nav : false,
			loop: true,
			dots:false,
			autoplay:false,
	        responsive: {
	      	0: {
	        	items: 2
	      	},
	      	768 : {
	        		items: 3
	      	},
	      	1170: {
	        	items: 3
	      	},
			1300: {
				items: 4
			  }
			}
		});
   	}
	
	// Top Category Slider

	if($('.top-category-slider').length > 0) {
		$('.top-category-slider').owlCarousel({
			loop:true,
			margin:15,
			dots:false,
			nav:true,
			navText: [ '<i class="fas fa-chevron-left custom-arrow"></i>', '<i class="fas fa-chevron-right custom-arrow"></i>' ], 
			responsive:{
				0:{
					items:1,
					
				},
				500:{
					items:1,
					
				},
				768:{
					items:1,
					
				},
				1000:{
					items:3,
					
				},
				1300:{
					items:6,
					
				}
			}
		})	
<<<<<<< HEAD
=======
	if ($('.owl-carousel.leading-slider-five').length > 0) {
		var owl = $('.owl-carousel.leading-slider-five');
		owl.owlCarousel({
			margin: 24,
			nav: false,
			loop: true,
			dots: false,
			autoplay: false,
			responsive: {
				0: {
					items: 2
				},
				768: {
					items: 3
				},
				1170: {
					items: 3
				},
				1300: {
					items: 4
				}
			}
		});
	}

	// Top Category Slider

	if ($('.top-category-slider').length > 0) {
		$('.top-category-slider').owlCarousel({
			loop: true,
			margin: 15,
			dots: false,
			nav: true,
			navText: ['<i class="fas fa-chevron-left custom-arrow"></i>', '<i class="fas fa-chevron-right custom-arrow"></i>'],
			responsive: {
				0: {
					items: 1,

				},
				500: {
					items: 1,

				},
				768: {
					items: 1,

				},
				1000: {
					items: 3,

				},
				1300: {
					items: 6,

				}
			}
		})
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
	}

	// Best Course Slider

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.best-course-slider').length > 0) {
		$('.best-course-slider').owlCarousel({
			loop:true,
			margin:15,
			dots:true,
			nav:true,
			navText: [ '<i class="fa-solid fa-caret-left"></i>', '<i class="fa-solid fa-caret-right"></i>' ], 
			responsive:{
				0:{
					items:1,
					
				},
				500:{
					items:1,
					
				},
				768:{
					items:2,
					
				},
				1000:{
					items:2,
					
				},
				1300:{
					items:3,
					
				}
			}
		})	
<<<<<<< HEAD
=======
	if ($('.best-course-slider').length > 0) {
		$('.best-course-slider').owlCarousel({
			loop: true,
			margin: 15,
			dots: true,
			nav: true,
			navText: ['<i class="fa-solid fa-caret-left"></i>', '<i class="fa-solid fa-caret-right"></i>'],
			responsive: {
				0: {
					items: 1,

				},
				500: {
					items: 1,

				},
				768: {
					items: 2,

				},
				1000: {
					items: 2,

				},
				1300: {
					items: 3,

				}
			}
		})
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
	}

	// Feature-instructor-two-slider

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.feature-instructor-two-slider').length > 0) {
		$('.feature-instructor-two-slider').owlCarousel({
			loop:true,
			margin:15,
			dots:true,
			nav:false,
			responsive:{
				0:{
					items:1,
					
				},
				500:{
					items:1,
					
				},
				768:{
					items:2,
					
				},
				1000:{
					items:3,
					
				},
				1300:{
					items:4,
					
				}
			}
		})	
<<<<<<< HEAD
=======
	if ($('.feature-instructor-two-slider').length > 0) {
		$('.feature-instructor-two-slider').owlCarousel({
			loop: true,
			margin: 15,
			dots: true,
			nav: false,
			responsive: {
				0: {
					items: 1,

				},
				500: {
					items: 1,

				},
				768: {
					items: 2,

				},
				1000: {
					items: 3,

				},
				1300: {
					items: 4,

				}
			}
		})
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
	}

	// Impressive Section Slider

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.impressive-section-slider').length > 0) {
		$('.impressive-section-slider').owlCarousel({
			loop:true,
			margin:15,
			dots:true,
			nav:false,
			responsive:{
				0:{
					items:1,
					
				},
				500:{
					items:1,
					
				},
				768:{
					items:2,
					
				},
				1000:{
					items:2,
					
				},
				1300:{
					items:3,
					
				}
			}
		})	
<<<<<<< HEAD
=======
	if ($('.impressive-section-slider').length > 0) {
		$('.impressive-section-slider').owlCarousel({
			loop: true,
			margin: 15,
			dots: true,
			nav: false,
			responsive: {
				0: {
					items: 1,

				},
				500: {
					items: 1,

				},
				768: {
					items: 2,

				},
				1000: {
					items: 2,

				},
				1300: {
					items: 3,

				}
			}
		})
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
	}

	//Latest Nwes and Events Slider

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.latest-news-events-slider').length > 0) {
		$('.latest-news-events-slider').owlCarousel({
			loop:true,
			margin:15,
			dots:true,
			nav:false,
			responsive:{
				0:{
					items:1,
					
				},
				500:{
					items:1,
					
				},
				768:{
					items:2,
					
				},
				1000:{
					items:2,
					
				},
				1300:{
					items:3,
					
				}
			}
		})	
<<<<<<< HEAD
=======
	if ($('.latest-news-events-slider').length > 0) {
		$('.latest-news-events-slider').owlCarousel({
			loop: true,
			margin: 15,
			dots: true,
			nav: false,
			responsive: {
				0: {
					items: 1,

				},
				500: {
					items: 1,

				},
				768: {
					items: 2,

				},
				1000: {
					items: 2,

				},
				1300: {
					items: 3,

				}
			}
		})
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
	}

	// Leading Slider

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.owl-carousel.home-five-course').length > 0 ){
		var owl = $('.owl-carousel.home-five-course');
			owl.owlCarousel({
				items:	3,
				margin: 30,
				nav : false,
				loop: true,
				dots:true,
				autoplay:false,
				responsive: {
				0:{
					items:1,
					dots:false,
				},
				600:{
					items:1,
					dots:false,
				},
				766 : {
					dots:false,
					items: 1
			  	},				  
			  	991 : {
					items: 2
			  	},
				1000:{
					items:3,
					dots:false,
				},
			  	1170: {
					items: 2
			  	},
			  	1300: {
<<<<<<< HEAD
=======
	if ($('.owl-carousel.home-five-course').length > 0) {
		var owl = $('.owl-carousel.home-five-course');
		owl.owlCarousel({
			items: 3,
			margin: 30,
			nav: false,
			loop: true,
			dots: true,
			autoplay: false,
			responsive: {
				0: {
					items: 1,
					dots: false,
				},
				600: {
					items: 1,
					dots: false,
				},
				766: {
					dots: false,
					items: 1
				},
				991: {
					items: 2
				},
				1000: {
					items: 3,
					dots: false,
				},
				1170: {
					items: 2
				},
				1300: {
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
					items: 3
				}
			}
		});
	}

	// Blog Slider

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.owl-carousel.home-five-blog').length > 0 ){
		var owl = $('.owl-carousel.home-five-blog');
			owl.owlCarousel({
			items:	3,
		 	margin: 30,
		 	nav : false,
		 	loop: true,
		 	dots:true,
			autoplay:false,
			responsive: {
				0:{
					items:1,
					dots:false,
				},
				600:{
					items:1,
					dots:false,
				},
				766 : {
					dots:false,
					items: 1
			  	},				  
			  	991 : {
					items: 2
			  	},
				1000:{
					items:3,
					dots:false,
				},
				 1170: {
<<<<<<< HEAD
=======
	if ($('.owl-carousel.home-five-blog').length > 0) {
		var owl = $('.owl-carousel.home-five-blog');
		owl.owlCarousel({
			items: 3,
			margin: 30,
			nav: false,
			loop: true,
			dots: true,
			autoplay: false,
			responsive: {
				0: {
					items: 1,
					dots: false,
				},
				600: {
					items: 1,
					dots: false,
				},
				766: {
					dots: false,
					items: 1
				},
				991: {
					items: 2
				},
				1000: {
					items: 3,
					dots: false,
				},
				1170: {
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
					items: 2
				},
				1300: {
					items: 3
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
			  	}
			}
		});
	}
	
	// // Testimonial slider 5

	if($('.testimonial-five.lazy').length > 0) {
<<<<<<< HEAD
=======
				}
			}
		});
	}

	// // Testimonial slider 5

	if ($('.testimonial-five.lazy').length > 0) {
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
		$(".testimonial-five.lazy").slick({
			lazyLoad: 'ondemand',
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 0,
			speed: 3000,
			autoplaySpeed: 1800,
<<<<<<< HEAD
<<<<<<< HEAD
			
=======

>>>>>>> origin/tasks
=======
			
>>>>>>> origin/meeting
		});
	}

	// Feature Instructors

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.owl-carousel.instructors-course').length > 0 ){
		var owl = $('.owl-carousel.instructors-course');
	      	owl.owlCarousel({
	        margin: 24,
	        nav : false,
	        nav: true,
	        loop: true,
	        responsive: {
	          	0: {
	            	items: 1
	          	},
	          	768 : {
	            	items: 2
	          	},
	          	1170: {
	            	items: 4
	          	}
	        }
	    });
    }
	
	// Latest Blogs

	if($('.owl-carousel.blogs-slide').length > 0 ){
		var owl = $('.owl-carousel.blogs-slide');
	      	owl.owlCarousel({
	        margin: 24,
	        nav : false,
	        nav: true,
	        loop: true,
	        responsive: {
	          	0: {
	            	items: 1
	          	},
	          	768 : {
	            	items: 2
	          	},
	          	1170: {
	            	items: 4
	          	}
	        }
	    });
    }

	//Course Categories Slider

	if($('.favourite-course').length > 0) {
		$('.favourite-course').owlCarousel({
			loop:true,
			margin:20,
			dots:false,
			nav:true,
			navText: [ '<i class="fa-solid fa-arrow-left-long"></i>', '<i class="fa-solid fa-arrow-right-long"></i>' ], 
			responsive:{
				0:{
					items:1,
					
				},
				500:{
					items:1,
					
				},
				768:{
					items:2,
					
				},
				768:{
					items:2,
					
				},
				1000:{
					items:3,
					
				},
				1300:{
					items:4,
					
				}
			}
		})	
<<<<<<< HEAD
=======
	if ($('.owl-carousel.instructors-course').length > 0) {
		var owl = $('.owl-carousel.instructors-course');
		owl.owlCarousel({
			margin: 24,
			nav: false,
			nav: true,
			loop: true,
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 2
				},
				1170: {
					items: 4
				}
			}
		});
	}

	// Latest Blogs

	if ($('.owl-carousel.blogs-slide').length > 0) {
		var owl = $('.owl-carousel.blogs-slide');
		owl.owlCarousel({
			margin: 24,
			nav: false,
			nav: true,
			loop: true,
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 2
				},
				1170: {
					items: 4
				}
			}
		});
	}

	//Course Categories Slider

	if ($('.favourite-course').length > 0) {
		$('.favourite-course').owlCarousel({
			loop: true,
			margin: 20,
			dots: false,
			nav: true,
			navText: ['<i class="fa-solid fa-arrow-left-long"></i>', '<i class="fa-solid fa-arrow-right-long"></i>'],
			responsive: {
				0: {
					items: 1,

				},
				500: {
					items: 1,

				},
				768: {
					items: 2,

				},
				768: {
					items: 2,

				},
				1000: {
					items: 3,

				},
				1300: {
					items: 4,

				}
			}
		})
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
	}

	// Our Courses Slider

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.our-courses-slider').length > 0) {
		$('.our-courses-slider').owlCarousel({
			loop:true,
			margin:15,
			dots:false,
			nav:true,
			navText: [ '<i class="fa-solid fa-arrow-left-long"></i>', '<i class="fa-solid fa-arrow-right-long"></i>' ], 
			responsive:{
				0:{
					items:1,
					
				},
				500:{
					items:1,
					
				},
				768:{
					items:2,
					
				},
				1000:{
					items:2,
					
				},
				1300:{
					items:3,
					
				}
			}
		})	
<<<<<<< HEAD
=======
	if ($('.our-courses-slider').length > 0) {
		$('.our-courses-slider').owlCarousel({
			loop: true,
			margin: 15,
			dots: false,
			nav: true,
			navText: ['<i class="fa-solid fa-arrow-left-long"></i>', '<i class="fa-solid fa-arrow-right-long"></i>'],
			responsive: {
				0: {
					items: 1,

				},
				500: {
					items: 1,

				},
				768: {
					items: 2,

				},
				1000: {
					items: 2,

				},
				1300: {
					items: 3,

				}
			}
		})
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
	}

	// Featured Instructor Slider

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.feature-instructor-slider').length > 0) {
		$('.feature-instructor-slider').owlCarousel({
			loop:true,
			margin:15,
			dots:false,
			nav:true,
			navText: [ '<i class="fa-solid fa-arrow-left-long"></i>', '<i class="fa-solid fa-arrow-right-long"></i>' ], 
			responsive:{
				0:{
					items:1,
					
				},
				500:{
					items:1,
					
				},
				768:{
					items:2,
					
				},
				1000:{
					items:3,
					
				},
				1300:{
					items:4,
					
				}
			}
		})	
<<<<<<< HEAD
=======
	if ($('.feature-instructor-slider').length > 0) {
		$('.feature-instructor-slider').owlCarousel({
			loop: true,
			margin: 15,
			dots: false,
			nav: true,
			navText: ['<i class="fa-solid fa-arrow-left-long"></i>', '<i class="fa-solid fa-arrow-right-long"></i>'],
			responsive: {
				0: {
					items: 1,

				},
				500: {
					items: 1,

				},
				768: {
					items: 2,

				},
				1000: {
					items: 3,

				},
				1300: {
					items: 4,

				}
			}
		})
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
	}

	// Testimonial Slider

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.testimonial-slider').length > 0) {
		$('.testimonial-slider').owlCarousel({
			loop:true,
			margin:15,
			dots:true,
			nav:false,
			smartSpeed: 10000,
            dotsSpeed: 1000,
            dragEndSpeed: 1000,
			responsive:{
				0:{
					items:1,
					
				},
				500:{
					items:1,
					
				},
				768:{
					items:1,
					
				},
				1000:{
					items:1,
					
				},
				1300:{
					items:1,
					
				}
			}
		})	
<<<<<<< HEAD
=======
	if ($('.testimonial-slider').length > 0) {
		$('.testimonial-slider').owlCarousel({
			loop: true,
			margin: 15,
			dots: true,
			nav: false,
			smartSpeed: 10000,
			dotsSpeed: 1000,
			dragEndSpeed: 1000,
			responsive: {
				0: {
					items: 1,

				},
				500: {
					items: 1,

				},
				768: {
					items: 1,

				},
				1000: {
					items: 1,

				},
				1300: {
					items: 1,

				}
			}
		})
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
	}

	// Latest Blogs Slider

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.latest-blog-slider').length > 0) {
		$('.latest-blog-slider').owlCarousel({
			loop:true,
			margin:15,
			dots:false,
			nav:true,
			navText: [ '<i class="fa-solid fa-arrow-left-long"></i>', '<i class="fa-solid fa-arrow-right-long"></i>' ], 
			responsive:{
				0:{
					items:1,
					
				},
				500:{
					items:1,
					
				},
				768:{
					items:2,
					
				},
				1000:{
					items:2,
					
				},
				1300:{
					items:3,
					
				}
			}
		})	
<<<<<<< HEAD
=======
	if ($('.latest-blog-slider').length > 0) {
		$('.latest-blog-slider').owlCarousel({
			loop: true,
			margin: 15,
			dots: false,
			nav: true,
			navText: ['<i class="fa-solid fa-arrow-left-long"></i>', '<i class="fa-solid fa-arrow-right-long"></i>'],
			responsive: {
				0: {
					items: 1,

				},
				500: {
					items: 1,

				},
				768: {
					items: 2,

				},
				1000: {
					items: 2,

				},
				1300: {
					items: 3,

				}
			}
		})
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
	}

	// Features Clinic Four

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.owl-carousel.real-reviews').length > 0) {
		$('.owl-carousel.real-reviews').owlCarousel({
			loop:true,
			margin:15,
			dots: false,
			nav:true,
			navContainer: '.slide-nav-8',
			navText: [ '<i class="fa-sharp fa-solid fa-arrow-left-long"></i>', '<i class="fa-sharp fa-solid fa-arrow-right-long"></i>' ], 
			responsive:{
				0:{
					items:1
				},
				500:{
					items:1
				},
				768:{
					items:1
				},
				1000:{
					items:1
				},
				1300:{
					items:1
				}
			}
		})	
<<<<<<< HEAD
=======
	if ($('.owl-carousel.real-reviews').length > 0) {
		$('.owl-carousel.real-reviews').owlCarousel({
			loop: true,
			margin: 15,
			dots: false,
			nav: true,
			navContainer: '.slide-nav-8',
			navText: ['<i class="fa-sharp fa-solid fa-arrow-left-long"></i>', '<i class="fa-sharp fa-solid fa-arrow-right-long"></i>'],
			responsive: {
				0: {
					items: 1
				},
				500: {
					items: 1
				},
				768: {
					items: 1
				},
				1000: {
					items: 1
				},
				1300: {
					items: 1
				}
			}
		})
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
	}

	// They Trusted us Testimonails

<<<<<<< HEAD
<<<<<<< HEAD
	if($('.swiper-testimonial-three').length > 0 ){
=======
	if ($('.swiper-testimonial-three').length > 0) {
>>>>>>> origin/tasks
=======
	if($('.swiper-testimonial-three').length > 0 ){
>>>>>>> origin/meeting
		var swiper = new Swiper(".swiper-testimonial-three", {
			effect: "coverflow",
			loop: false,
			grabCursor: true,
<<<<<<< HEAD
<<<<<<< HEAD
			center:true,
=======
			center: true,
>>>>>>> origin/tasks
=======
			center:true,
>>>>>>> origin/meeting
			centeredSlides: true,
			slidesPerView: "auto",
			centeredSlides: true,
			initialSlide: 2,
<<<<<<< HEAD
<<<<<<< HEAD
			nav:true,
=======
			nav: true,
>>>>>>> origin/tasks
=======
			nav:true,
>>>>>>> origin/meeting
			navigation: {
				prevEl: '.slide-prev-btn',
				nextEl: '.slide-next-btn',
				speed: 400,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
 				spaceBetween: 100,
			},
			coverflowEffect: {
			rotate: 0,
			stretch: 0,
			depth: 100,
			modifier: 10,
			initialSlide: 2,
			slideShadows: true
			},
			pagination: {
			el: ".swiper-pagination",
			clickable: true
<<<<<<< HEAD
=======
				spaceBetween: 100,
			},
			coverflowEffect: {
				rotate: 0,
				stretch: 0,
				depth: 100,
				modifier: 10,
				initialSlide: 2,
				slideShadows: true
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
			}
		});
	}

	// Login Slide

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.owl-carousel.login-slide').length > 0 ){
		var owl = $('.owl-carousel.login-slide');
	      	owl.owlCarousel({
	        margin: 24,
	        nav : false,
	        nav: true,
	        loop: true,
	        responsive: {
	          	0: {
	            	items: 1
	          	},
	          	768 : {
	            	items: 1
	          	},
	          	1170: {
	            	items: 1
	          	}
	        }
	    });
    }
	
	// Slick testimonial three

	if($('.mentor-testimonial.lazy').length > 0) {
<<<<<<< HEAD
=======
	if ($('.owl-carousel.login-slide').length > 0) {
		var owl = $('.owl-carousel.login-slide');
		owl.owlCarousel({
			margin: 24,
			nav: false,
			nav: true,
			loop: true,
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 1
				},
				1170: {
					items: 1
				}
			}
		});
	}

	// Slick testimonial three

	if ($('.mentor-testimonial.lazy').length > 0) {
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
		$(".mentor-testimonial.lazy").slick({
			lazyLoad: 'ondemand',
			infinite: true
		});
	}

	// Home header

<<<<<<< HEAD
<<<<<<< HEAD
	$(window).scroll(function(){
		var sticky = $('.scroll-sticky'),
		  scroll = $(window).scrollTop();
=======
	$(window).scroll(function () {
		var sticky = $('.scroll-sticky'),
			scroll = $(window).scrollTop();
>>>>>>> origin/tasks
=======
	$(window).scroll(function(){
		var sticky = $('.scroll-sticky'),
		  scroll = $(window).scrollTop();
>>>>>>> origin/meeting

		if (scroll >= 100) sticky.addClass('add-header-bg');
		else sticky.removeClass('add-header-bg');
	});
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	
	// Timer countdown
	
	if($('.countdown-container').length > 0 ){
<<<<<<< HEAD
=======

	// Timer countdown

	if ($('.countdown-container').length > 0) {
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
		const daysEl = document.getElementById("days");
		const hoursEl = document.getElementById("hours");
		const minsEl = document.getElementById("mins");

		const newYears = "1 Aug 2024";

		function countdown() {
			const newYearsDate = new Date(newYears);
			const currentDate = new Date();

			const totalSeconds = (newYearsDate - currentDate) / 1000;

			const days = Math.floor(totalSeconds / 3600 / 24);
			const hours = Math.floor(totalSeconds / 3600) % 24;
			const mins = Math.floor(totalSeconds / 60) % 60;

			daysEl.innerHTML = days;
			hoursEl.innerHTML = formatTime(hours);
			minsEl.innerHTML = formatTime(mins);
		}

		function formatTime(time) {
			return time < 10 ? `0${time}` : time;
		}

		// initial call
		countdown();

		setInterval(countdown, 1000);
	}
<<<<<<< HEAD
<<<<<<< HEAD
	
	// Circle Progress Bar
	
=======

	// Circle Progress Bar

>>>>>>> origin/tasks
=======
	
	// Circle Progress Bar
	
>>>>>>> origin/meeting
	function animateElements() {
		$('.circle-bar1').each(function () {
			var elementPos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			var percent = $(this).find('.circle-graph1').attr('data-percent');
			var animate = $(this).data('animate');
			if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
				$(this).data('animate', true);
				$(this).find('.circle-graph1').circleProgress({
					value: percent / 100,
<<<<<<< HEAD
<<<<<<< HEAD
					size : 400,
=======
					size: 400,
>>>>>>> origin/tasks
=======
					size : 400,
>>>>>>> origin/meeting
					thickness: 40,
					startAngle: -1.6,
					fill: {
						color: '#159f46'
					}
				});
			}
		});
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	}	
	
	if($('.circle-bar').length > 0) {
		animateElements();
	}
	$(window).scroll(animateElements);
	
	// Otp verfication
	
	$('.digit-group').find('input').each(function() {
		$(this).attr('maxlength', 1);
			$(this).on('keyup', function(e) {
				var parent = $($(this).parent());
	
				if(e.keyCode === 8 || e.keyCode === 37) {
					var prev = parent.find('input#' + $(this).data('previous'));
					
					if(prev.length) {
						$(prev).select();
					}
				} else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
					var next = parent.find('input#' + $(this).data('next'));
					
					if(next.length) {
						$(next).select();
					} else {
						if(parent.data('autosubmit')) {
<<<<<<< HEAD
=======
	}

	if ($('.circle-bar').length > 0) {
		animateElements();
	}
	$(window).scroll(animateElements);

	// Otp verfication

	$('.digit-group').find('input').each(function () {
		$(this).attr('maxlength', 1);
		$(this).on('keyup', function (e) {
			var parent = $($(this).parent());

			if (e.keyCode === 8 || e.keyCode === 37) {
				var prev = parent.find('input#' + $(this).data('previous'));

				if (prev.length) {
					$(prev).select();
				}
			} else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
				var next = parent.find('input#' + $(this).data('next'));

				if (next.length) {
					$(next).select();
				} else {
					if (parent.data('autosubmit')) {
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
						parent.submit();
					}
				}
			}
		});
	});
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	
	$('.digit-group input').on('keyup', function(){
		var self = $(this);
		if ( self.val() != '' ) {
<<<<<<< HEAD
=======

	$('.digit-group input').on('keyup', function () {
		var self = $(this);
		if (self.val() != '') {
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
			self.addClass('active');
		} else {
			self.removeClass('active');
		}
	});

	// Fade in scroll

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	if($('.main-wrapper .aos').length > 0) {
	    AOS.init({
		  duration: 1200,
		  once: true,
<<<<<<< HEAD
=======
	if ($('.main-wrapper .aos').length > 0) {
		AOS.init({
			duration: 1200,
			once: true,
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
		});
	}

	// Content div min height set
<<<<<<< HEAD
<<<<<<< HEAD
	
	function resizeInnerDiv() {
		var height = $(window).height();	
=======

	function resizeInnerDiv() {
		var height = $(window).height();
>>>>>>> origin/tasks
=======
	
	function resizeInnerDiv() {
		var height = $(window).height();	
>>>>>>> origin/meeting
		var header_height = $(".header").height();
		var footer_height = $(".footer").height();
		var setheight = height - header_height;
		var trueheight = setheight - footer_height;
		$(".content").css("min-height", trueheight);
	}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	
	if($('.content').length > 0 ){
		resizeInnerDiv();
	}

	$(window).resize(function(){
		if($('.content').length > 0 ){
<<<<<<< HEAD
=======

	if ($('.content').length > 0) {
		resizeInnerDiv();
	}

	$(window).resize(function () {
		if ($('.content').length > 0) {
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
			resizeInnerDiv();
		}
	});

	// Wizard

	$(document).ready(function () {
<<<<<<< HEAD
<<<<<<< HEAD
        let progressVal = 0;
        let businessType = 0;
      
=======
		let progressVal = 0;
		let businessType = 0;

>>>>>>> origin/tasks
=======
        let progressVal = 0;
        let businessType = 0;
      
>>>>>>> origin/meeting
		$(".next_btn").click(function () {
			$(this).parent().parent().parent().next().fadeIn('slow');
			$(this).parent().parent().parent().css({
				'display': 'none'
			});
			progressVal = progressVal + 1;
			$('.progress-active').removeClass('progress-active').addClass('progress-activated').next().addClass('progress-active');
		});

		$(".prev_btn").click(function () {
			$(this).parent().parent().parent().prev().fadeIn('slow');
			$(this).parent().parent().parent().css({
				'display': 'none'
			});
			progressVal = progressVal - 1;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
			$('.progress-active').removeClass('progress-active').prev().removeClass('progress-activated').addClass('progress-active'); 
		});
  	});

  	// CK Editor

	if ($('#editor').length > 0) {
		ClassicEditor
		.create( document.querySelector( '#editor' ), {
			 toolbar: {
			    items: [
			        'heading', '|',
			        'fontfamily', 'fontsize', '|',
			        'alignment', '|',
			        'fontColor', 'fontBackgroundColor', '|',
			        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
			        'link', '|',
			        'outdent', 'indent', '|',
			        'bulletedList', 'numberedList', 'todoList', '|',
			        'code', 'codeBlock', '|',
			        'insertTable', '|',
			        'uploadImage', 'blockQuote', '|',
			        'undo', 'redo'
			    ],
			    shouldNotGroupWhenFull: true
			}
		} )
		.then( editor => {
			window.editor = editor;
		} )
		.catch( err => {
			console.error( err.stack );
		} );
	}

	 // Sidebar Slimscroll

	 if($slimScrolls.length > 0) {
<<<<<<< HEAD
=======
			$('.progress-active').removeClass('progress-active').prev().removeClass('progress-activated').addClass('progress-active');
		});
	});

	// CK Editor

	if ($('#editor').length > 0) {
		ClassicEditor
			.create(document.querySelector('#editor'), {
				toolbar: {
					items: [
						'heading', '|',
						'fontfamily', 'fontsize', '|',
						'alignment', '|',
						'fontColor', 'fontBackgroundColor', '|',
						'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
						'link', '|',
						'outdent', 'indent', '|',
						'bulletedList', 'numberedList', 'todoList', '|',
						'code', 'codeBlock', '|',
						'insertTable', '|',
						'uploadImage', 'blockQuote', '|',
						'undo', 'redo'
					],
					shouldNotGroupWhenFull: true
				}
			})
			.then(editor => {
				window.editor = editor;
			})
			.catch(err => {
				console.error(err.stack);
			});
	}

	// Sidebar Slimscroll

	if ($slimScrolls.length > 0) {
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
		$slimScrolls.slimScroll({
			height: 'auto',
			width: '100%',
			position: 'right',
			size: '7px',
			color: '#ccc',
			wheelStep: 10,
			touchScrollStep: 100
		});
		var wHeight = $(window).height();
		$slimScrolls.height(wHeight);
		$('.left-sidebar .slimScrollDiv, .sidebar-menu .slimScrollDiv, .sidebar-menu .slimScrollDiv').height(wHeight);
		$('.right-sidebar .slimScrollDiv').height(wHeight - 30);
		$('.chat .slimScrollDiv').height(wHeight - 70);
		$('.chat.settings-main .slimScrollDiv').height(wHeight);
		$('.right-sidebar.video-right-sidebar .slimScrollDiv').height(wHeight - 90);
<<<<<<< HEAD
<<<<<<< HEAD
		$(window).resize(function() {
=======
		$(window).resize(function () {
>>>>>>> origin/tasks
=======
		$(window).resize(function() {
>>>>>>> origin/meeting
			var rHeight = $(window).height();
			$slimScrolls.height(rHeight);
			$('.left-sidebar .slimScrollDiv, .sidebar-menu .slimScrollDiv, .sidebar-menu .slimScrollDiv').height(rHeight);
			$('.right-sidebar .slimScrollDiv').height(wHeight - 30);
			$('.chat .slimScrollDiv').height(rHeight - 70);
			$('.chat.settings-main .slimScrollDiv').height(wHeight);
			$('.right-sidebar.video-right-sidebar .slimScrollDiv').height(wHeight - 90);
		});
	}

	// Tooltip
<<<<<<< HEAD
<<<<<<< HEAD
	if($('[data-bs-toggle="tooltip"]').length > 0) {
=======
	if ($('[data-bs-toggle="tooltip"]').length > 0) {
>>>>>>> origin/tasks
=======
	if($('[data-bs-toggle="tooltip"]').length > 0) {
>>>>>>> origin/meeting
		var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl)
		})
	}

	// Date Range Picker

<<<<<<< HEAD
<<<<<<< HEAD
	if($('.bookingrange').length > 0) {
=======
	if ($('.bookingrange').length > 0) {
>>>>>>> origin/tasks
=======
	if($('.bookingrange').length > 0) {
>>>>>>> origin/meeting
		var start = moment().subtract(6, 'days');
		var end = moment();

		function booking_range(start, end) {
			$('.bookingrange span').html(start.format('M/D/YYYY') + ' - ' + end.format('M/D/YYYY'));
		}

		$('.bookingrange').daterangepicker({
			startDate: start,
			endDate: end,
			ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			}
		}, booking_range);

		booking_range(start, end);
	}

	//Top Online Contacts
<<<<<<< HEAD
<<<<<<< HEAD
	if($('.top-online-contacts .swiper-container').length > 0 ){
=======
	if ($('.top-online-contacts .swiper-container').length > 0) {
>>>>>>> origin/tasks
=======
	if($('.top-online-contacts .swiper-container').length > 0 ){
>>>>>>> origin/meeting
		var swiper = new Swiper('.top-online-contacts .swiper-container', {
			slidesPerView: 5,
			spaceBetween: 15,
		});
	}

	// Chat Search Visible

	$('.user-chat-search-btn').on('click', function () {
		$('.user-chat-search').addClass('visible-chat');
	});
	$('.user-close-btn-chat').on('click', function () {
		$('.user-chat-search').removeClass('visible-chat');
	});

	// Chat Search Visible

	$('.chat-search-btn').on('click', function () {
		$('.chat-search').addClass('visible-chat');
	});
	$('.close-btn-chat').on('click', function () {
		$('.chat-search').removeClass('visible-chat');
	});
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/meeting
	$(".chat-search .form-control").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$(".chat .chat-body .messages .chats").filter(function() {
		  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
<<<<<<< HEAD
=======
	$(".chat-search .form-control").on("keyup", function () {
		var value = $(this).val().toLowerCase();
		$(".chat .chat-body .messages .chats").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
>>>>>>> origin/tasks
=======
>>>>>>> origin/meeting
		});
	});

	$(".user-list-item:not(body.status-page .user-list-item, body.voice-call-page .user-list-item)").on('click', function () {
		if ($(window).width() < 992) {
			$('.left-sidebar').addClass('hide-left-sidebar');
			$('.chat').addClass('show-chatbar');
		}
	});
<<<<<<< HEAD
<<<<<<< HEAD
	
=======

>>>>>>> origin/tasks
=======
	
>>>>>>> origin/meeting
	$(".left_sides").on('click', function () {
		if ($(window).width() <= 991) {
			$('.sidebar-group').removeClass('hide-left-sidebar');
			$('.sidebar-menu').removeClass('d-none');
		}
	});
	$(".left_sides").on('click', function () {
		if ($(window).width() <= 991) {
			$('.chat-messages').removeClass('show-chatbar');
		}
	});
	$(".user-list li a").on('click', function () {
		if ($(window).width() <= 767) {
			$('.left-sidebar').addClass('hide-left-sidebar');
<<<<<<< HEAD
<<<<<<< HEAD
				$('.sidebar-menu').addClass('d-none');
=======
			$('.sidebar-menu').addClass('d-none');
>>>>>>> origin/tasks
=======
				$('.sidebar-menu').addClass('d-none');
>>>>>>> origin/meeting
		}
	});

	// Date Time Picker
<<<<<<< HEAD
<<<<<<< HEAD
	
	if($('.datetimepicker').length > 0) {
=======

	if ($('.datetimepicker').length > 0) {
>>>>>>> origin/tasks
=======
	
	if($('.datetimepicker').length > 0) {
>>>>>>> origin/meeting
		$('.datetimepicker').datetimepicker({
			format: 'DD-MM-YYYY',
			icons: {
				up: "fa fa-angle-up",
				down: "fa-solid fa-angle-down",
				next: 'fa-solid fa-angle-right',
				previous: 'fa-solid fa-angle-left'
			}
		});
	}
<<<<<<< HEAD
<<<<<<< HEAD
	
=======

>>>>>>> origin/tasks
=======
	
>>>>>>> origin/meeting
})(jQuery);