import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <>
    {(entries > 0) ?(
    <div className="ma4 mt0">
      <div className="white f3">{`Congrats ${name} ,`}</div>
      <div className="white f3">{`you have identified`}</div>
      <div className="white f1">{(entries === 1) ? (`${entries} face!!`) :(`${entries} faces!!`)}</div>
    </div>
  ) : (
    <div className="ma4 mt0">
      <div className="white f3">{`Welcome ${name} ,`}</div>
    </div>
  )}
  </>
  );
};

export default Rank;
