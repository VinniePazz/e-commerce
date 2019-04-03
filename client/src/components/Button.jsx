import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = props => {
  const buttons = () => {
    let template = "";

    switch (props.type) {
      case "default":
        template = (
          <Link className="link_default" to={props.linkTo} {...props.addStyles}>
            {props.title}
          </Link>
        );
        break;
      case "bag_link":
        template = (
          <div
            className="bag_link"
            onClick={() => {
              props.runAction();
            }}
          >
            <FontAwesomeIcon icon="shopping-cart" />
          </div>
        );
        break;
      default:
        template = "";
    }
    return template;
  };

  return <div className="my_link">{buttons()}</div>;
};

export default Button;