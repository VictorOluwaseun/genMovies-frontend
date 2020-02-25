import React from "react";

//The interface of this component
//Input: liked: boolean
//Output: Onclick
//Write code step by step, don't make a big move
const Like = props => {
 let classes = "fa fa-heart";
 if (!props.liked) classes += "-o";
 return (
  <i
   onClick={props.onClick}
   style={{ cursor: "pointer" }}
   className={classes}
   aria-hidden="true"
  ></i>
 );
};

export default Like;
