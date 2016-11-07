'use strict';

/**
 * @ngdoc function
 * @name insideApp.component:Links
 * @description
 * # My Links j-query
 * My Links j-query functions for sorting, updating index positions in arrays, and simulating click away for the insideApp
 */
function doSort() {
    var myLinksHeight;
    var startPos;
    $(".groupsSortable").sortable({
        items: "> .list-group-item, > :not(.notSortable)",
        handle: '.snl-icon-draggable-lg',
        forceHelperSize: false,
        dropOnEmpty: true,
        forcePlaceholderSize: false,
        connectWith: '.groupsSortable',
        placeholder: 'groupPlaceholder',
        axis: "xy",
        start: function (e, ui) {
            startPos = ui.item.index() - 1; // ordinal numbering.  The buttons at the top of the portet
            // are in a li too.  Subtract 1 to get the correct index.
             ui.placeholder.height(ui.item.outerHeight());
        },

        stop: function(e, ui) {
            var groupId = ui.item[0].getAttribute('groupid');
            var stopPos = ui.item.index() - 1 ; // ordinal numbering.  The buttons at the top of the portet
            // are in a li too.  Subtract 1 to get the correct index.
            if( $('#ungroupedLinksHolder li').length ) {
                // order = order+1; // Temp group exists
            }

            angular.element('#LinksReport').scope().apiCtrl.groupEdit(groupId,null,startPos, stopPos, ui);

            // Fix for jquery UI sortable jumping when sortable list is located on the bottom
            // of the page.  A height for the container div is required for sortable but we
            // don't know what it is at run time because items are dynamic.  Before sorting begins,
            // get the height of the container.  This presents another problem because .height()
            // doesn't account for children elements with margins.
            $('.myLinksHeading').on('mousedown','.snl-icon-draggable-lg', function() {
                var containerHeight = $('#LinksReport').height(); // get the container height.
                var marginAdder = parseInt($('h4.myLinksHeading').last().css('margin-bottom')); // Get the last child margin
                var totalHeight = containerHeight+marginAdder; // add them together.
                myLinksHeight = $('.list-group-item').height();
                var dragHeight = myLinksHeight + marginAdder;
                $('#LinksReport').height(totalHeight); // Set the height of the container for smooth sorting.
                $('.list-group-item').height(dragHeight);
            });
        }
    });

    $(".linksSortable").sortable({
        axis: "xy",
        handle: '.snl-icon-draggable-sm',
        connectWith: ".linksSortable",
        forceHelperSize: true,
        dropOnEmpty: true,
        forcePlaceholderSize: false,
        placeholder: 'linkPlaceholder',
        //containment: '#links',
        //appendTo: "body",
        //helper: "clone",
        zIndex: 1000000,
          start: function(e, ui){
            ui.item.css('height', 'auto');
            ui.item.css('padding', '4px 0');
            ui.placeholder.height(ui.item.outerHeight());

        },
        stop:function(e, ui) {
            var linkId = ui.item[0].getAttribute('linkid');
            var order = ui.item.index()+1; // ordinal numbering
            var startGroupId =  ui.item[0].attributes.groupid.nodeValue;
            var endGroupId = ui.item[0].parentElement.parentElement.getAttribute('groupid'); // not ordinal
            angular.element('#LinksReport').scope().apiCtrl.linkEdit(linkId,null,null,null,endGroupId,startGroupId,order,ui);
            // ui.item.css('height', 'auto');
            ui.item.css('padding', '0px');
        }

    });


}

// Used for updating index positions in arrays.
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    //return this; // for testing purposes
};

// Click away function
$('body').click(function(event) {
    var target = $(event.target); // Grab the user clicking somewhere...
    // If it's anywhere but on the my link's input boxes, buttons, etc
    if(!target.is('#LinksReport input') && !target.is('#LinksReport button') && !target.is('#LinksReport polygon') && !target.is('#LinksReport svg') && !target.is('.addNewLinkNested') && !target.is('#LinksReport label') && !target.is('#LinksReport a') && !target.is('div.ngdialog-overlay') && !target.is('div.ngdialog-close')){
        // Loop through the ng-repeat items and set the view vars to false.
        $.each( angular.element('.ng-scope'),function() {
            $(this).scope().headingEditing = false;
            $(this).scope().linkEditing = false;
            $(this).scope().linkAdd = false;
        });
        // these are outside of the loop and only appear once.
        if (angular.element('#LinksReport').scope()) {
            angular.element('#LinksReport').scope().linkAddTop = false;
            angular.element('#LinksReport').scope().headingAdd = false;
            // run $apply() to take effect.
            angular.element('#LinksReport').scope().$apply();
        }
    }
})
