$(document).ready(function () {
    /**** Floating menu inputs ****/
    $('.form-control').blur(function () {
        if ($(this).val()) {
            $(this).next('.form-label').addClass('form-filled')
        } else {
            $(this).next('.form-label').removeClass('form-filled')
        }
    });

    $('.form-control').each(function(index, element){
        var $element = $(element);
        var defaultValue = $element.val();
        if(defaultValue) {
            $(this).next('.form-label').addClass('form-filled')
        }
    })
    /**** Toggle Side Nav****/
    if ($(window).width() >= 768){	
        $('.side-nav').addClass('visible');
    } else {
        $('.btn-toggle').click(function (event) {
            $('.side-nav').toggleClass('visible');
            $('.floating-menu').removeClass('show');
        });
        $('.side-nav').click(function (event) {
            event.stopPropagation();
        });

        $('.favorites').click(function (event) {
            event.stopPropagation();
        });

        $('.mentions').click(function (event) {
            event.stopPropagation();
        });

        $('body').click(function () {
            $('.side-nav').removeClass('visible');
            $('.mentions').removeClass('show');
            $('.favorites').removeClass('show');
        });
    }

    /**** List group active state ****/
    $('.side-nav').find('.link').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });

    /**** Toggle Favorite ****/
    $('.star').click(function () {
        $(this).hide();
        $(this).next('.filled-star').addClass('block');
        $(this).removeClass('block');
    });


    $('.filled-star').click(function () {
        $(this).hide();
        $(this).removeClass('block');
        $(this).prev('.star').addClass('block');
    });


    // Open Favorites Floating menu

    $('.link-favorites').click(function () {
        $('.favorites').addClass('show');
        $('.side-nav').addClass('visible');
        $('.mentions').removeClass('show');
    });

    $('.link-mentions').click(function () {
        $('.mentions').addClass('show');
        $('.side-nav').addClass('visible');
        $('.favorites').removeClass('show');
    });

    // Close Favorites Floating menu
    $('.close').click(function (e) {
        e.preventDefault();
        $(this).closest('.floating-menu').removeClass('show');
    });

    // Initialize Bootstrap Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    var clickedDate;
    // Initialize Full Calendar
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        dayClick: function (date, jsEvent, view) {
            if (view.name == 'month' || view.name == 'basicWeek') {
                $('#calendar').fullCalendar('changeView', 'agendaDay');
                $('#calendar').fullCalendar('gotoDate', date);
            }
        },
        header: {
            right: 'month, today prev,next'
        }
    });

    // Inline editing
    $('#friends').editable({
        type: 'text',
        pk: 1,
        name: 'Friends',
        url: '',
        title: 'Enter username',
        mode: 'inline'
    });

    $('#startsAt').datetimepicker();
    $('#endsAt').datetimepicker();

    $('.search-icon').click(function () {
        $('.search-form').addClass('show-search');
        $('.dimmed').addClass('show');
    });

     $('.search-form').find('.close-btn').click( function () {
        $('.search-form').removeClass('show-search');
        $('.dimmed').removeClass('show');
     });
});


