jQuery(document).ready(function ($) {
    // relevant to the right side NL subs form
    $('.newsletter-subscribe-wrapper .blog-newsletter-consent-opt-in input[name="opt-in[]"]').click();
    
    $('.wp-caption-text:contains("Click to download")').each(function () {
        $(this).addClass('infograpics-click-area');
        var href = $(this).siblings('a').attr('href');

        // image link
        $(this).siblings('a').attr({
            "data-reveal-id": "myModal-download-graphics",
            "data-form-source": "contact_download_infographic",
            "data-animation": "fade",
            "title": "Click to Download High-Res Visual"
        }).addClass('infographics-download');

        // caption link
        $(this).replaceWith('<div class="wp-caption-text infograpics-click-area"><a href="' + href + '" data-reveal-id="myModal-download-graphics" class="button-form-link infographics-button infographics-download"  data-form-source="contact_download_infographic" data-animation="fade">Download High-Res Visual</a></div>');
    });

    var iform = $('#myModal-download-graphics');
    function adjustForm(href) {
        iform.find('.form-headline').text('Download High-Res Visual');
        iform.find('input[type="submit"]').attr('value', 'Download image');
        iform.find('.image-wrapper').html('<img src="' + href + '" />');
    };

    $('.infograpics-click-area').each(function () {
        // caption link
        $(this).find('.button-form-link').click(function (event) {
            event.preventDefault();
            adjustForm($(this).attr('href'));
        });
        // image link
        $(this).siblings('a').click(function (event) {
            event.preventDefault();
            adjustForm($(this).attr('href'));
        });
    });

    // copy sharing buttons
    var sharedaddy = $("#main > .share-buttons .sharedaddy");
    sharedaddy.clone().appendTo($('.infograpics-click-area'));

    // Helper function - virtual a element and then click for HTML5 download
    function downloadFile(url) {
        var link = document.createElement('a');
        link.href = url;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        $('.infographics-download').removeAttr('data-reveal-id');
    }

    // trigger on successful submit
    document.addEventListener('wpcf7mailsent', function (event) {
        if (event.detail.inputs[4]['value'] == 'infographics-download') {
            iform.find('.image-wrapper img').hide();
            // console.log('download: ' + iform.find('.image-wrapper img').attr('src'));
            downloadFile(iform.find('.image-wrapper img').attr('src'));
        }
    }, false);

    // Multiple downloads
    $('a.infographics-download').click(function (event) {
        event.preventDefault();
        if ($('#myModal-download-graphics .wpcf7-response-output').text()) {
            downloadFile($(this).attr('href'));
        }
    });

    $("a[href*='#']").click(function (e) {
        e.preventDefault();
        var top_bar_height = $('.bor_head.navbar-default').height();
        var target_from_top = $($(this).attr('href')).position()['top'];
        window.scrollTo({top: target_from_top - top_bar_height, behavior: 'smooth'});
    });

});