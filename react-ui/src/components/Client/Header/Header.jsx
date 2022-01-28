import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sessionEvent } from "../../../lib/session";
import Button from "@mui/material/Button";
import AuthButton from "../../Admin/AuthButton/AuthButton";
function Header(props) {
  const sessionPageNavEvent = (uri, referer) => {
    //This tracks user navigation throughout the site.
    sessionEvent({
      eventName: "pageEvent",
      eventType: "navigation",
      eventTriggerAriaLabel: "header-tab",
      referer: window.location.pathname,
      location: uri,
    });
    //
  };
  //
  const location = useLocation();
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav--content">
          <Link
            className="link"
            to={"/"}
            onClick={() => sessionPageNavEvent("/")}
          >
            {/* <img src={Logo} className="nav-logo" alt="" /> */}
          </Link>
          <ul className="nav-menu">
            <li>
              <Button variant="contained">
                <Link
                  to={"/"}
                  className={`link nav-link ${
                    location.pathname.toLowerCase().includes("inventory")
                      ? "nav-button nav-link--active nav-button--right"
                      : ""
                  }`}
                  onClick={() => sessionPageNavEvent("/")}
                >
                  <p>HOME</p>
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="contained">
                <Link
                  to={"/about"}
                  className={`link nav-link ${
                    location.pathname.toLowerCase().includes("inventory")
                      ? "nav-button nav-link--active nav-button--right"
                      : ""
                  }`}
                  onClick={() => sessionPageNavEvent("/about")}
                >
                  <p>ABOUT</p>
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="contained">
                <Link
                  to={"/Blog"}
                  className={`link nav-link ${
                    location.pathname.toLowerCase().includes("inventory")
                      ? "nav-button nav-link--active nav-button--right"
                      : ""
                  }`}
                  onClick={() => sessionPageNavEvent("/Blog")}
                >
                  <p>Blog</p>
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="contained">
                <Link
                  to={"/Contact"}
                  className={`link nav-link ${
                    location.pathname.toLowerCase().includes("inventory")
                      ? "nav-button nav-link--active nav-button--right"
                      : ""
                  }`}
                  onClick={() => sessionPageNavEvent("/Contact")}
                >
                  <p>Contact</p>
                </Link>
              </Button>
            </li>
          </ul>
          <AuthButton props={props}/>
        </div>
      </nav>
    </header>
  );
}
export default Header;
