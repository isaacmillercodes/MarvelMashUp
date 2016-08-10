$(document).on('ready', function() {
  console.log('sanity check!');
});

//character search

//Refactor with promise.all()

function charSearch(name) {
  return new Promise(function(resolve, reject) {

    $('.results-list').append('<div class="row loading"><h5>Grabbing your comics...</h5></div>');

    $.ajax({
      url:'https://gateway.marvel.com/v1/public/characters?name=' + name + '&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
      method: 'GET'
    }).done(function(char1Info) {
      var idChar1 = char1Info.data.results[0].id;
      console.log(idChar1);

      $.ajax({
        url:'https://gateway.marvel.com:443/v1/public/characters/' + idChar1 + '/comics?format=comic&formatType=comic&noVariants=true&orderBy=-onsaleDate&limit=100&apikey=f0807a37bd4542fa4a26ada4b33c8f5d',
        method: 'GET'
      }).done(function(char1Comics) {
        var char1List = char1Comics.data.results;
        console.log(char1List);

        var counter = 0;

        $('.loading').remove();
      });
    });
  });
}
