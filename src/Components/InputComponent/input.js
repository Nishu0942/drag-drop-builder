const Input = ({ widget, updateWidgetContent }) => {
  return (
    <input
      type="text"
      value={widget.content}
      onChange={(e) => updateWidgetContent(widget.id, e.target.value)}
      placeholder="Enter text..."
      className="p-2 border border-gray-400 rounded min-w-[150px]"
    />
  );
};

export default Input;
