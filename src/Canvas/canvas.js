import { useDrop, useDrag } from "react-dnd";
import { useEffect, useRef } from "react";
import Widget from "../Widget/widget";
import { X } from 'lucide-react';

const Canvas = ({ widgets, setWidgets }) => {
  const canvasRef = useRef(null);

  const updateWidgetContent = (id, newContent) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, content: newContent } : widget
      )
    );
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "WIDGET",
    drop: (item, monitor) => {
      if (!canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      const x = clientOffset.x - canvasRect.left;
      const y = clientOffset.y - canvasRect.top;

      setWidgets((prevWidgets) => {
        const existingWidget = prevWidgets.find((w) => w.id === item.id);
        if (existingWidget) {
          // Move existing widget
          return prevWidgets.map((w) =>
            w.id === item.id ? { ...w, x, y } : w
          );
        } else {
          // Add new widget from panel
          return [
            ...prevWidgets,
            { id: Date.now(), type: item.type, label: item.label, content: "", x, y },
          ];
        }
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    localStorage.setItem("widgets", JSON.stringify(widgets));
  }, [widgets]);


  return (
    <div
      ref={(node) => {
        drop(node);
        canvasRef.current = node;
      }}
      className={`relative w-full overflow-scroll h-screen bg-gray-100 rounded-lg shadow-md border-2 ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <h2 className="text-lg font-semibold p-4">🎨 Your Canvas</h2>
      {widgets.map((widget) => (
        <DraggableWidget key={widget.id} widget={widget} setWidgets={setWidgets} updateWidgetContent={updateWidgetContent}/>
      ))}
    </div>
  );
};

const DraggableWidget = ({ widget, setWidgets, updateWidgetContent }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WIDGET",
    item: { id: widget.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const removeWidget = () => {
    setWidgets((prevWidgets) => prevWidgets.filter((w) => w.id !== widget.id));
  };

  return (
    <div
      ref={drag}
      className="absolute p-4 bg-white rounded-md shadow-md border border-gray-400 cursor-move"
      style={{ left: widget.x, top: widget.y, opacity: isDragging ? 0.5 : 1 }}
    >
      {Widget(widget, updateWidgetContent)}
      <button
        onClick={removeWidget}
        className="absolute top-1 right-1 p-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        <X />
      </button>
    </div>
  );
};

export default Canvas;
