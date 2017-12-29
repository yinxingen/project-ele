$(window).on("scroll", function() {
    if ($(this).scrollTop() > 48) {
        $(".page-header__search-show").removeClass("hide")
    } else {
        $(".page-header__search-show").addClass("hide")

    }
    if ($(this).scrollTop() > 300) {
        $(".toTop").removeClass("hide")
    } else {
        $(".toTop").addClass("hide")

    }
})