import { first } from "lodash";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
// import optional lightbox plugins
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const Album = ({ name, photos }) => {
  const [open, setOpen] = useState(false);
  const cover = first(Object.values(photos));

  if (!cover) {
    return "";
  }

  const showAlbum = () => {
    setOpen(true);
  };

  const closeAlbum = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="album col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="crop-image-1-1">
          <img src={cover} className="album-image" alt={name} />
          <div className="album-name">
            <div className="album-name-click" onClick={showAlbum} />
            <p>{name}</p>
            <p className="show-more">Ver Mais</p>
            <div className="album-click-mobile" onClick={showAlbum}></div>
          </div>
        </div>
      </div>
      <Lightbox
        open={open}
        close={closeAlbum}
        slides={Object.values(photos).map((path) => ({ src: path }))}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  );
};

export default Album;
