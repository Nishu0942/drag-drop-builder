import {useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import WidgetPanel from '../Widgetpanel/widgetPanel';
import Canvas from '../Canvas/canvas';
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition } from "react-dnd-multi-backend";


const backendOptions = {
  backends: [
    {
      backend: HTML5Backend,
    },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      transition: TouchTransition,
    },
  ],
};
function Home() { 
  const [widgets, setWidgets] = useState(() => {
  const savedWidgets = localStorage.getItem("widgets");
  return savedWidgets ? JSON.parse(savedWidgets) : [];
});

return (
  <DndProvider backend={MultiBackend} options={backendOptions}>
    <div className="flex flex-col md:flex-row h-screen">
      <WidgetPanel onAddWidget={(widget) => setWidgets([...widgets, widget])} />
      <Canvas widgets={widgets} setWidgets={setWidgets} />
    </div>
  </DndProvider>
);
}

export default Home;
