import DraggableWidget from '../DraggableWidget/DraggableWidget';

const widgetTypes = {
  TEXT: 'Text',
  IMAGE: 'Image',
  BUTTON: 'Button',
  TABLE: 'Table',
}
const WidgetPanel = ({onAddWidget}) => {
    return (
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Widgets</h2>
      <div className="space-y-3">
        {Object.entries(widgetTypes).map(([key, label]) => (
          <DraggableWidget key={key} type={key} label={label} />
        ))}
      </div>
    </div>
    )
  }

  export default WidgetPanel;