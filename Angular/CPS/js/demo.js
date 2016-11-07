angular.module('processApp', [])
    .controller('processController', function() {
      var processCtrl = this;
      processCtrl.data =  data;
    });


var $StepLinks;
jQuery(document).ready(function(){
  $('button.pStep').on('click', function(event) {
    var $this = $(this);
    var myID = $this.attr("id");
    myID = "#" + myID + "content";
    var $content = $(myID);
    clearContent();
    $content.toggleClass('hide');
    scrolltocontent();
  });
  $StepLinks = $(".step-links");
});

function clearContent(){
  $("#stepContentContainer>div").addClass('hide');
}
function scrolltocontent(){
  var offset = $StepLinks.offset();
  $(document).scrollTop(offset.top);

}

function toggleChild(obj){
  var $obj = $(obj);
  var $child = $obj.next("ul");
  $child.toggleClass('hide');
  return false;
}