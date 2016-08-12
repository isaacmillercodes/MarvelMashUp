$(document).on('ready', function() {
  console.log('button sanity!');
});

$('.dateButton').on('click', function(event) {
  event.preventDefault();

  $('.dateChoices').append('<input type="checkbox" name="dates" id="goldenAge" value="goldenAge"/>Golden Age (1938-1955)<input type="checkbox" name="dates" id="silverAge" value="silverAge"/>Silver Age (1956-1970)<br><input type="checkbox" name="dates" id="bronzeAge" value="bronzeAge"/>Bronze Age (1971-1985)<input type="checkbox" name="dates" id="modernAge" value="modernAge"/>Modern Age (1986-present)<span class="custom-date"><input type="checkbox" name="dates" id="customRange" value="customRange"/>Custom Dates:</span><div class="row date-inputs">Start Date:<input type="date" id="startDate"><br>End Date:<input type="date" id="endDate"></div>');

  $('.dateButton').remove();

});

$(document).on("click", 'input[type="checkbox"]', function() {
    $(this).siblings(":checked").removeAttr('checked');
    // $('input[type="checkbox"]').hasAttr("checked").removeAttr('checked');
});
