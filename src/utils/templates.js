export const templates = [
  {
    id: "blank",
    name: "Blank Canvas",
    json: {}, // empty canvas
  },
  {
    id: "basic-shapes",
    name: "Basic Shapes",
    json: {
      objects: [
        { type: "rect", left: 50, top: 50, width: 100, height: 60, fill: "#FF0000" },
        { type: "circle", left: 200, top: 50, radius: 40, fill: "#00FF00" },
        { type: "textbox", left: 50, top: 150, width: 200, text: "Hello!", fontSize: 20, fill: "#0000FF" },
      ],
      background: "#f3f3f3",
    },
  },
  {
    id: "grid-layout",
    name: "Grid Layout",
    json: {
      objects: [
        { type: "rect", left: 20, top: 20, width: 80, height: 80, fill: "#FFC107" },
        { type: "rect", left: 120, top: 20, width: 80, height: 80, fill: "#03A9F4" },
        { type: "rect", left: 220, top: 20, width: 80, height: 80, fill: "#8BC34A" },
      ],
      background: "#f3f3f3",
    },
  },
];
