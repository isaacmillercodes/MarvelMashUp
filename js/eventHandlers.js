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

  var dateSelected = $('input[name="dates"]:checked').val();

  var startDate = $('#startDate').val();

  var endDate = $('#endDate').val();

  console.log(dateSelected);

  console.log(startDate);

  console.log(endDate);

  for (var j = 0; j < valArray.length; j++) {
    valArray[j] = charSearch(valArray[j]);
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

$('.addDateRange').on('click', function(event) {
  event.preventDefault();

  $('.addDateRange').hide();

  // $('.date-range').prepend('<button type="button" name="button" class="removeDateRange">Remove Date Range</button>');

  $('.dateChoices').append('<input type="radio" name="dates" id="goldenAge" value="goldenAge"/>Golden Age (1938-1955)<input type="radio" name="dates" id="silverAge" value="silverAge"/>Silver Age (1956-1970)<br><input type="radio" name="dates" id="bronzeAge" value="bronzeAge"/>Bronze Age (1971-1985)<input type="radio" name="dates" id="modernAge" value="modernAge"/>Modern Age (1986-present)<span class="custom-date"><input type="radio" name="dates" id="customRange" value="customRange"/>Custom Dates:</span><div class="row date-inputs">Start Date:<input type="date" id="startDate"><br>End Date:<input type="date" id="endDate" class="end-date"></div>');

});
