$(document).on('ready', function() {
  console.log('sanity check!');
});

$('form').on('submit', function(event) {
  event.preventDefault();

  var char1 = encodeURI($('#character1').val());
  var char2 = encodeURI($('#character2').val());

  twoCharSearch(char1, char2);
});

function oneCharSearch(name) {
  $.ajax({
    url:'https://gateway.marvel.com/v1/public/characters?name=' + name + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
    method: 'GET'
  }).done(function(charInfo) {
    var idChar = charInfo.data.results[0].id;
    console.log(idChar);

    $.ajax({
      url:'https://gateway.marvel.com:443/v1/public/characters/' + idChar + '/comics?apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
      method: 'GET'
    }).done(function(charComics) {
      var resultsArray = charComics.data.results;
      resultsArray.forEach(function(eachComic) {
        console.log(eachComic);
        $('.results-list').append('<div class="row"><h5><img src="' + eachComic.thumbnail.path + '/portrait_medium.jpg"> ' + eachComic.title + '</h5><p>' + eachComic.description + '</p></div>');
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
      url:'https://gateway.marvel.com/v1/public/characters?name=' + name2 + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
      method: 'GET'
    }).done(function(char2Info) {
      var idChar2 = char2Info.data.results[0].id;
      console.log(idChar2);

      $.ajax({
        url:'https://gateway.marvel.com:443/v1/public/characters/' + idChar1 + '/comics?sharedAppearances=' + idChar2 + '&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
        method: 'GET'
      }).done(function(sharedComics) {
        console.log(sharedComics);
        // var resultsArray = sharedComics.data.results;
        // resultsArray.forEach(function(eachComic) {
        //   console.log(eachComic);
        //   $('.results-list').append('<div class="row"><h5><img src="' + eachComic.thumbnail.path + '/portrait_medium.jpg"> ' + eachComic.title + '</h5><p>' + eachComic.description + '</p></div>');
        // });
      });
    });
  });
}