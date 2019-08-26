var $input = $('<div class="modal-body"><input type="text" class="form-control" placeholder="Message"></div>')

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
  //Function: bitmoji carisal animation
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
            } else {
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

