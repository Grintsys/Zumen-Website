$(document).ready(function() {

    var apiUrl = "http://srgrintsys003.grintsys.com:8090/";
    var $grid = $('.isotope-grid');

    //Filter products category
    $.getJSON(apiUrl+"category/all")
    .done(function(data) {
        var list = data.data;
        for(var i=0; i < list.length; i++)
        {
            var img = list[i].ImageUrl == null ? "images/hules/portada.jpg" : apiUrl+list[i].ImageUrl;

            $('ul.main-menu > li > ul.sub-menu').append("<li><a href='#'>"+list[i].Name+"</a></li>");

            $('#filter > #tag').append(`<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".${list[i].Name}">
                                ${list[i].Name}
                                </button>`);

            var div = `<div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
                                <!-- Block1 -->
                                <div class="block1 wrap-pic-w">
                                    <img src="${img}" alt="IMG-BANNER">
                        
                                    <a href="./product.html" class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
                                        <div class="block1-txt-child1 flex-col-l">
                                            <span class="block1-name ltext-102 trans-04 p-b-8">
                                                ${list[i].Name}
                                            </span>
                        
                                            <span class="block1-info stext-102 trans-04">
                                                Autos
                                            </span>
                                        </div>
                        
                                        <div class="block1-txt-child2 p-b-4 trans-05">
                                            <div class="block1-link stext-101 cl0 trans-09">
                                                Productos
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>`;
            $('#categories > .row').append(div);
        }       
    });

    $.getJSON(apiUrl+"brand/all")
    .done(function(data) {
        var list = data.data;
        for(var i=0; i < list.length; i++)
        {
            $('#brands').append(`<li class="p-b-6">
                                            <a href="#" class="filter-link stext-106 trans-04">
                                                ${list[0].Name}
                                            </a>
                                        </li>`);
        }       
    });

    $.getJSON(apiUrl+"coverpage/all")
    .done(function(data) {
        var list = data.data;
        debugger;
        for(var i=0; i < list.length; i++)
        {
            var img = list[i].ImageUrl == null ? "images/slide-1.jpg" : apiUrl+list[i].ImageUrl;
            var $page = `<div class="item-slick1" style="background-image: url(${img});">
            <div class="container h-full">
                <div class="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                    <div class="layer-slick1 animated visible-false" data-appear="fadeInDown" data-delay="0">
                        <span class="ltext-101 cl2 respon2">
                            ${list[i].HeaderText}
                        </span>
                    </div>
                        
                    <div class="layer-slick1 animated visible-false" data-appear="fadeInUp" data-delay="800">
                        <h2 class="ltext-201 cl2 p-t-19 p-b-43 respon1">
                            ${list[i].SubHeaderText}
                        </h2>
                    </div>
                        
                    <div class="layer-slick1 animated visible-false" data-appear="zoomIn" data-delay="1600">
                        <a href="./product.html" class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                            Ver
                        </a>
                    </div>
                </div>
            </div>
        </div>`;

        $('.section-slide > .wrap-slick1 > .slick1').append($page);
        
        }

        $('.wrap-slick1').each(function(){
            var wrapSlick1 = $(this);
            var slick1 = $(this).find('.slick1');


            var itemSlick1 = $(slick1).find('.item-slick1');
            var layerSlick1 = $(slick1).find('.layer-slick1');
            var actionSlick1 = [];
            

            $(slick1).on('init', function(){
                var layerCurrentItem = $(itemSlick1[0]).find('.layer-slick1');

                for(var i=0; i<actionSlick1.length; i++) {
                    clearTimeout(actionSlick1[i]);
                }

                $(layerSlick1).each(function(){
                    $(this).removeClass($(this).data('appear') + ' visible-true');
                });

                for(var i=0; i<layerCurrentItem.length; i++) {
                    actionSlick1[i] = setTimeout(function(index) {
                        $(layerCurrentItem[index]).addClass($(layerCurrentItem[index]).data('appear') + ' visible-true');
                    },$(layerCurrentItem[i]).data('delay'),i); 
                }        
            });


            var showDot = false;
            if($(wrapSlick1).find('.wrap-slick1-dots').length > 0) {
                showDot = true;
            }

            $(slick1).slick({
                pauseOnFocus: false,
                pauseOnHover: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                speed: 1000,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 6000,
                arrows: true,
                appendArrows: $(wrapSlick1),
                prevArrow:'<button class="arrow-slick1 prev-slick1"><i class="zmdi zmdi-caret-left"></i></button>',
                nextArrow:'<button class="arrow-slick1 next-slick1"><i class="zmdi zmdi-caret-right"></i></button>',
                dots: showDot,
                appendDots: $(wrapSlick1).find('.wrap-slick1-dots'),
                dotsClass:'slick1-dots',
                customPaging: function(slick, index) {
                    var linkThumb = $(slick.$slides[index]).data('thumb');
                    var caption = $(slick.$slides[index]).data('caption');
                    return  '<img src="' + linkThumb + '">' +
                            '<span class="caption-dots-slick1">' + caption + '</span>';
                },
            });

            $(slick1).on('afterChange', function(event, slick, currentSlide){ 

                var layerCurrentItem = $(itemSlick1[currentSlide]).find('.layer-slick1');

                for(var i=0; i<actionSlick1.length; i++) {
                    clearTimeout(actionSlick1[i]);
                }

                $(layerSlick1).each(function(){
                    $(this).removeClass($(this).data('appear') + ' visible-true');
                });

                for(var i=0; i<layerCurrentItem.length; i++) {
                    actionSlick1[i] = setTimeout(function(index) {
                        $(layerCurrentItem[index]).addClass($(layerCurrentItem[index]).data('appear') + ' visible-true');
                    },$(layerCurrentItem[i]).data('delay'),i); 
                }
                         
            });
        });    
    });

    $.getJSON(apiUrl+"product/all")
    .done(function(data) {
        var list = data.data;
        var $divContent = "";
        for(var i=0; i < list.length; i++)
        {
            var img = list[i].ImageUrl == null ? "images/hules/portada.jpg" : apiUrl+list[i].ImageUrl;

            $divContent = `<div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${list[i].Category}">
                <div class="block2">
                    <div class="block2-pic hov-img0">
                        <img src="${img}" alt="IMG-PRODUCT">

                        <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Ver
                        </a>
                </div>

                <div class="block2-txt flex-w flex-t p-t-14">
                    <div class="block2-txt-child1 flex-col-l ">
                        <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            ${list[i].Name}
                        </a>

                        <span class="stext-105 cl3">
                            ${list[i].PartNumber}
                        </span>
                    </div>

                    <div class="block2-txt-child2 flex-r p-t-3">
                        <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                            <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                        </a>
                    </div>
                </div>
            </div>
        </div>`;  

        $grid.append($divContent);
        }

             /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        
    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine : 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function(){
        $(this).on('click', function(){
            for(var i=0; i<isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });       
    });
    });

   



