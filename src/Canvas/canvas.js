import { useDrop } from "react-dnd";
import { useEffect } from "react";
import Widget from "../Widget/widget";
const Canvas = ({ widgets, setWidgets }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "WIDGET",
    drop: (item) => {
      setWidgets((prevWidgets) => [
        ...prevWidgets,
        { id: Date.now(), type: item.type, label: item.label, content: "" },
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    localStorage.setItem("widgets", JSON.stringify(widgets));
  }, [widgets]);

  const removeWidget = (id) => {
    setWidgets((prevWidgets) => prevWidgets.filter((widget) => widget.id !== id));
  };

  const updateWidgetContent = (id, newContent) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, content: newContent } : widget
      )
    );
  };

  return (
    <div
      ref={drop}
      className={`w-full md:w-3/4 p-6 min-h-screen bg-gray-100 rounded-lg shadow-md transition-all border-2 ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">🎨 Your Canvas</h2>
      <div className="grid gap-4">
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className="p-4 bg-white rounded-md shadow-md border border-gray-400 relative"
          >
            {Widget(widget, updateWidgetContent)}
            <button
              onClick={() => removeWidget(widget.id)}
              className="absolute top-1 right-1 p-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
