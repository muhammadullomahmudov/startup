
    $(document).on("click", "a[data-reveal-id]", function (a) {
        a.preventDefault();
        var e = $(this).attr("data-reveal-id");
        $("#" + e).reveal($(this).data())
    }), $.fn.reveal = function (a) {
        var e = {
            animation: "fadeAndPop",
            animationspeed: 300,
            closeonbackgroundclick: !0,
            dismissmodalclass: "close-reveal-modal"
        }, a = $.extend({}, e, a);
        return this.each(function () {
            function e() {
                s = !1
            }

            function n() {
                s = !0
            }

            var o = $(this), t = parseInt(o.css("top")), s = (o.height(), !1), d = $(".reveal-modal-bg");
            0 == d.length && (d = $('<div class="reveal-modal-bg" />').insertAfter(o)), o.bind("reveal:open", function () {
                d.unbind("click.modalEvent"), $("." + a.dismissmodalclass).unbind("click.modalEvent"), s || (n(), "fadeAndPop" == a.animation && (o.css({
                    top: 0,
                    opacity: 0,
                    visibility: "visible"
                }), d.fadeIn(a.animationspeed / 2), o.delay(a.animationspeed / 2).animate({
                    top: 0,
                    opacity: 1
                }, a.animationspeed, e())), "fade" == a.animation && (o.css({
                    opacity: 0,
                    visibility: "visible",
                    display: "inline-block"
                }), $(".fade_wrapper").css("display", "block"), d.fadeIn(a.animationspeed / 2), o.delay(a.animationspeed / 2).animate({opacity: 1}, a.animationspeed, e())), "none" == a.animation && (o.css({
                    visibility: "visible",
                    top: 0
                }), d.css({display: "block"}), e())), o.unbind("reveal:open")
            }), o.bind("reveal:close", function () {
                s || (n(), "fadeAndPop" == a.animation && (d.delay(a.animationspeed).fadeOut(a.animationspeed), o.animate({
                    top: 0,
                    opacity: 0
                }, a.animationspeed / 2, function () {
                    o.css({top: 0, opacity: 1, visibility: "hidden"}), e()
                })), "fade" == a.animation && (d.delay(a.animationspeed).fadeOut(a.animationspeed), o.animate({opacity: 0}, a.animationspeed, function () {
                    o.css({
                        opacity: 1,
                        visibility: "hidden",
                        display: "none"
                    }), $(".fade_wrapper").css("display", "none"), e()
                })), "none" == a.animation && (o.css({
                    visibility: "hidden",
                    top: 0
                }), d.css({display: "none"}))), o.unbind("reveal:close")
            }), o.trigger("reveal:open");
            $("." + a.dismissmodalclass).bind("click.modalEvent", function () {
                o.trigger("reveal:close")
            });
            a.closeonbackgroundclick && (d.css({cursor: "pointer"}), d.bind("click.modalEvent", function () {
                o.trigger("reveal:close")
            })), $("body").keyup(function (i) {
                27 === $.which && o.trigger("reveal:close")
            })
        })
    }
