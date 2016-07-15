'use strict';

$(document).ready(function() {
  // You code here
  // my gist https://api.github.com/users/wlittler/gists
  // local test http://localhost:8080/api/gists.json
  $.ajax('http://localhost:8080/api/gists.json', {
    success: function(response) {
      response.forEach(function(posts){
        var description = posts.description;
        if (description.indexOf('#post') > -1) {
          var str = description.slice(5);
          $('#posts').append('<li><a href="#" data-url="' + posts.url + '">' + str + '</a></li>');
        };
      $('a').click(function(event){
        event.preventDefault();
        console.log("clicky");
        $.ajax($(this).data('url'), {
          success: function(postData) {
            $('#post').html(marked(postData.files['post.md'].content));
            $('#blogtitle').html(postData.description.slice(5));
            var timestamp = postData.created_at;
            var y = timestamp.slice(0,4);
            var m = timestamp.slice(6,8);
            var d = timestamp.slice(9,11);
            var hrs = timestamp.slice(13,19);
            if (timestamp.slice(13,14) >= 12) {
              hrs = hrs - 12;
            };
            $('#postTime').html(hrs + ' ' + d + '/' + m + '/' + y);;
            $.ajax(postData['comments_url'], {
              success: function(response) {
                  response.forEach(function(getComments){
                    $('#comments').html(getComments['user']['login'] + ': ' + getComments.body);
                  });
              }
            });
          }
        });
      });
    });
  }
});
});
