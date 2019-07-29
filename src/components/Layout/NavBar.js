import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import {
  Dashboard as DashboardIcon,
  VideogameAsset as VideoGameAssetIcon,
  OndemandVideo as OndemandVideoIcon,
  AssignmentInd as AssignmentIndIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons'
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Divider,
} from '@material-ui/core'
import * as actions from '../../store/actions'

const NavBar = props => {
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  const redirectToLogin = () => {
    dispatch(actions.logout())
    props.history.push('/login')
  }

  const DashboardLink = React.forwardRef((props, ref) => (
    <NavLink to="/" {...props} innerRef={ref} />
  ))

  const BitsLink = React.forwardRef((props, ref) => (
    <NavLink to="/bits" {...props} innerRef={ref} />
  ))

  const GamesLink = React.forwardRef((props, ref) => (
    <NavLink to="/games" {...props} innerRef={ref} />
  ))

  const UsersLink = React.forwardRef((props, ref) => (
    <NavLink to="/users" {...props} innerRef={ref} />
  ))

  const ExitLink = token ? (
    <>
      <Divider />

      <MenuItem button onClick={() => redirectToLogin()}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Exit" />
      </MenuItem>
    </>
  ) : null

  return (
    <MenuList>
      <MenuItem
        button
        component={DashboardLink}
        selected={'/' === props.location.pathname}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </MenuItem>

      <MenuItem
        button
        component={BitsLink}
        selected={'/bits' === props.location.pathname}
      >
        <ListItemIcon>
          <OndemandVideoIcon />
        </ListItemIcon>
        <ListItemText primary="Bits" />
      </MenuItem>

      <MenuItem
        button
        component={GamesLink}
        selected={'/games' === props.location.pathname}
      >
        <ListItemIcon>
          <VideoGameAssetIcon />
        </ListItemIcon>
        <ListItemText primary="Games" />
      </MenuItem>

      <MenuItem
        button
        component={UsersLink}
        selected={'/users' === props.location.pathname}
      >
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </MenuItem>

      {ExitLink}
    </MenuList>
  )
}

export default withRouter(NavBar)
