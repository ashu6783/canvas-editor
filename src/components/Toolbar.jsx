import React from "react";

const Toolbar = ({
  tool,
  setTool,
  color,
  setColor,
  isViewOnly,
  fabricRef,
  undo,
  redo,
  addShape,
  deleteSelected,
  clearCanvas,
}) => {
  const toggleLock = () => {
    const active = fabricRef.current?.getActiveObject();
    if (!active) return;
    const locked = active.lockMovementX;
    active.set({
      lockMovementX: !locked,
      lockMovementY: !locked,
      lockScalingX: !locked,
      lockScalingY: !locked,
      lockRotation: !locked,
    });
    fabricRef.current.renderAll();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 mb-6 border border-gray-100">
      <div className="flex flex-wrap items-center gap-3">
        {/* Tool Selection Group */}
        <div className="flex gap-2 p-2 bg-gray-50 rounded-xl">
          <button
            onClick={() => setTool("select")}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              tool === "select" 
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30" 
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              Select
            </span>
          </button>
          <button
            onClick={() => setTool("pen")}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              tool === "pen" 
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30" 
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Pen
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-10 w-px bg-gray-200"></div>

        {/* Shapes Group */}
        <div className="flex gap-2 p-2 bg-gray-50 rounded-xl">
          <button 
            onClick={() => addShape("rectangle")} 
            className="px-4 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white transition-all duration-200 border border-gray-200 font-medium"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
              </svg>
              Rectangle
            </span>
          </button>
          <button 
            onClick={() => addShape("circle")} 
            className="px-4 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white transition-all duration-200 border border-gray-200 font-medium"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth={2} />
              </svg>
              Circle
            </span>
          </button>
          <button 
            onClick={() => addShape("text")} 
            className="px-4 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white transition-all duration-200 border border-gray-200 font-medium"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Text
            </span>
          </button>
        </div>

        {/* Color Picker */}
        <div className="relative group">
          <label className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200">
            <div 
              className="w-8 h-8 rounded-lg shadow-inner border-2 border-white" 
              style={{ backgroundColor: color }}
            ></div>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="absolute opacity-0 w-0 h-0"
            />
          </label>
        </div>

        {/* Divider */}
        <div className="h-10 w-px bg-gray-200"></div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={toggleLock} 
            className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md shadow-purple-500/30 font-medium"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Lock
            </span>
          </button>
          <button 
            onClick={undo} 
            className="px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md font-medium"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Undo
            </span>
          </button>
          <button 
            onClick={redo} 
            className="px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md font-medium"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6-6m6 6l-6 6" />
              </svg>
              Redo
            </span>
          </button>
          <button 
            onClick={deleteSelected} 
            className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md shadow-red-500/30 font-medium"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </span>
          </button>
          <button 
            onClick={clearCanvas} 
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md shadow-amber-500/30 font-medium"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
