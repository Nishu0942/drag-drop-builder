import Button from "../Components/Button/Button";
import Input from "../Components/InputComponent/input";
import TableComponent from "../Components/TableComponent/TableComponent";
import UploadImage from "../Components/UploadImage/UploadImage";
const Widget = (widget, updateWidgetContent) => {
    switch (widget.type) {
      case "TEXT":
        return <Input widget={widget} updateWidgetContent={updateWidgetContent} />;
      case "IMAGE":
        return <UploadImage />;
      case "BUTTON":
        return <Button widget={widget} />
      case "TABLE":
        return <TableComponent widget={widget} />;

      default:
        return <p>Unknown Widget</p>;
    }
  };
  
export default Widget