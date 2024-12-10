import PropTypes from "prop-types";
import { useState } from "react";


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

function Logo(){
  return(
    <h1>Far Away</h1>
  )
}


Form.propTypes = {
  onAddItems: PropTypes.func.isRequired, // Ensure it's a required function
};
function Form({onAddItems}){
  function handleSubmit(e){
    e.preventDefault();

    if (!description) {
      alert("Please enter an item description.");
      return;
    }
    const newItems = { description ,packed:false,quantity,id:Date.now()};
  
    

    onAddItems(newItems);
    setDescription(""); // Reset description
    setQuantitiy(5); 
  
  }

  const [description,setDescription] = useState("");
  const [quantity,setQuantitiy] = useState(5);
  return(
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your trip</h3>
      <select value={quantity} onChange={(e)=>setQuantitiy(Number(e.target.value))}>
        {Array.from({length:20}, (_,i)=>i+1).map((num)=>(
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input type="text" placeholder="Item..."  value={description} onChange={(e)=>setDescription(e.target.value)}/>
      <button>Add</button>

    </form>
    
  )
}
PakingList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // Validate item structure
      description: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      packed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDeleteItems: PropTypes.func.isRequired, 
  onToggleItems: PropTypes.func.isRequired,
  onclearItems:PropTypes.func.isRequired,// Ensure it's a required function
};
function PakingList({ items, onDeleteItems, onToggleItems,onclearItems }) {
  const [SortBy, setSortBy] = useState("input");

  let sortedItems = items; // Default to input order
  if (SortBy === "description") {
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  } else if (SortBy === "packed") {
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={SortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button className="clear-list-button" onClick={onclearItems}>Clear List</button>
      </div>
      
    </div>
  );
}



Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    packed: PropTypes.bool.isRequired,
  }).isRequired,
  onDeleteItems: PropTypes.func.isRequired, 
  onToggleItems: PropTypes.func.isRequired,// Ensure it's a required function
};

function Item({ item ,onDeleteItems,onToggleItems}){
  return(
    <li>
      <input type='checkbox' checked={item.packed} onChange={()=>onToggleItems(item.id)}/>
      <span style={item.packed?{textDecoration:"line-through"}:{}}>
         {item.quantity + " "}
         {item.description}
      </span>
      <button onClick={()=>onDeleteItems(item.id)}>❌</button>
      
    </li>
  )
}

Status.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      packed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

function Status({items}){
  if(!items.length)
  {
    return(
      <p className="footer">start adding some items to your packing list</p>
    );
  }
  
    
  
  const numItems = items.length;
  const numPacked = items.filter((item)=>item.packed).length
  const percentage = Math.round((numPacked/numItems ) * 100)
  return(
    <div className="stats">
      <footer>
        <em>
          {percentage === 100?`you got every thing ready to go`:`you  have ${numItems} items in your list and you packed ${numPacked} items(${percentage}%)`}</em>
      </footer>
    </div>
  )
}