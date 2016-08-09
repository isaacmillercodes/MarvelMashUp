// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
});

$('form').on('submit', function(event) {
  event.preventDefault();

  var char1 = encodeURI($('#character1').val());
  var char2 = encodeURI($('#character2').val());

  $.ajax({
    url:'https://gateway.marvel.com/v1/public/characters?name=' + char1 + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
    method: 'GET'
  }).done(function(char1Info) {
    var idChar1 = char1Info.data.results[0].id;
    console.log(idChar1);

    $.ajax({
      url:'https://gateway.marvel.com:443/v1/public/characters/' + idChar1 + '/comics?apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
      method: 'GET'
    }).done(function(char1Comics) {
      var resultsArray = char1Comics.data.results;
      resultsArray.forEach(function(eachComic) {
        console.log(eachComic);
        $('.results-list').append('<div class="row"><h5><img src="' + eachComic.thumbnail.path + '/portrait_medium.jpg"> ' + eachComic.title + '</h5><p>' + eachComic.description + '</p></div>');
      });
    });
  });
});

// https://gateway.marvel.com:443/v1/public/characters/1009718/comics?orderBy=onsaleDate&apikey=f0807a37bd4542fa4a26ada4b33c8f5d

// $.ajax({
//   url:'https://gateway.marvel.com/v1/public/characters?name=' + char2 + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
//   method: 'GET'
// }).done(function(char2Info) {
//   console.log(char2Info);
// });
//http://gateway.marvel.com:80/v1/public/characters?name=Wolverine&apikey=f0807a37bd4542fa4a26ada4b33c8f5d

//https://gateway.marvel.com:443/v1/public/characters?name=wolverine&apikey=f0807a37bd4542fa4a26ada4b33c8f5d
