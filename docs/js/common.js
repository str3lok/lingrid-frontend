// Touch Detect
function isTouch() {
  try{ document.createEvent("TouchEvent"); return true; }
  catch(e){ return false; }
}

if (isTouch()){ document.querySelector('html').classList.add('is-touch')};

document.addEventListener('DOMContentLoaded', function () {
  videoPlay();
  // openNavMobile();
  closeNavMobile();
});



$(function() {

// Listen From One of You!
$('.videoMainInit').slick({
 slidesToShow: 1,
 slidesToScroll: 1,
 arrows: false,
 fade: true,
 asNavFor: '.videoThumbInit'
});

  $('.videoThumbInit').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
      touchThreshold: 50,
      dots: true,	
      asNavFor: '.videoMainInit',
     centerMode: true,
    focusOnSelect: true,			
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            centerMode: false,	
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            centerMode: false,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            centerMode: false,
          }
        }								
      ]	
  });		
  // stop video after change slide
  $('.videoThumbInit').on('afterChange', function(event, slick, currentSlide, nextSlide){
    $('.is-playing').each(function(){ $(this).find('video')[0].pause() })
});

$('.feedbackSliderInit').slick({
 slidesToShow: 1,
 slidesToScroll: 1,
 arrows: false,
 touchThreshold: 50,
 dots: false,	 
 centerMode: true,
 variableWidth: true,
 responsive: [
  {
   breakpoint: 768,
   settings: {
    dots: true,
   }
 },  
 ]
});

$(document).on("click", ".collapseMoreJs", function (e) {
 e.preventDefault();
 var _this = $(this);
 collapseBlocks(_this, "feedback-slide__block", "collapse-block__content", 'collapse-block');
});

// show/hide faq content
$(document).on("click", ".faqJs", function (e) {
 e.preventDefault();
 const parentFaqContainer = $(this).closest('.main-faq__item');
 const faqBlock =  parentFaqContainer.find('.main-faq__block');
 if(!$(this).hasClass('is-active')) {
  $(this).addClass('is-active');
  faqBlock.slideDown();
 } else {
  $(this).removeClass('is-active');
  faqBlock.slideUp();
 }
});


}); //- end 


// свернуть/развернуть блок
function collapseBlocks(event, parentContainer, parentTextBox, collapseBox) {

  var _this = event;
  var parentBlock = $(_this).closest("." + parentContainer);
  var heightBox = $(_this).attr("data-height");

  if (!$(parentBlock).hasClass("is-show")) {
    var blockContentHeight = $(parentBlock)
      .find("." + parentTextBox)
      .outerHeight();
    $(parentBlock)
      .find("." + collapseBox)
      .animate({ height: blockContentHeight + "px" }, 300);
    setTimeout(function () {
      $(parentBlock).find("." + collapseBox).removeAttr("style");
      $(parentBlock).addClass("is-show");
    }, 310);
    $(_this).text($(_this).attr("data-change"));
  } else {
    $(parentBlock)
      .find("." + collapseBox)
      .animate({ height: heightBox + "px" }, 300);
    $(parentBlock).removeClass("is-show");

    setTimeout(function () {
      $(parentBlock).find("." + collapseBox).removeAttr("style");
      $(_this).text($(_this).attr("data-text"));
    }, 310);
  }
}//- collapseBlocks


// add btn feedback Learn More
function btnCollapseMoreAdd(block) {
  var windowWidth = $(window).outerWidth();
  var btnCollapseContainer = $(block);
  
  var btnCollapseMore = $(btnCollapseContainer).find('.btn__more-collapse');
  var btnCollapseMoreText = $(btnCollapseMore).attr('data-text');
  var btnCollapseDefaultHeight = $(btnCollapseMore).attr('data-height');

  if (windowWidth >= 768) {
    $(btnCollapseContainer).removeClass('is-show');
    $(btnCollapseContainer).find('.collapse-block').removeAttr('style');
    $(btnCollapseContainer).find('.collapse-block').removeClass('is-more');
    $(btnCollapseMore).text(btnCollapseMoreText);
    $(btnCollapseContainer).find('.collapseJs').hide();
  }
  else {
    var list_height = $(btnCollapseContainer).find('.collapse-block__content').outerHeight();
    if(list_height > btnCollapseDefaultHeight) {
      $(btnCollapseContainer).find('.collapse-block').addClass('is-more');
      $(btnCollapseContainer).find('.collapseJs').show();
    }
  }
  }

// video play
function videoPlay() {
  var btnPlay = document.querySelectorAll('.videoPlayJs')
  if (!btnPlay.length) return
  btnPlay.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var target = e.currentTarget;
      e.preventDefault();
      const parentVideoContainer = target.closest('.video-main__content');
      parentVideoContainer.classList.add('is-playing');
      parentVideoContainer.querySelector('.video-main__traders').style.display = 'block';
      parentVideoContainer.querySelector('video').play();
    })
  })
}

// // show/hide faq content
// function faqOpenBlock() {
//   var btnFaq = document.querySelectorAll('.faqJs')
//   if (!btnFaq.length) return
//   btnFaq.forEach(function (btn) {
//     btn.addEventListener('click', function (e) {
//       var target = e.currentTarget;
//       e.preventDefault();
//       const parentVideoContainer = target.closest('.main-faq__item');
//       const faqBlock =  parentVideoContainer.querySelector('.main-faq__block')
//       let btnActive = target.classList.contains('is-active');
//       if(btnActive) {
//         target.classList.remove('is-active');
//         faqBlock.style.display = 'none';
//       } else {
//         target.classList.add('is-active');
//         faqBlock.style.display = 'block';
//       }
//     })
//   })  
// }

// openNavMobile 
document.querySelector('.navOpenJs').addEventListener('click', function (e) {
 e.preventDefault();
 document.querySelector("html").classList.add("htmlFix");
 document.querySelector("body").classList.add("navFix");
 fadeIn(".navContainerJs");
});
function fadeIn(el) {
 var opacity = 0.2;
 document.querySelector(el).style.display = "block";
 var timer = setInterval(function() {
  if(opacity >= 1) {
    clearInterval(timer);
  }
  document.querySelector(el).style.opacity = opacity;
  opacity += opacity * 0.2;
 }, 10);
}
function fadeOut(el) {
	var opacity = 1;
	var timer = setInterval(function() {
		if(opacity <= 0.1) {
			clearInterval(timer);
			document.querySelector(el).style.display = "none";
			document.querySelector(el).removeAttribute('style');
		}
		document.querySelector(el).style.opacity = opacity; 
		opacity -= opacity * 0.1;
	}, 10);
}

function closeNavMobile() {
 var btnClose = document.querySelectorAll('.navCloseJs')
 if (!btnClose.length) return
 btnClose.forEach(function (btn) {
   btn.addEventListener('click', function (e) {
     e.preventDefault();
     closeMobileMenu();
   })
 })  
}

// closeMobileMenu
function closeMobileMenu() {
 document.querySelector("html").classList.remove("htmlFix");
 document.querySelector("body").classList.remove("navFix");
 fadeOut(".navContainerJs");
}

// 222222222


function headerFixed() {
 var top =
  (document.documentElement && document.documentElement.scrollTop) ||
  document.body.scrollTop;
  const header = document.querySelector('header');
 if (top > 100) {
  header.classList.add('is-fixed')
} else {
 header.classList.remove('is-fixed')
}
}
$(window).on("scroll", headerFixed);


function loadPage() {
 var windowWidth = window.outerWidth; 
 headerFixed();

 if(windowWidth <= 767) {
  if($('.feedback-slide__block.collapse').length >= 1) {
   $('.feedback-slide__block.collapse').each(function(){
     btnCollapseMoreAdd($(this));
   });
  }
 }
}//end loadPage
window.addEventListener("load", loadPage);


function resizePage() {
 var windowWidth = window.outerWidth; 
 if (windowWidth >= 1024) {
  closeMobileMenu();
 }
 if(windowWidth <= 767) {
  if($('.feedback-slide__block.collapse').length >= 1) {
   $('.feedback-slide__block.collapse').each(function(){
     btnCollapseMoreAdd($(this));
   });
  }
 } 
}//end resizePage
window.addEventListener("resize", resizePage);


