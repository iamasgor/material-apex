/************
APEX Initialization
************/
$.fn.ignore = function(sel){
    return this.clone().find(sel||">*").remove().end();
};

function componentsInit() {
    /* Fix for label issue with many components. Need to have label after component. */
    $(".input-field label").each(function() {
        $(this).appendTo($(this).parent());
    });

    /* Fix for label issue with many components. Need to have label after component. */
    $(".u-TF-item--checkbox").each(function() {
        $(this).after($(this).siblings("label"));
    });
}

function initIR() {
    if (!$('.a-IRR-table').hasClass("table-responsive")) {
        $(".a-IRR-search-field")
            .attr("placeholder", $(".a-IRR-sortWidget-searchLabel span").text())
            .parent().addClass("input-field");

        $(".a-IRR-button--actions").html('<i class="material-icons">more_vert</i>').show();
        $(".a-IRR-button--colSearch").html('<i class="material-icons">search</i>').show();

        $('.a-IRR-table').addClass("table-responsive");

        $( ".a-IRR-table td" ).each(function( index ) {
            $(this)
                .attr("data-label",
                    $(this).closest('table')
                    .find('th')
                    .not(".a-IRR-header--group")
                    .eq($(this).index())
                    .find("a")
                    .ignore("span")
                    .text());
        });

        $(".a-IRR-header:not(.a-IRR-header--group)").closest("tr").addClass("a-IRR-header-tr");
        $(".a-IRR-header.a-IRR-header--group").closest("tr").addClass("a-IRR-header-tr--group");
    }

    $("[id*='_column_filter'], .a-IRR-dialogContent--highlight table table")
        .addClass("table-responsive")
        .find("td")
        .each(function( index ) {
            $(this).attr("data-label",$(this).closest('table').find('.a-IRR-dialogTable-header').eq($(this).index()).text());
        });

    $("[id*='_chart_type'] input[type='radio'], [id*='_default_type'] input[type='radio']").each(function(){
        $(this).after("<label for='" + $(this).attr("id") + "'></label>").parent().removeAttr("nowrap");
    });
}

function apexInit() {
    // Grid - Handling s12 default override
    $(".col.s12").each(function(){
        if ($(this).is(".s1,.s2,.s3,.s4,.s5,.s6,.s7,.s8,.s9,.s10,.s11")) {
            $(this).removeClass("s12");
        }
    });

    /* Fixed Action Button */
    $("a.fixed-action-btn").each(function(){
        var position = "";
        if ($(this).hasClass("fab-right")) position += "fab-right ";
        if ($(this).hasClass("fab-left")) position += "fab-left ";
        if ($(this).hasClass("fab-absolute")) position += "fab-absolute ";
        if ($(this).hasClass("horizontal")) position += "horizontal ";
        if ($(this).hasClass("click-to-toggle")) position += "click-to-toggle ";

        $(this).siblings(".btn, .btn-flat").addClass("btn-floating").removeClass("btn btn-flat");
        $(this).siblings(".btn-floating").addBack().wrapAll("<div class='fixed-action-btn " + position + "'>");
        $(this).siblings(".btn-floating").wrapAll("<ul>").wrap("<li>");
        $(this).removeClass("fixed-action-btn horizontal click-to-toggle fab-right fab-left fab-absolute");
    });
    $("div.fab-absolute").parent().addClass("fab-relative");

    // Vertical Alignment
    $(".valign-wrapper>.row").addClass("valign-wrapper");

    /* Fix for APEX  Select Template */
    $('select').closest('.input-field').removeClass('input-field');

    /* Parallax */
    $(".parallax-container").closest(".col").removeClass().closest(".row").removeClass();

    /* Display only & read only */
    $(".display_only")
        .siblings("label")
        .addClass("active display-only")
        .closest('.input-field')
        .addClass('display-only-container');

    /* Fieldset */
    $("fieldset.checkbox_group, fieldset.radio_group")
        .siblings("label")
        .addClass("active display-only")
        .closest('.input-field')
        .removeClass('input-field');

    /* Textarea */
    $("[id*='_CHAR_COUNTER']").each(function(){
        $(this).closest("div").siblings("textarea").attr("length",$(this).next().text());
    });

    $("[id*='_CHAR_COUNT']").remove();

    $( "fieldset.textarea" ).each(function() {
        $( this).prepend($(this).siblings());
    });

    $('textarea').addClass('materialize-textarea');

    /* Popup LOV */
    $("fieldset.lov").parent().addClass("ma-popuplov");

    /* Media */
    $(".apex-materialbox img").addClass("materialboxed responsive-img").each(function() {
        $(this).attr("data-caption",$(this).parent().attr("data-caption"));
        $(this).parent().removeAttr("data-caption");
    });

    /* Tooltips */
    $( "[data-tooltip][data-tooltip!='']" ).each(function() {
        $( this ).siblings("i").attr( "data-tooltip", $(this).attr("data-tooltip") );
    });

    /* Icons */
    $("i[class='']").remove();

    /* Search Bar */
    $(".top-nav li a i:contains('search')").parent().click(function(){
       $(".main-nav-wrapper").toggleClass("hide");
       $(".search-nav-wrapper").toggleClass("hide");
       $("#P0_SEARCH").focus();
    });

    $("#P0_SEARCH")
        .attr("type", "search")
        .blur(function (){
           $(".main-nav-wrapper").toggleClass("hide");
           $(".search-nav-wrapper").toggleClass("hide");
       });

    $(".ma-toast-close").click(function(){
        $(this).closest(".toast").remove();
    });

     $(".panel-close").click(function(){
         $(this).closest(".card-panel").remove();
     });

     $( "body" ).on( "apexafterclosedialog", function(e, data) {
         if (data.successMessage.text) {
             $('#toast-container').append('<div class="ma-success-message toast velocity-animating green lighten-2">' +
                '<div class="ma-success-message-content white-text">' + data.successMessage.text + '</div>' +
                '<i class="ma-toast-close material-icons right">close</i>' +
                '</div>');

            // relaunch close event
             $(".ma-toast-close").click(function(){
                 $(this).closest(".toast").remove();
             });
         }
     });
}

$(function() {
    apexInit();

    initIR();
    componentsInit();

    $( ".a-IRR-container" ).parent().on( "apexafterrefresh", function() {
        initIR();
        componentsInit();
    });

    $(document).ajaxSuccess(function() {
        initIR();
        componentsInit();
    });
});
