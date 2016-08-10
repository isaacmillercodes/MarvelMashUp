$(document).on('ready', function() {
  console.log('sanity check!');
});

$('form').on('submit', function(event) {
  event.preventDefault();

  $('.no-results').remove();

  $('.result').remove();

  var char1 = encodeURI($('#character1').val());
  var char2 = encodeURI($('#character2').val());

  if (char2 === '') {
    oneCharSearch(char1);
  } else {
    twoCharSearch(char1, char2);
  }

});

function oneCharSearch(name1) {

  $('.results-list').append('<div class="row loading"><h5>Grabbing your comics...</h5></div>');

  $.ajax({
    url:'https://gateway.marvel.com/v1/public/characters?name=' + name1 + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
    method: 'GET'
  }).done(function(char1Info) {
    var idChar1 = char1Info.data.results[0].id;
    console.log(idChar1);

    $.ajax({
      url:'https://gateway.marvel.com:443/v1/public/characters/' + idChar1 + '/comics?format=comic&formatType=comic&noVariants=true&orderBy=-onsaleDate&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
      method: 'GET'
    }).done(function(char1Comics) {
      var char1List = char1Comics.data.results;
      console.log(char1List);

      var counter = 0;

      $('.loading').remove();

      char1List.forEach(function(result1) {

        var img = result1.thumbnail.path;
        var title = result1.title;
        var description = result1.description;
        var learnMore = result1.urls[0].url;
        var encodedTitle = title.replace(/\s/g,'+').replace(/#/g,'%23');

        $('.results-list').append('<div class="row result"><img src="' + img + '/portrait_uncanny.jpg"><h5>' + title + '</h5><span class="creator-info"></span><p>' + description + '</p><a class="learn-more" href="' + learnMore + '">Learn more about this issue</a><br><a class="amazon" href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' + encodedTitle + '">Buy this issue on Amazon</a></div>');

        result1.creators.items.forEach(function(creator) {
          $('.creator-info:eq(' + counter + ')').append('<p>' + creator.name + ', ' + creator.role + '</p>');
        });
        counter++;
      });

    });

  });
}

function twoCharSearch(name1, name2) {

  $('.results-list').append('<div class="row loading"><h5>Grabbing your comics...</h5></div>');

  $.ajax({
    url:'https://gateway.marvel.com/v1/public/characters?name=' + name1 + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
    method: 'GET'
  }).done(function(char1Info) {
    var idChar1 = char1Info.data.results[0].id;
    console.log(idChar1);

    $.ajax({
      url:'https://gateway.marvel.com:443/v1/public/characters/' + idChar1 + '/comics?format=comic&formatType=comic&noVariants=true&orderBy=-onsaleDate&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
      method: 'GET'
    }).done(function(char1Comics) {
      var char1List = char1Comics.data.results;
      console.log(char1List);

      $.ajax({
        url:'https://gateway.marvel.com/v1/public/characters?name=' + name2 + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
        method: 'GET'
      }).done(function(char2Info) {
        var idChar2 = char2Info.data.results[0].id;
        console.log(idChar2);

        $.ajax({
          url:'https://gateway.marvel.com:443/v1/public/characters/' + idChar2 + '/comics?format=comic&formatType=comic&noVariants=true&orderBy=-onsaleDate&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
          method: 'GET'
        }).done(function(char2Comics) {
          var char2List = char2Comics.data.results;
          console.log(char2List);

          var counter = 0;

          $('.loading').remove();

          var combinedList = [];

          char1List.forEach(function(result1) {
            char2List.forEach(function(result2) {
              if (result1.id === result2.id) {
                combinedList.push(result1);
              }
            });
          });

          console.log(combinedList);

          if (combinedList.length > 0) {

            combinedList.forEach(function(combinedResult) {

              var img = combinedResult.thumbnail.path;
              var title = combinedResult.title;
              var description = combinedResult.description;
              var learnMore = combinedResult.urls[0].url;
              var encodedTitle = title.replace(/\s/g,'+').replace(/#/g,'%23');

              $('.results-list').append('<div class="row result"><img src="' + img + '/portrait_uncanny.jpg"><h5>' + title + '</h5><span class="creator-info"></span><p>' + description + '</p><a class="learn-more" href="' + learnMore + '">Learn more about this issue</a><br><a class="amazon" href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=' + encodedTitle + '">Buy this issue on Amazon</a></div>');

              combinedResult.creators.items.forEach(function(creator) {
                $('.creator-info:eq(' + counter + ')').append('<p>' + creator.name + ', ' + creator.role + '</p>');
              });
              counter++;

            });

          } else {

            $('.results-list').append('<div class="row no-results"><h5>No issues found! Try again.</h5></div>');

          }

        });

      });

    });

  });
}
