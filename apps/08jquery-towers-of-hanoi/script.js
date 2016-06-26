'use strict';

$(document).ready(function() {
  // Put app logic here
  var $block = null;
  var blockSize1 = 0;
  var blockSize2 = 0;
  $('[data-stack]').click(function(){
    if ($block === null) {
      var lastChild = $(this).children().last();
      $block = lastChild.detach();
      blockSize1 = parseInt($block.data('block'));
      // console.log($block);
    }
    else {
      var targetStack = $(this).children().last();
      if ($(this).children().length > 0) {
        blockSize2 = parseInt(targetStack.data('block'));
        if (blockSize1 < blockSize2) {
          $(this).append($block);
          $block = null;
        }
       }
       else {
         $(this).append($block);
         $block = null;
       }
    }
  });
});
