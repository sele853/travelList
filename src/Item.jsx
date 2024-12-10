import PropTypes from "prop-types";

  
  export default function Item({ item ,onDeleteItems,onToggleItems}){
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