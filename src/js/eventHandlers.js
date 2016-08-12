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

  var rangeSelected = $('input[name="dates"]:checked').val();

  var startDate = '';
  var endDate = '';

  if (rangeSelected === 'goldenAge') {
    startDate = new Date(1938, 01, 01);
    endDate = new Date(1955, 12, 31);
  } else if (rangeSelected === 'silverAge') {
    startDate = new Date(1956, 01, 01);
    endDate = new Date(1970, 12, 31);
  } else if (rangeSelected === 'bronzeAge') {
    startDate = new Date(1971, 01, 01);
    endDate = new Date(1985, 12, 31);
  } else if (rangeSelected === 'modernAge') {
    startDate = new Date(1986, 01, 01);
    endDate = new Date(2016, 12, 31);
  } else {
    startDate = $('#startDate').val();
    endDate = $('#endDate').val();
  }

  function charSearchArray(array) {
    for (var i = 0; i < array.length; i++) {
      array[i] = charSearch(array[i]);
    }
  }

  function yearSearchArray(array) {
    for (var i = 0; i < array.length; i++) {
      array[i] = yearCharSearch(array[i], startDate, endDate);
    }
  }

  if (rangeSelected !== undefined) {
    yearSearchArray(valArray);
  } else {
    charSearchArray(valArray);
  }

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
