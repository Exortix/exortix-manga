BASE_URL = "https://mangabuddy.com"





$('#searchForm').submit( function(e){ 
    e.preventDefault();
})

let searchText = $('#searchText').val();
getMangas(searchText)

$('#searchForm').on("input", (e) => {
    searchText = $('#searchText').val();
    getMangas(searchText);
    e.preventDefault();
});

function getMangas(query) {
    var url;

    if (searchText.length < 2)
        url = `${BASE_URL}`;
    else
        url = `${BASE_URL}/search?q=${query}`

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {        
          var parser = new DOMParser();
          var doc = parser.parseFromString(xhr.responseText, "text/html");
          var mangas = doc.querySelectorAll('.section-body > .list > .book-item .thumb > a');

          let output = '';
          $.each(mangas, (index, manga) => {
            id = manga.pathname.slice(1)
            output += `
                <div onclick="window.location.href = 'manga/?id=${id}'" class="col manga rounded">
                    <img class = "rounded" src = "https:${manga.querySelector('img').getAttribute('data-src')}"/>
                    <h4>${manga.getAttribute('title')}</h4>
                    <p class="manga-overview">${(manga.querySelector('meta') != null) ? manga.querySelector('meta').innerText : ''}</p>
                </div>
            `;
          });
          $('#mangas > .row').html(output);
       }};
    
    xhr.send();
}