import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import file from '../data/p3data.json';
import { Button } from '@material-ui/core';
import ActionComponent from './threecomponent';

function arrayUnion(a, b) {
    let merged = [];

    [...a, ...b].map((item) => {
        const found = merged.find(item2 => item.name === item2.name);
        const foundIndex = merged.findIndex(item2 => item.name === item2.name);
        if (found) {
            const itemSummed = Object.keys(found).reduce(function(obj,key) {
                if (typeof item[key] === 'number') {
                    obj[key] = item[key] + found[key];
                }
                return obj;
            },{});
            merged[foundIndex] = {
                ...found,
                ...item,
                ...itemSummed

            }
        } else {
            merged.push(item);
        }
    });

    return merged;
}

export default function Three() {

    const [joined, setJoined] = React.useState([]);
   

    React.useEffect(() => {
      console.log('FILE ', file);
      const joined = arrayUnion(file.testSet1, file.testSet2);
      console.log('JOINED ', joined);
      setJoined(joined);
    }, []);

    return (
        <div>
            <h1>Challenge Three</h1>
            <p>{
                `Write a function that takes two arrays of objects as parameters, and returns a
                single array containing the union of the two arrays. The input object can be
                found in p3Data.json. The union is defined as follows:

                Interview Challenge

                a. All objects must have unique names in the final array
                b. All other fields must be merged, ex: the union of {name: "t", a:1} and
                {name: "t", b:2} will give the object: {name: "t", a:1, b:2}
                c. If two objects have the same field the values are summed
                d. Objects with name as the only field must be ignored, i.e {name: "obj1"}
                The array must be displayed in a table with each row containing the name of the
                object and a button to open a drop-down showing a list containing the individual
                fields and their values.`
            }</p>
            <br/>
            <br/>
            {
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {joined.map((row, index) => (
                                <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                <div>
                                    <ActionComponent row={row} index={index}/>
                                </div>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            }
        </div>
    )
}