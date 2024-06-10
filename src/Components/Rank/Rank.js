import React from "react";

const Rank = ({name, entries}) => {
  return (
    <div className="ma4 mt0">
        <div className="white f3">
            {`Congrats ${name} , you have found`}
        </div>
        <div className="white f1">
            {`${entries} friends!!`}
        </div>
    </div>
  );
};

export default Rank