$(document).on('ready', function() {
  console.log('sanity check #3!');
});

$('form').on('submit', function(event) {
  event.preventDefault();

  $('.no-results').remove();

  $('.no-values').remove();

  $('.result').remove();

  $('.text-fields').prepend('<div class="row loading"><h5>Grabbing your comics...</h5></div>');

  var allArray = [];
  var valArray = [];

  allArray[0] = encodeURI($('#character1').val());
  allArray[1] = encodeURI($('#character2').val());
  allArray[2] = encodeURI($('#character3').val());
  allArray[3] = encodeURI($('#character4').val());
  allArray[4] = encodeURI($('#character5').val());
  allArray[5] = encodeURI($('#character6').val());

  //console.log(allArray);

  for (var i = 0; i < allArray.length; i++) {
    if (allArray[i] !== '' && allArray[i] !== 'undefined') {
      valArray.push(allArray[i]);
    }
  }

  //console.log(valArray);

  //conditional based on if dates are selected

  var rangeSelected = $('input[name="dates"]:checked').val();

  // var goldenStart = 1938-01-01;
  // var goldenEnd = 1955-12-31;
  //
  // var silverStart = 1956-01-01;
  // var silverEnd = 1970-12-31;
  //
  // var bronzeStart = 1971-01-01;
  // var bronzeEnd = 1985-12-31;
  //
  // var modernStart = 1971-01-01;
  // var modernEnd = 1985-12-31;

  // var customStart = $('#startDate').val();
  // var customEnd = $('#endDate').val();

  var startDate;
  var endDate;


  if (rangeSelected !== 'undefined') {
    if (rangeSelected === 'goldenAge') {
      startDate = 1938-01-01;
      endDate = 1955-12-31;
    } else if (rangeSelected === 'silverAge') {
      startDate = 1956-01-01;
      endDate = 1970-12-31;
    } else if (rangeSelected === 'bronzeAge') {
      startDate = 1971-01-01;
      endDate = 1985-12-31;
    } else if (rangeSelected === 'modernAge') {
      startDate = 1971-01-01;
      endDate = 1985-12-31;
    } else if (rangeSelected === 'customRange') {
      startDate = $('#startDate').val();
      endDate = $('#endDate').val();
    }
  }

  if (rangeSelected === 'undefined') {
    for (var j = 0; j < valArray.length; j++) {
      valArray[j] = charSearch(valArray[j]);
    }
  } else {
    for (var k = 0; k < valArray.length; k++) {
      valArray[k] = yearCharSearch(valArray[k], startDate, endDate);
    }
  }

  //console.log(valArray);

  //Refactor with promise.all()

  if (valArray.length === 0) {
    $('.loading').remove();
    $('.text-fields').prepend('<div class="row no-values"><h5>Please enter at least one character name.</h5></div>');
  } else {
    Promise.all(valArray).then(compareLists).then(function(finalList) {
      appendList(finalList);
      $('.loading').remove();
    });
  }

});

var counter = 1;

$('.addCharacter').on('click', function(event) {
  event.preventDefault();

  $('#character1').attr('class', 'four columns offset-by-two');

  counter++;

  if (counter < 7) {
    if (counter % 2 === 0) {
      $('.text-fields').append('<input type="text" class="four columns" placeholder="Enter character name here..." id="character' + counter + '">');
    } else {
      $('.text-fields').append('<input type="text" class="four columns offset-by-two" placeholder="Enter character name here..." id="character' + counter + '">');
    }
  }

});
