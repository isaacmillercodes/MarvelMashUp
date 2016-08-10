$(document).on('ready', function() {
  console.log('sanity check!');
});

// var testArray = [];
//
// testArray[0] = charSearch('wolverine');
// testArray[1] = charSearch('storm');
// testArray[2] = charSearch('cyclops');
//
// Promise.all(testArray).then(function(superArray) {
//   for (var i = 0; i < superArray.length; i++) {
//     appendList(superArray[i]);
//   }
// });

//character search

function charSearch(name) {
  return new Promise(function(resolve, reject) {

    $('.results-list').append('<div class="row loading"><h5>Grabbing your comics...</h5></div>');

    $.ajax({
      url:'https://gateway.marvel.com/v1/public/characters?name=' + name + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
      method: 'GET'
    }).done(function(charInfo) {
      var idChar = charInfo.data.results[0].id;
      console.log(idChar);

      $.ajax({
        url:'https://gateway.marvel.com:443/v1/public/characters/' + idChar + '/comics?format=comic&formatType=comic&noVariants=true&orderBy=-onsaleDate&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
        method: 'GET'
      }).done(function(charComics) {
        var charList = charComics.data.results;
        resolve(charList);

        $('.loading').remove();

      }).fail(function(err) {
        console.log(err);
      });
    });
  });
}

function compareLists(arrayOfArrays) {

  var combinedList = [];

  for (var i = 0; i < arrayOfArrays.length; i++) {
    arrayOfArrays[i].forEach(function(array) {

    });
  }

  // char1List.forEach(function(result1) {
  //   char2List.forEach(function(result2) {
  //     if (result1.id === result2.id) {
  //       combinedList.push(result1);
  //     }
  //   });
  // });

  console.log(combinedList);

  if (combinedList.length > 0) {
    appendList(combinedResult);
  } else {

    $('.results-list').append('<div class="row no-results"><h5>No issues found! Try again.</h5></div>');

  }

}
