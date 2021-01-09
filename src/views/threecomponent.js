import React from 'react'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

import { Button } from '@material-ui/core';


export default function ThreeComponent({index, row}) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    return (
        <div>
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={() => setOpen(true)}
            >
                    Properties
                </Button>
                <Popper style={{zIndex: 1001}} anchorEl={anchorRef.current} placement='bottom' open={open} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                        style={{
                            transformOrigin: "center bottom"
                        }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={() => setOpen(false)}>
                                <MenuList elevation={0} id="menu-list-grow">
                                    {Object.keys(row).map((key) => (
                                        <MenuItem key={key} value={key}>
                                        {key}: {row[key]}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                </Popper>
        </div>
    );
}
