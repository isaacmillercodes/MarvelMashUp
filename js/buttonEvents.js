$(document).on('ready', function() {
  console.log('button sanity!');
});

$('.dateButton').on('click', function(event) {
  event.preventDefault();

  // $('.addDateRange').text('Remove Date Range');

  $('.dateChoices').append('<input type="radio" name="dates" id="goldenAge" value="goldenAge"/>Golden Age (1938-1955)<input type="radio" name="dates" id="silverAge" value="silverAge"/>Silver Age (1956-1970)<br><input type="radio" name="dates" id="bronzeAge" value="bronzeAge"/>Bronze Age (1971-1985)<input type="radio" name="dates" id="modernAge" value="modernAge"/>Modern Age (1986-present)<span class="custom-date"><input type="radio" name="dates" id="customRange" value="customRange"/>Custom Dates:</span><div class="row date-inputs">Start Date:<input type="date" id="startDate"><br>End Date:<input type="date" id="endDate"></div>');

  $('.dateButton').remove();

  // $('.dateChoices').prepend('<button type="button" name="button" class="removeDateRange">Remove Date Range</button><br>');

});

// $('.removeDateRange').on('click', function (event) {
//   event.preventDefault();
//
//   $('.dateChoices').remove();
//
//   $('.removeDateRange').remove();
//
//   $('.dateRange').append('<button type="button" name="button" class="addDateRange">Add Date Range for Results?</button>');
//
// });
//
// $('.addDateRange').on('click', function (event) {
//   event.preventDefault();
//
//   $('.dateRange').append('<button type="button" name="button" class="removeDateRange">Remove Date Range</button>');
//
// });



  // $('.date-range').prepend('<button type="button" name="button" class="removeDateRange">Remove Date Range</button>');

  // $('.dateChoices').append('<input type="radio" name="dates" id="goldenAge" value="goldenAge"/>Golden Age (1938-1955)<input type="radio" name="dates" id="silverAge" value="silverAge"/>Silver Age (1956-1970)<br><input type="radio" name="dates" id="bronzeAge" value="bronzeAge"/>Bronze Age (1971-1985)<input type="radio" name="dates" id="modernAge" value="modernAge"/>Modern Age (1986-present)<span class="custom-date"><input type="radio" name="dates" id="customRange" value="customRange"/>Custom Dates:</span><div class="row date-inputs">Start Date:<input type="date" id="startDate" required><br>End Date:<input type="date" id="endDate" class="end-date" required></div>');
