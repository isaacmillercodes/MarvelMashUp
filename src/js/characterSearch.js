// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
});

$('form').on('submit', function(event) {
  event.preventDefault();

  var char1 = encodeURI($('#character1').val());
  var char2 = encodeURI($('#character2').val());

  getList(char1, char2);

});

function getId(name) {

  var charName = encodeURI(name);

  $.ajax({
    url:'https://gateway.marvel.com/v1/public/characters?name=' + charName + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
    method: 'GET'
  }).done(function(charInfo) {
    var charId = charInfo.data.results[0].id;
    return charId;
  });
}

var idArray = [];

function getList(name1, name2) {

  getId(name1)
    .then(function(id) {
    idArray.push(id);
    return getId(name2);
  })
    .then(function(id) {
    idArray.push(id);
  })
    .then(function() {
      console.log(idArray);
      $.ajax({
        url: 'https://gateway.marvel.com:443/v1/public/characters/' + idArray[0] + '/comics?sharedAppearances=' + idArray[1] + '&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
        method: 'GET'
      }).done(function(sharedComics) {
        var resultsArray = sharedComics.data.results;
        console.log(resultsArray);
      });
  });
}


  // $.ajax({
  //   url: 'https://gateway.marvel.com:443/v1/public/characters/' + id1 + '/comics?sharedAppearances=' + id2 + '&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
  //   method: 'GET'
  // }).done(function(sharedComics) {
  //   var resultsArray = sharedComics.data.results;
  //   console.log(resultsArray);
    // resultsArray.forEach(function(eachComic) {
    //   console.log(eachComic);
    //   $('.results-list').append('<div class="row"><h5><img src="' + eachComic.thumbnail.path + '/portrait_medium.jpg"> ' + eachComic.title + '</h5><p>' + eachComic.description + '</p></div>');
    // });
//   });
// }
