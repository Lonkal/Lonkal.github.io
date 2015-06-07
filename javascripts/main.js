$(document).ready(function (){
  $(".btn").hover(
    function () {
      $(this).css("font-size", "125%");
    },
    function(){
      $(this).css("font-size", "100%")
    });
});
