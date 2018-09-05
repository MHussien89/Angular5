(function(){
    $('.form-control').focusin(function (){
        $(this).prev('.form__floated-label').addClass('hide').removeClass('show');
    });

    $('.form-control').focusout(function (){
        if($(this).val() == '') {
            $(this).prev('.form__floated-label').addClass('show').removeClass('hide');
        }
    });

    $('.sidenav__list').find('.sidenav__link').click(function (){
        $(this).addClass('active');
        $(this).parents().siblings('.sidenav__item').find('.sidenav__link').removeClass('active');
    })
})();