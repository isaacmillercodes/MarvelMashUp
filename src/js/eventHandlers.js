// var oneCharSearch = require('./searchFunctions.js');
// var twoCharSearch = require('./searchFunctions.js');

$(document).on('ready', function() {
  console.log('sanity check #2!');
});

$('form').on('submit', function(event) {
  event.preventDefault();

  $('.no-results').remove();

  $('.result').remove();

  var char1 = encodeURI($('#character1').val());

  oneCharSearch(char1);

});

$('.addCharacter').on('click', function(event) {
  event.preventDefault();

  $('#character1').attr('class', 'four columns offset-by-two');

  $('.text-fields').append('<input type="text" class="four columns" placeholder="Enter character name here..." id="character2">');

});
