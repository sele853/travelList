import { useState } from "react";
import PropTypes from "prop-types";
import Item from "./Item.jsx";

export default function PakingList({ items, onDeleteItems, onToggleItems,onclearItems }) {
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