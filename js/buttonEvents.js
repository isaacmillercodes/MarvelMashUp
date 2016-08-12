$(document).on('ready', function() {
  console.log('button sanity!');
});

$('.dateButton').on('click', function(event) {
  event.preventDefault();

  $('.dateChoices').prepend('<button type="button" name="button" class="removeDate">Remove Date Range</button><br>');

  $('.dateChoices').append('<input type="checkbox" name="dates" id="goldenAge" value="goldenAge"/>Golden Age (1938-1955)<input type="checkbox" name="dates" id="silverAge" value="silverAge"/>Silver Age (1956-1970)<br><input type="checkbox" name="dates" id="bronzeAge" value="bronzeAge"/>Bronze Age (1971-1985)<input type="checkbox" name="dates" id="modernAge" value="modernAge"/>Modern Age (1986-present)<input type="checkbox" name="dates" id="customRange" value="customRange"/>Custom Dates:<div class="row date-inputs">Start Date:<input type="date" id="startDate"><br>End Date:<input type="date" id="endDate"></div>');

  $('.dateButton').remove();

});

$(document).on('click', '.removeDate', function(event) {
  event.preventDefault();

  $('.dateChoices').hide();

  $('.removeDate').remove();

  $('.dateRange').append('<button type="button" name="button" class="addDate">Add Date Range for Results?</button>');

});

$(document).on('click', '.addDate', function(event) {
  event.preventDefault();

  $('.dateChoices').show();

  $('.addDate').remove();

  $('.dateChoices').prepend('<button type="button" name="button" class="removeDate">Remove Date Range</button>');

});

$(document).on('click', 'input[type="checkbox"]', function() {
  $(this).siblings(':checked').removeAttr('checked');
});
