import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as fabric from "fabric";
import { loadScene, saveScene } from "../firebase";
import Toolbar from "./Toolbar";
import CanvasBoard from "./CanvasBoard";
import useHistory from "../hooks/useHistory";

const GRID_SIZE = 20; // Snap-to-grid size

const CanvasEditor = () => {
  const { id } = useParams();
  const location = useLocation();
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  const [tool, setTool] = useState("select");
  const [color, setColor] = useState("#000000");
  const [isViewOnly, setIsViewOnly] = useState(false);

  const { push, undo, redo } = useHistory();

  // Debounce helper
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const saveToFirestore = () => {
    if (!fabricRef.current) return;
    const json = fabricRef.current.toJSON();
    saveScene(id, json);
    push(JSON.stringify(json));
  };
  const debouncedSave = useCallback(debounce(saveToFirestore, 500), [id]);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const viewOnly = new URLSearchParams(location.search).get("viewOnly") === "true";
    setIsViewOnly(viewOnly);

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth - 100,
      height: window.innerHeight - 200,
      backgroundColor: "#f3f3f3",
      selection: true,
    });
    fabricRef.current = canvas;

    // Brush setup
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 3;
    canvas.freeDrawingBrush.color = color;

    // Load saved scene
    const load = async () => {
      try {
        const sceneData = await loadScene(id);
        if (sceneData && Object.keys(sceneData).length > 0) {
          canvas.loadFromJSON(sceneData, () => {
            canvas.renderAll();
            push(JSON.stringify(canvas.toJSON()));
          });
        }
      } catch (err) {
        console.error("Failed to load canvas JSON:", err);
      }
    };
    load();

    if (!viewOnly) {
      // Snap to grid
      canvas.on("object:moving", (e) => {
        const obj = e.target;
        if (obj) {
          obj.set({
            left: Math.round(obj.left / GRID_SIZE) * GRID_SIZE,
            top: Math.round(obj.top / GRID_SIZE) * GRID_SIZE,
          });
        }
      });

      // Auto-save
      ["object:added", "object:modified", "object:removed", "path:created"].forEach((evt) => {
        canvas.on(evt, debouncedSave);
      });
    }

    // Responsive
    const resizeCanvas = () => {
      canvas.setDimensions({ width: window.innerWidth - 100, height: window.innerHeight - 200 });
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      canvas.dispose();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [id, location.search]);

  // Update tool mode
  useEffect(() => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;

    if (tool === "pen") {
      canvas.isDrawingMode = true;
      canvas.selection = false;
      canvas.forEachObject((obj) => (obj.selectable = false));
    } else {
      canvas.isDrawingMode = false;
      canvas.selection = true;
      canvas.forEachObject((obj) => {
        obj.selectable = true;
        obj.evented = true;
      });
    }
    canvas.renderAll();
  }, [tool]);

  // Update brush color
  useEffect(() => {
    if (fabricRef.current?.freeDrawingBrush) {
      fabricRef.current.freeDrawingBrush.color = color;
    }
  }, [color]);

  // Undo/Redo
  const handleUndo = () => {
    const prev = undo();
    if (prev && fabricRef.current) {
      fabricRef.current.loadFromJSON(prev, () => fabricRef.current.renderAll());
    }
  };

  const handleRedo = () => {
    const next = redo();
    if (next && fabricRef.current) {
      fabricRef.current.loadFromJSON(next, () => fabricRef.current.renderAll());
    }
  };

  // Add shape or text
  const addShape = useCallback(
    (shape) => {
      if (isViewOnly || !fabricRef.current) return;
      let obj;
      const canvas = fabricRef.current;

      if (shape === "rectangle") {
        obj = new fabric.Rect({
          left: 100,
          top: 100,
          width: 120,
          height: 80,
          fill: color,
          stroke: color,
          strokeWidth: 2,
          selectable: true,
        });
      } else if (shape === "circle") {
        obj = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: color,
          stroke: color,
          strokeWidth: 2,
          selectable: true,
        });
      } else if (shape === "text") {
        obj = new fabric.Textbox("", {
          left: 100,
          top: 100,
          width: 200,
          fontSize: 20,
          fill: color,
          selectable: true,
          editable: true,
        });

        // Enter editing mode immediately
        canvas.setActiveObject(obj);
        obj.enterEditing();
        obj.selectAll();
      }

      if (obj) {
        canvas.add(obj);
        canvas.setActiveObject(obj);
        canvas.renderAll();
        setTool("select");
      }
    },
    [color, isViewOnly, setTool]
  );

  // Delete object
  const deleteSelected = useCallback(() => {
    if (!fabricRef.current) return;
    const activeObjects = fabricRef.current.getActiveObjects();
    if (activeObjects.length) {
      fabricRef.current.remove(...activeObjects);
      fabricRef.current.discardActiveObject();
      fabricRef.current.renderAll();
    }
  }, []);

  // Clear canvas
  const clearCanvas = useCallback(() => {
    if (!fabricRef.current) return;
    fabricRef.current.clear();
    fabricRef.current.backgroundColor = "#f3f3f3";
    fabricRef.current.renderAll();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isViewOnly) return;

      // Check if a text object is being edited
      const activeObject = fabricRef.current?.getActiveObject();
      if (activeObject && activeObject.isEditing) {
        return; // Allow normal text editing behavior (including backspace)
      }

      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "z":
            e.preventDefault();
            e.shiftKey ? handleRedo() : handleUndo();
            break;
          case "y":
            e.preventDefault();
            handleRedo();
            break;
        }
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        deleteSelected();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo, deleteSelected, isViewOnly]);

  return (
    <div className="container mx-10 p-2">
      <Toolbar
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        isViewOnly={isViewOnly}
        fabricRef={fabricRef}
        undo={handleUndo}
        redo={handleRedo}
        addShape={addShape}
        deleteSelected={deleteSelected}
        clearCanvas={clearCanvas}
      />
      <CanvasBoard canvasRef={canvasRef} />
    </div>
  );
};

export default CanvasEditor;