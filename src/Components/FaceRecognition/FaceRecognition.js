import "./FaceRecognition.css";

// simple component (no state). Using a standard function
function FaceRecognition({ selectedImage, boxArray}) {

  function handleEvents(array) {
    if (array.length > 0) {
      return array.map((box, index) => (
        <div
          key={index}
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      ));
    }
  }

  return (
    <div className="center ma">
      <div className="absolute mt2">
        {selectedImage !== "" && (
          <>
            <img
              alt="face"
              id="inputimage"
              src={selectedImage}
              width="500px"
              height="auto"
            />
            {handleEvents(boxArray)}
          </>
        )}
      </div>
    </div>
  );
}

export default FaceRecognition;
