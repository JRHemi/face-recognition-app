import React from "react";
import "./ImageLinkForm.css"



const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  
  return (
    <div className="ma4 mt0">
      <p className="f3">
        {"This Arificial Brain will detect faces in your pictures. Give it a try!"}
      </p>
      <div className="center form">
        <div className="center pa4 br3 shadow-5">
            <input className="b br3 pa2 input-reset ba bg-transparent hover-white w-100"  type="text" onChange={onInputChange}/>
            <button className="w-30 br3 grow f4 link ph2 pv2 dib white bg-transparent" onClick={onPictureSubmit}>Detect</button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm