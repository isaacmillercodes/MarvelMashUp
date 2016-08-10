$(document).on('ready', function() {
  console.log('sanity check #2!');
});

function appendList(array) {
  var counter = 0;

  array.forEach(function(result) {

    var img = result.thumbnail.path;
    var title = result.title;
    var description = result.description;
    var learnMore = result.urls[0].url;
    var encodedTitle = title.replace(/\s/g,'+').replace(/#/g,'%23');

    $('.results-list').append('<div class="row result"><img src="' + img + '/portrait_uncanny.jpg"><h5>' + title + '</h5><span class="creator-info"></span><p>' + description + '</p><a class="learn-more" href="' + learnMore + '">Learn more about this issue</a><br><a class="amazon" href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' + encodedTitle + '">Buy this issue on Amazon</a></div>');

    result.creators.items.forEach(function(creator) {
      $('.creator-info:eq(' + counter + ')').append('<p>' + creator.name + ', ' + creator.role + '</p>');
    });
    counter++;
  });
}
