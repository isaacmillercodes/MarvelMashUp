$(document).on('ready', function() {
  console.log('sanity check #2!');
});
//more promises
$('form').on('submit', function(event) {
  event.preventDefault();

  $('.no-results').remove();

  $('.no-values').remove();

  $('.result').remove();

  var allArray = [];
  var valArray = [];

  allArray[0] = encodeURI($('#character1').val());
  allArray[1] = encodeURI($('#character2').val());
  allArray[2] = encodeURI($('#character3').val());
  allArray[3] = encodeURI($('#character4').val());
  allArray[4] = encodeURI($('#character5').val());
  allArray[5] = encodeURI($('#character6').val());

  console.log(allArray);

  for (var i = 0; i < allArray.length; i++) {
    if (allArray[i] !== '' && allArray[i] !== 'undefined') {
      valArray.push(allArray[i]);
    }
  }

  console.log(valArray);

  if (valArray.length === 0) {
    $('.results-list').append('<div class="row no-values"><h5>Please enter at least one character name.</h5></div>');
  } else if (valArray.length === 1) {
    oneCharSearch(valArray[0]);
  } else if (valArray.length === 2) {
    twoCharSearch(valArray[0], valArray[1]);
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
