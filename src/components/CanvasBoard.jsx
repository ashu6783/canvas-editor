import React from "react";

const CanvasBoard = ({ canvasRef }) => {
  return <canvas ref={canvasRef} className="border border-gray-300" />;
};

export default CanvasBoard;
