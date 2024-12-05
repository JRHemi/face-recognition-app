import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div className="ma4 mt0">
    <div className="ma2 ">
      <p className="f3-ns f4 ma0">
        {"This AI can identify faces within your photos."}
      </p>
      <p className="f3-ns f4 ma0">
        {"Share an image link to give it a try!"}
      </p>
    </div>
      
      <div className="center">
        <div className="center pa4 br3 shadow-5">
          <input
            className="b mh1 br3 pa2 input-reset ba bg-transparent hover-white w-100"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="mh1 br3 grow f4 link ph2 pv2 dib white bg-transparent"
            onClick={onPictureSubmit}
          >
            Identify
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
