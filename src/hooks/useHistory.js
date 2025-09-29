import { useState, useCallback } from "react";

const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const push = useCallback((state) => {
    if (history.length > 0 && history[history.length - 1] === state) {
      return;
    }

    setHistory((prev) => {
      const newHistory = [...prev, state];
      if (newHistory.length > 50) {
        return newHistory.slice(-50);
      }
      return newHistory;
    });
    
    setCurrentIndex((prev) => prev + 1);
    setRedoStack([]); // Clear redo stack on new action
  }, [history]);

  const undo = useCallback(() => {
    if (history.length <= 1 || currentIndex < 1) return null;
    
    const prevState = history[currentIndex - 1];
    setRedoStack((prev) => [history[currentIndex], ...prev]);
    setCurrentIndex((prev) => prev - 1);
    
    return prevState;
  }, [history, currentIndex]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return null;
    
    const nextState = redoStack[0];
    setHistory((prev) => [...prev, nextState]);
    setRedoStack((prev) => prev.slice(1));
    setCurrentIndex((prev) => prev + 1);
    
    return nextState;
  }, [redoStack]);

  const canUndo = history.length > 1 && currentIndex > 0;
  const canRedo = redoStack.length > 0;

  const clear = useCallback(() => {
    setHistory([]);
    setRedoStack([]);
    setCurrentIndex(-1);
  }, []);

  return { 
    history, 
    push, 
    undo, 
    redo, 
    canUndo, 
    canRedo, 
    clear 
  };
};

export default useHistory;