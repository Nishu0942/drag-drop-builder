import DraggableWidget from '../DraggableWidget/DraggableWidget';

const widgetTypes = {
  TEXT: "Text",
  IMAGE: "Image",
  BUTTON: "Button",
  TABLE: "Table",
};

const WidgetPanel = () => {
  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="text-lg font-bold">Widgets</h2>
      {Object.entries(widgetTypes).map(([key, label]) => (
        <DraggableWidget key={key} type={key} label={label} />
      ))}
    </div>
  );
};

  export default WidgetPanel;