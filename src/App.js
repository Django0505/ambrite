import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import One from './views/one';
import Two from './views/two';
import Three from './views/three';
import { Container } from "@material-ui/core";


export default function App() {
  const [open, toggleOpen] = React.useState(false);
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={() => toggleOpen(true)} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              Challenge
            </Typography>

          </Toolbar>
        </AppBar>
        <Drawer anchor='left' open={open} onClose={() => toggleOpen(false)}>
          <List style={{width: '200px'}}>
            <Link to="/">
              <ListItem button key={'one'}>
                <ListItemText primary={'One'} />
              </ListItem>
            </Link>
            <Link to="/two">
              <ListItem button key={'two'}>
                <ListItemText primary={'Two'} />
              </ListItem>
            </Link>
            <Link to="/three">
              <ListItem button key={'three'}>
                <ListItemText primary={'Three'} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
      
        <Container>
          <Switch>
            <Route exact path="/">
              <One />
            </Route>
            <Route exact path="/two">
              <Two />
            </Route>
            <Route exact path="/three">
              <Three />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}