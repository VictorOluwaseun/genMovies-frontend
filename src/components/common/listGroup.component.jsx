import React from "react";

const ListGroup = ({
 items,
 onItemSelect,
 textProperty,
 valueProperty,
 selectedItem
}) => {
 return (
  <ul className="list-group">
   {items.map(item => (
    <li
     onClick={() => onItemSelect(item)}
     key={item[valueProperty]}
     className={
      item === selectedItem ? "list-group-item active" : "list-group-item"
     }
     style={{ cursor: "pointer", textAlign: "left" }}
    >
     {item[textProperty]}
    </li>
   ))}
  </ul>
 );
};

ListGroup.defaultProps = {
 textProperty: "name",
 valueProperty: "_id"
};

export default ListGroup;
