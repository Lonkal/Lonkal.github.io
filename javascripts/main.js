$(document).ready(function (){
  $(".btn").hover(
    function () {
      $(this).css("font-size", "150%");
    },
    function(){
      $(this).css("font-size", "100%")
    });
});
