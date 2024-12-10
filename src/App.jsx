import { useState } from "react";
import Logo from "./Logo.jsx";
import Form from "./Form.jsx";
import PakingList from "./PakingList.jsx";
import Status from "./Status.jsx";

export default function App(){

  const [items,setItems] = useState([]);
  

  function handleAddItems(item)
  {
    setItems((items)=>[...items,item])
  }
  function handleDeleteItems(id)
  {
    setItems(items.filter((item)=>item.id !== id))
  }
  function handleToggleItems(id)
  {
    setItems((items)=>items.map((item)=>item.id === id?{...item,packed:!item.packed}:item))
  }
  function handleClearItems()
  {
    const confirmed = window.confirm("are you sure you want to clear the items");
    if(confirmed) setItems([]);
  }
  return(
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PakingList 
            items={items} 
            onDeleteItems={handleDeleteItems} 
            onToggleItems={handleToggleItems}
            onclearItems={handleClearItems}
      />
      <Status items={items}/>

    </div>
  )
}



