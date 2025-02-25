import TableComponent from "../TableComponent/TableComponent";
import UploadImage from "../UploadImage/UploadImage";
const Widget = (widget, updateWidgetContent) => {
    switch (widget.type) {
      case "TEXT":
        return (
          <input
            type="text"
            value={widget.content}
            onChange={(e) => updateWidgetContent(widget.id, e.target.value)}
            placeholder="Enter text..."
            className="p-2 border border-gray-400 rounded w-full"
          />
        );
      case "IMAGE":
        return <UploadImage />;
      case "BUTTON":
        return <button className="p-2 w-full bg-green-500 text-white rounded hover:bg-green-600 transition">
        {widget.content || "Click Me"}
      </button>
      case "TABLE":
        return <TableComponent widget={widget} updateWidgetContent={updateWidgetContent} />;

      default:
        return <p>Unknown Widget</p>;
    }
  };
  
export default Widget