import React from "react";
import { useNavigate } from "react-router-dom";
import { initializeScene, saveScene } from "../firebase";
import { templates } from "../utils/templates";

const Home = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = async (template) => {
    const sceneId = await initializeScene();
    if (template.json) await saveScene(sceneId, template.json);
    navigate(`/canvas/${sceneId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold">Choose a Template to Start</h1>
      <div className="flex flex-wrap gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplateSelect(template)}
            className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition"
          >
            <div className="font-semibold mb-2">{template.name}</div>
            <div className="w-32 h-20 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
              Preview
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
