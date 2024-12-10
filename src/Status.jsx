import PropTypes from "prop-types";
  
export default function Status({items}){
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