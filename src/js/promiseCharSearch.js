$(document).on('ready', function() {
  console.log('sanity check!');
});

var testArray = [];

testArray[0] = charSearch('iron%20man');
testArray[1] = charSearch('captain%20america');
testArray[2] = charSearch('thor');

//This results in [Array[100], Array[100], Array[100]], where each internal array is an array of 100 objects
//
// Promise.all(testArray).then(function(superArray) {
//
//   console.log(superArray);
//
// });

// Promise.all(testArray).then(function(superArray) {
//   for (var i = 0; i < superArray.length; i++) {
//     appendList(superArray[i]);
//   }
// });

Promise.all(testArray).then(function(superArray) {
  compareLists(superArray);
}).then(function(finalList) {
  appendList(finalList);
});

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

  var totalArrays = arrayOfArrays.length;

  var combinedList = [];
  var allIssuesArray = [];
  var matchingIds = [];

  arrayOfArrays.forEach(function(innerArray) {
    innerArray.forEach(function(issue) {
      allIssuesArray.push(issue);
    });
  });

  var counts = {};
  allIssuesArray.forEach(function(issue) {
    counts[issue.id] = (counts[issue.id] || 0)+1;
  });

  var val;

  for(val in counts) {
    if (counts[val] === 3) {
      matchingIds.push(val);
    }
  }

  console.log(allIssuesArray);
  console.log(matchingIds);

  matchingIds.forEach(function(issueId) {
    arrayOfArrays[0].forEach(function(issue) {
      console.log(issueId);
      console.log(issue.id);
      if (issueId == issue.id) {
        combinedList.push(issue);
      }
    });
  });

  if (combinedList.length === 0) {
    $('.results-list').append('<div class="row no-results"><h5>No issues found! Try again.</h5></div>');
  }

  return combinedList;

}

function appendList(arr) {
  var counter = 0;

  arr.forEach(function(result) {

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
