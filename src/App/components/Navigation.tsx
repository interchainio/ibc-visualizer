import React from "react";
import { Link } from "react-router-dom";

import { style } from "../style";

export function Navigation(): JSX.Element {
  return (
    <nav className="my-5">
      <Link to="/" className={`${style.button} ml-0`}>
        Home
      </Link>
    </nav>
  );
}
