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
        return (
          <div className="p-2 bg-white rounded text-center border border-gray-400">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id={`file-upload-${widget.id}`}
              onChange={(e) => updateWidgetContent(widget.id, URL.createObjectURL(e.target.files[0]))}
            />
            <label
              htmlFor={`file-upload-${widget.id}`}
              className="cursor-pointer block p-4 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300 transition"
            >
              {widget.content ? <img src={widget.content} alt="Uploaded" className="w-full h-32 object-cover" /> : "Upload Image"}
            </label>
          </div>
        );
      case "BUTTON":
        return <button className="p-2 w-full bg-green-500 text-white rounded hover:bg-green-600 transition">
        {widget.content || "Click Me"}
      </button>
      case "TABLE":
        return (
          <table className="w-full border-collapse border border-gray-400 bg-white rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-2">Column 1</th>
                <th className="border border-gray-400 p-2">Column 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">Row 1</td>
                <td className="border border-gray-400 p-2">Row 1</td>
              </tr>
            </tbody>
          </table>
        );
      default:
        return <p>Unknown Widget</p>;
    }
  };
  
export default Widget