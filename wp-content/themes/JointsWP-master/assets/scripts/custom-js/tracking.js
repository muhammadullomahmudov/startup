/**
 * Created by Jaroslav on 19/07/21.
 */

function getUrlVars()
{
    var utm = '';
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        if (hash[0].includes('utm') || hash[0].includes('gclid')) {
            utm = utm + '?' + hash[0] + '=' + hash[1];
        }
    }
    return utm;
}

// UTM tracking for all forms
$('input[name=custom-page-slug]').each(function () {

    if ($('body').hasClass("search-results")) {
        urlParams = new URLSearchParams(window.location.search)
        $(this).attr('value', 'search-' + urlParams.get('s'));
    }

    $(this).attr('value', $(this).val() + getUrlVars());
});

// UTM tracking for leaving modal
$('#myModal-leaving').on('mouseenter', 'input[type=submit]', function () {
    var slug = $(this).parents('.form-content').find('input[name=custom-page-slug]');
    if (!slug.val().includes('?')) {
        slug.attr('value', slug.val() + 'leaving-modal' + getUrlVars());
    }
});

// Diffrentiate same form triggered by different button
$('a[data-form-source]').click(function () {
    if ($('#' + $(this).attr('data-reveal-id') + ' .form-content input[name=source]').val() !== $(this).attr('data-form-source')) {
        $('#' + $(this).attr('data-revq eal-id') + ' .form-content input[name=source]').attr('value', $(this).attr('data-form-source'));
    }
});
