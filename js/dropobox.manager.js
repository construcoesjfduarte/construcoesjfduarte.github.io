let dropbox = new window.Dropbox.Dropbox({
  fetch: window.fetch,
  accessToken:
    "lI7i1pZGFBAAAAAAAAAGkKvOOMVGaT_LsH0DYZdyMquZOvvFjER_YZixfd9kEnD9"
});

let albuns = new Array();

dropbox
  .filesListFolder({ path: "" })
  .then(function(response) {
    let results = response.entries;
    let promises = [];

    for (let i = 0; i < results.length; i++) {
      if (results[i][".tag"] === "folder") {
        albuns.push({
          id: results[i].id,
          name: results[i].name,
          path: results[i].path_lower,
          files: []
        });
      }
    }
    albuns.forEach(album => {
      promises.push(
        dropbox.filesListFolder({ path: album.path }).then(function(response1) {
          let files = response1.entries;

          files.forEach(file => {
            if (file[".tag"] === "file") {
              album.files.push({
                name: file.name,
                path: file.path_lower,
                link: null
              });
            }
          });
        })
      );
    });

    /**
     * Sync filesListFolder
     */
    Promise.all(promises).then(_values => {
      let promises1 = [];

      /**
       *
       */
      albuns.forEach(album => {
        album.files.forEach(file => {
          promises1.push(
            dropbox
              .filesGetTemporaryLink({ path: file.path })
              .then(function(response2) {
                file.link = response2.link;
              })
          );
        });
      });

      /**
       * Sync filesGetTemporaryLink
       */
      Promise.all(promises1).then(_values => {
		console.log(albuns);
		displayAlbuns();
      });
    });
  })
  .catch(function(error) {
    //console.log(error);
  });

function displayAlbuns() {
  let container = document.getElementById("albuns");

  for (let i = 0; i < albuns.length; i++) {
    let name = document.createElement("h2");
    name.textContent = albuns[i].name;
    container.appendChild(name);

    for (let k = 0; k < albuns[i].files.length; k++) {
      let image = document.createElement("img");
      image.src = albuns[i].files[k].link;
      container.appendChild(image);
    }
  }
}
