import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  VideogameAsset as VideoGameAssetIcon,
  OndemandVideo as OndemandVideoIcon,
  AssignmentInd as AssignmentIndIcon
} from "@material-ui/icons";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList
} from "@material-ui/core";

const NavBar = props => {
  return (
    <MenuList>
      <MenuItem
        button
        component={NavLink}
        to="/"
        selected={"/" === props.location.pathname}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </MenuItem>

      <MenuItem
        button
        component={NavLink}
        to="/bits"
        selected={"/bits" === props.location.pathname}
      >
        <ListItemIcon>
          <OndemandVideoIcon />
        </ListItemIcon>
        <ListItemText primary="Bits" />
      </MenuItem>

      <MenuItem
        button
        component={NavLink}
        to="/games"
        selected={"/games" === props.location.pathname}
      >
        <ListItemIcon>
          <VideoGameAssetIcon />
        </ListItemIcon>
        <ListItemText primary="Games" />
      </MenuItem>

      <MenuItem
        button
        component={NavLink}
        to="/users"
        selected={"/users" === props.location.pathname}
      >
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </MenuItem>
    </MenuList>
  );
};

export default withRouter(NavBar);
