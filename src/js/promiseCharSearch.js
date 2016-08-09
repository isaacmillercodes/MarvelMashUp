$(document).on('ready', function() {
  console.log('sanity check!');
});

//helper functions

function getCharId(character) {
  return new Promise(function(resolve, reject) {

    $.ajax({
        url:'https://gateway.marvel.com/v1/public/characters?name=' + character + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
        method: 'GET'
      })
      .done(function(charInfo) {
        var idChar = charInfo.data.results[0].id;
        //console.log(idChar);
        return resolve(idChar);
      })
      .fail(function(err) {
        return reject(err);
      });
  });
}

// function getComicsList(id) {
//   return new Promise(function(resolve, reject) {
//     console.log(id);
//     $.ajax({
//       url:'https://gateway.marvel.com:443/v1/public/characters/' + id + '/comics?apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
//       method: 'GET'
//     })
//     .done(function(charComics) {
//       var comicList = charComics.data.results;
//       //console.log(comicList);
//       return resolve(comicList);
//     })
//     .fail(function(err) {
//       return reject(err);
//     });
//   });
// }

function getComicsList(id1, id2) {
  return new Promise(function(resolve, reject) {
    //console.log(id);
    $.ajax({
      url: 'https://gateway.marvel.com:443/v1/public/characters/' + id1 + '/comics?sharedAppearances=' + id2 + '&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
      method: 'GET'
    })
    .done(function(charComics) {
      var comicList = charComics.data.results;
      //console.log(comicList);
      return resolve(comicList);
    })
    .fail(function(err) {
      return reject(err);
    });
  });
}

//Event handler

$('form').on('submit', function(event) {
  event.preventDefault();

  var char1 = encodeURI($('#character1').val());
  var char2 = encodeURI($('#character2').val());

  // var sharedList = getCharId(char1)
  //   .then(function(charId) {
  //   var id1 = charId;
  //   return getCharId(char2);
  // })
  //   .then(function(charId) {
  //   var id2 = charId;
  //   return getComicsList(id1, id2);
  // });

  var allIds = [getCharId(char1), getCharId(char2)];

  Promise.all(allIds).then(function(ids) {
    console.log(getComicsList(allIds[0], allIds[1]));
  });

  //console.log(sharedList);

  //console.log(char1List);
  //console.log(char2List);

  //var char2Id = getCharId(char2);

  // getComicsList(char1Id);

});
