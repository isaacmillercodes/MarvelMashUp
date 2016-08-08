$(document).on('ready', function() {
  console.log('sanity check!');
});

//helper functions

function getCharId(character) {
  return new Promise(function(resolve, reject) {

    $.ajax({
        url:'https://gateway.marvel.com/v1/public/characters?name=' + character + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
        method: 'GET'
      }).done(function(charInfo) {
        var idChar = charInfo.data.results[0].id;
        console.log(idChar);
      });
  });
};

function getComicsList(id) {

  return new Promise(function(resolve, reject) {

    $.ajax({
      url:'https://gateway.marvel.com:443/v1/public/characters/' + id + '/comics?apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
      method: 'GET'
    }).done(function(charComics) {

      return charComics.data.results

    });

  })
};

//Event handler

$('form').on('submit', function(event) {
  event.preventDefault();

  var char1 = encodeURI($('#character1').val());
  var char2 = encodeURI($('#character2').val());

  var char1List = getCharId(char1).then(function(charId) {
    getComicsList(charId);
  });


  //var char2Id = getCharId(char2);

  // getComicsList(char1Id);

});
