**Canvas Editor**
A web-based canvas editor built with React and Fabric.js, allowing users to create and edit drawings with features like freehand drawing, shapes, text, and snap-to-grid functionality. The application supports saving scenes to Firestore, undo/redo functionality, and view-only mode for sharing.

**Features**

Drawing Tools: Select, freehand drawing (pen), rectangles, circles, and text.
Snap-to-Grid: Objects snap to a 20x20 pixel grid for precise alignment.
Color Picker: Change the color of shapes and drawing strokes.
Undo/Redo: History management for undoing and redoing actions.
Lock/Unlock: Toggle object movability and editability.
Delete & Clear: Remove selected objects or clear the entire canvas.
Responsive Design: Canvas adjusts to window size.
Firestore Integration: Save and load canvas scenes to/from Firestore.
View-Only Mode: Share canvases in a non-editable state.
Error Handling: Graceful error boundaries with reload and home navigation options.
Templates: Start with predefined templates for quick setup.

**Tech Stack**

React: Frontend framework for building the UI.
Fabric.js: Canvas library for drawing and object manipulation.
React Router: Handles routing for home and canvas pages.
Firebase Firestore: Backend for saving and loading canvas scenes.
Tailwind CSS: Styling for a modern, responsive UI.
Custom Hooks: useHistory for managing undo/redo functionality.

**Installation**

Clone the Repository:
git clone <repository-url>
cd canvas-editor


**Install Dependencies:**
npm install


**Set Up Firebase:**

Create a Firebase project and enable Firestore.
Add your Firebase configuration to src/firebase.js.
Example configuration:import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);




Run the Application:
npm start

The app will be available at http://localhost:3000.


Usage

Home Page:

Navigate to / to select a template.
Click a template to create a new canvas scene and navigate to the editor.


**Canvas Editor:**

Access the editor at /canvas/:id.
Use the toolbar to:
Switch between Select and Pen tools.
Add Rectangle, Circle, or Text objects.
Change colors using the color picker.
Lock/unlock objects, undo/redo actions, delete selected objects, or clear the canvas.


**Snap-to-grid ensures precise object placement.**
Changes are auto-saved to Firestore with a 500ms debounce.


View-Only Mode:

Append ?viewOnly=true to the canvas URL (e.g., /canvas/:id?viewOnly=true) to share a non-editable version.


**Keyboard Shortcuts:**

Ctrl+Z or Cmd+Z: Undo
Ctrl+Shift+Z or Cmd+Shift+Z or Ctrl+Y: Redo
Delete or Backspace: Delete selected objects

**Dependencies**

react, react-dom: Core React libraries.
react-router-dom: For routing between home and canvas pages.
fabric: Fabric.js for canvas functionality.
firebase: Firestore for saving/loading scenes.
tailwindcss: For styling the UI.

**Development Notes**

Error Handling: The ErrorBoundary component catches errors and displays a user-friendly UI with reload and home navigation options.
History Management: The useHistory hook maintains a history stack (up to 50 states) for undo/redo.
Responsive Canvas: The canvas resizes based on window dimensions, with a 100px horizontal and 200px vertical offset.
Firestore: Scenes are saved as JSON in Firestore, with debounced auto-saving to prevent excessive writes.
View-Only Mode: Disables editing and toolbar interactions when enabled.

**Future Improvements**

Add more shapes (e.g., triangles, lines).
Implement zoom and pan functionality.
Support image uploads and annotations.
Enhance template previews with live canvas thumbnails.
Add user authentication for private canvases.



```Project Structure
src/
├── components/
│   ├── CanvasBoard.js       # Renders the Fabric.js canvas
│   ├── CanvasEditor.js      # Main editor component with Fabric.js logic
│   ├── ErrorBoundary.js     # Handles errors with a fallback UI
│   ├── Toolbar.js           # Toolbar for tool selection and actions
├── hooks/
│   ├── useHistory.js        # Custom hook for undo/redo functionality
├── pages/
│   ├── Home.js              # Home page with template selection
├── utils/
│   ├── templates.js         # Predefined templates for new canvases
├── firebase.js              # Firebase configuration and scene save/load functions
├── App.js                   # Main app with routing
├── index.js                 # Entry point


