$(document).on('ready', function() {
  console.log('sanity check!');
});

$('form').on('submit', function(event) {
  event.preventDefault();

  var char1 = encodeURI($('#character1').val());
  var char2 = encodeURI($('#character2').val());

  if (char2 === '') {
    oneCharSearch(char1);
  } else {
    twoCharSearch(char1, char2);
  }
});

function oneCharSearch(name1) {

  $.ajax({
    url:'https://gateway.marvel.com/v1/public/characters?name=' + name1 + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
    method: 'GET'
  }).done(function(char1Info) {
    var idChar1 = char1Info.data.results[0].id;
    console.log(idChar1);

    $.ajax({
      url:'https://gateway.marvel.com:443/v1/public/characters/' + idChar1 + '/comics?format=comic&formatType=comic&noVariants=true&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
      method: 'GET'
    }).done(function(char1Comics) {
      var char1List = char1Comics.data.results;
      console.log(char1List);

      var counter = 0;

      char1List.forEach(function(result1) {

        $('.results-list').append('<div class="row"><img src="' + result1.thumbnail.path + '/portrait_uncanny.jpg"><h5>' + result1.title + '</h5><span class="creator-info"></span><p>' + result1.description + '</p></div>');

        result1.creators.items.forEach(function(creator) {
          $('.creator-info:eq(' + counter + ')' ).append('<p>' + creator.name + ', ' + creator.role + '</p>');
        });
        counter++;
      });

    });

  });
}

function twoCharSearch(name1, name2) {

  $.ajax({
    url:'https://gateway.marvel.com/v1/public/characters?name=' + name1 + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
    method: 'GET'
  }).done(function(char1Info) {
    var idChar1 = char1Info.data.results[0].id;
    console.log(idChar1);

    $.ajax({
      url:'https://gateway.marvel.com:443/v1/public/characters/' + idChar1 + '/comics?format=comic&formatType=comic&noVariants=true&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
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
          url:'https://gateway.marvel.com:443/v1/public/characters/' + idChar2 + '/comics?format=comic&formatType=comic&noVariants=true&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
          method: 'GET'
        }).done(function(char2Comics) {
          var char2List = char2Comics.data.results;
          console.log(char2List);

          var counter = 0;

          char1List.forEach(function(result1) {
            char2List.forEach(function(result2) {
              if (result1.id === result2.id) {
                $('.results-list').append('<div class="row"><img src="' + result1.thumbnail.path + '/portrait_uncanny.jpg"><h5>' + result1.title + '</h5><span class="creator-info"></span><p>' + result1.description + '</p></div>');

                result1.creators.items.forEach(function(creator) {
                  $('.creator-info:eq(' + counter + ')' ).append('<p>' + creator.name + ', ' + creator.role + '</p>');
                });
                counter++;
              }
            });
          });

        });

      });

    });

  });
}

// function twoCharSearch(name1, name2) {
//   $.ajax({
//     url:'https://gateway.marvel.com/v1/public/characters?name=' + name1 + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
//     method: 'GET'
//   }).done(function(char1Info) {
//     var idChar1 = char1Info.data.results[0].id;
//     console.log(idChar1);
//
//     $.ajax({
//       url:'https://gateway.marvel.com/v1/public/characters?name=' + name2 + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
//       method: 'GET'
//     }).done(function(char2Info) {
//       var idChar2 = char2Info.data.results[0].id;
//       console.log(idChar2);
//
//       $.ajax({
//         url:'https://gateway.marvel.com:443/v1/public/characters/' + idChar1 + '/comics?sharedAppearances=' + idChar2 + '&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
//         method: 'GET'
//       }).done(function(sharedComics) {
//         console.log(sharedComics);
//         var resultsArray = sharedComics.data.results;
//         resultsArray.forEach(function(eachComic) {
//           console.log(eachComic);
//           $('.results-list').append('<div class="row"><h5><img src="' + eachComic.thumbnail.path + '/portrait_medium.jpg"> ' + eachComic.title + '</h5><p>' + eachComic.description + '</p></div>');
//         });
//       });
//     });
//   });
// }
