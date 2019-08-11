var $input = $('<div class="modal-body"><input type="text" class="form-control" placeholder="Message"></div>')

$(function(){
  setTimeout(function(){
    $(".peek-cover-mobile").css("left", "-1px");
  }, 1000);
});

$(function(){
  var height = $(".profile-header").css("height");
  $(".peek-cover, .peek-cover-mobile").click(()=>{
    if ($(".profile-header").css("height") == height)
      $(".profile-header").css("height", "100vh");
    else 
      $(".profile-header").css("height", height);
  });
});

$(function () {
  //emoji animation
  $(my_mood());
  $("#mood ul li").click(()=>{
    my_mood();
  })

  function my_mood(){
    var mood = $("#mood ul");
    var mood_emojis = mood.children();
    var emoji_index = 1;
    //setup inital view
    $("#mood ul .final").css("font-size","0px");
    var emoji_cycle = setInterval((event) => {
        $("#mood ul li:nth-child("+emoji_index+") span img").animate({
            "width" : "0px",
            "height" : "0px"
        },300,function(){
            if (emoji_index == (mood_emojis.length - 1)){
                clearInterval(emoji_cycle);
                $("#mood ul .final").animate({
                    "fontSize" : "70px"
                },500);
            }
            else
            {
                emoji_index++;
                $("#mood ul li:nth-child("+emoji_index+") span img").css({"width":"120px", "height" : "120px"});
            }
        });
    }, 1000);
  }
  function getRight() {
    if (!$('[data-toggle="popover"]').length) return 0
    return ($(window).width() - ($('[data-toggle="popover"]').offset().left + $('[data-toggle="popover"]').outerWidth()))
  }

  $(window).on('resize', function () {
    var instance = $('[data-toggle="popover"]').data('bs.popover')
    if (instance) {
      instance.config.viewport.padding = getRight()
    }
  })

  $('[data-toggle="popover"]').popover({
    template: '<div class="popover" role="tooltip"><div class="popover-content px-0"></div></div>',
    title: '',
    html: true,
    trigger: 'manual',
    placement:'bottom',
    viewport: {
      selector: 'body',
      padding: getRight()
    },
    content: function () {
      var $nav = $('#js-popoverContent').clone()
      return '<ul class="nav nav-pills nav-stacked flex-column" style="width: 120px">' + $nav.html() + '</ul>'
    }
  })

  $('[data-toggle="popover"]').on('click', function (e) {
    e.stopPropagation()

    if ($($('[data-toggle="popover"]').data('bs.popover').getTipElement()).hasClass('in')) {
      $('[data-toggle="popover"]').popover('hide')
      $(document).off('click.app.popover')

    } else {
      $('[data-toggle="popover"]').popover('show')

      setTimeout(function () {
        $(document).one('click.app.popover', function () {
          $('[data-toggle="popover"]').popover('hide')
        })
      }, 1)
    }
  })

})

$(document).on('click', '.js-gotoMsgs', function () {
  $input.remove()
  $('.js-conversation').addClass('hidden-xs-up')
  $('.js-msgGroup, .js-newMsg').removeClass('hidden-xs-up')
  $('.modal-title').html('Messages')
})

$(document).on('click', '[data-action=growl]', function (e) {
  e.preventDefault()

  $('#app-growl').append(
    '<div class="alert alert-dark alert-dismissible fade show" role="alert">'+
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
        '<span aria-hidden="true">×</span>'+
      '</button>'+
      'Click the x on the upper right to dismiss this little thing. Or click growl again to show more growls'+
    '</div>'
  )
})

$(document).on('focus', '[data-action="grow"]', function () {
  if ($(window).width() > 1000) {
    $(this).animate({
      width: 300
    })
  }
})

$(document).on('blur', '[data-action="grow"]', function () {
  if ($(window).width() > 1000) {
    var $this = $(this).animate({
      width: 180
    })
  }
})

// back to top button - docs
// $(function () {
//   if ($('.docs-top').length) {
//     _backToTopButton()
//     $(window).on('scroll', _backToTopButton)
//     function _backToTopButton () {
//       if ($(window).scrollTop() > $(window).height()) {
//         $('.docs-top').fadeIn()
//       } else {
//         $('.docs-top').fadeOut()
//       }
//     }
//   }
// })

// $(function () {
//     // doc nav js
//     var $toc = $('#markdown-toc')
//     $('#markdown-toc li').addClass('nav-item')
//     $('#markdown-toc li > a').addClass('nav-link')
//     var $window = $(window)

//     if ($toc[0]) {

//       maybeActivateDocNavigation()
//       $window.on('resize', maybeActivateDocNavigation)

//       function maybeActivateDocNavigation () {
//         if ($window.width() > 768) {
//           activateDocNavigation()
//         } else {
//           deactivateDocNavigation()
//         }
//       }

//       function deactivateDocNavigation() {
//         $window.off('resize.theme.nav')
//         $window.off('scroll.theme.nav')
//         $toc.css({
//           position: '',
//           left: '',
//           top: ''
//         })
//       }

//       function activateDocNavigation() {

//         var cache = {}

//         function updateCache() {
//           cache.containerTop   = $('.docs-content').offset().top - 40
//           cache.containerRight = $('.docs-content').offset().left + $('.docs-content').width() + 45
//           measure()
//         }

//         function measure() {
//           var scrollTop = $window.scrollTop()
//           var distance =  Math.max(scrollTop - cache.containerTop, 0)

//           if (!distance) {
//             $($toc.find('li a')[1]).addClass('active')
//             return $toc.css({
//               position: '',
//               left: '',
//               top: ''
//             })
//           }

//           $toc.css({
//             position: 'fixed',
//             left: cache.containerRight,
//             top: 40
//           })
//         }

//         updateCache()

//         $(window)
//           .on('resize.theme.nav', updateCache)
//           .on('scroll.theme.nav', measure)

//         $('body').scrollspy({
//           target: '#markdown-toc',
//           children: 'li > a'
//         })

//         setTimeout(function () {
//           $('body').scrollspy('refresh')
//         }, 1000)
//       }
//     }
// })
