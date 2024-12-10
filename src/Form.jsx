import { useState } from "react";
import PropTypes from "prop-types";

  export default function Form({onAddItems}){
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
  Form.propTypes = {
    onAddItems: PropTypes.func.isRequired, // Ensure it's a required function
  };