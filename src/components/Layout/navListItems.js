import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import VideoGameAssetIcon from "@material-ui/icons/VideogameAsset";
import OnDemandVideoIcon from "@material-ui/icons/OndemandVideo";
import AssigmentIndIcon from "@material-ui/icons/AssignmentInd";
import { NavLink } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <OnDemandVideoIcon />
      </ListItemIcon>
      <ListItemText primary="Bits" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <VideoGameAssetIcon />
      </ListItemIcon>
      <ListItemText primary="Games" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <AssigmentIndIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
  </div>
);
