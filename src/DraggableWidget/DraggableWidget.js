import {useDrag} from 'react-dnd';
const DraggableWidget = ({type, label, onAddWidget}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "WIDGET",
        item: { type, label },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
    
      return (
        <div
          ref={drag}
          className={`p-3 bg-blue-500 text-white m-4 rounded-md shadow-md text-center cursor-pointer transition-transform transform hover:scale-105 ${
            isDragging ? "opacity-50" : ""
          }`}
        >
          {label}
        </div>
      );
    
  }

  export default DraggableWidget;