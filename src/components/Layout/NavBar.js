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
  const DashboardLink = React.forwardRef((props, ref) => (
    <NavLink to="/" {...props} innerRef={ref} />
  ));

  const BitsLink = React.forwardRef((props, ref) => (
    <NavLink to="/bits" {...props} innerRef={ref} />
  ));

  const GamesLink = React.forwardRef((props, ref) => (
    <NavLink to="/games" {...props} innerRef={ref} />
  ));

  const UsersLink = React.forwardRef((props, ref) => (
    <NavLink to="/users" {...props} innerRef={ref} />
  ));

  return (
    <MenuList>
      <MenuItem
        button
        component={DashboardLink}
        selected={"/" === props.location.pathname}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </MenuItem>

      <MenuItem
        button
        component={BitsLink}
        selected={"/bits" === props.location.pathname}
      >
        <ListItemIcon>
          <OndemandVideoIcon />
        </ListItemIcon>
        <ListItemText primary="Bits" />
      </MenuItem>

      <MenuItem
        button
        component={GamesLink}
        selected={"/games" === props.location.pathname}
      >
        <ListItemIcon>
          <VideoGameAssetIcon />
        </ListItemIcon>
        <ListItemText primary="Games" />
      </MenuItem>

      <MenuItem
        button
        component={UsersLink}
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
