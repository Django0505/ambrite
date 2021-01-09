import React from 'react'
import file from '../data/data.json';
import countries from '../data/countries_geo.json'; // taken from https://github.com/eesur/country-codes-lat-long
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function calculateDistanceAndSort(lat, lng) {
    return file.map(i => {
        const countryLatLng = countries.find(c => c.alpha2 === i.countrycode);
        i['dist'] = countryLatLng && distance(lat, lng, countryLatLng.latitude, countryLatLng.longitude);
        return i;
    }).sort((a, b) => {
        if(a.dist > b.dist) {
            return 1;
        } else {
            return -1;
        }
    }).slice(0, 10);
}

export default function Two() {
    const [lat, setLat] = React.useState('');
    const [lng, setLng] = React.useState('');
    const [sorted, setSorted] = React.useState([]);

    return (
        <div>
            <h1>Challenge Two</h1>
            <p>
                Write a function that takes in latitude and longitude as parameters, and
                returns a sorted list of the 10 rows from data.json with the shortest distance
                from the latitude and longitude, in a nicely formatted table.
            </p>
            <br/>
            <TextField type='number' value={lat} onChange={e => setLat(e.target.value)} id="lat" label="Latitude" />
            <TextField type='number' value={lng} onChange={e => setLng(e.target.value)} id="lng" label="Longitude" />
            <Button
                onClick={() => setSorted(calculateDistanceAndSort(lat, lng))}
                variant='contained'
                color='primary'
                disabled={lat === '' || lng === ''}
            >Check</Button>
            {
                sorted.length > 0 ?
                <div>
                    <br/>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Country code</TableCell>
                                <TableCell>ASN</TableCell>
                                <TableCell align="right">Distance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {sorted.map((row) => (
                            <TableRow key={row.id}>
                            <TableCell scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.countrycode}
                            </TableCell>
                            <TableCell>
                                {row.asn}
                            </TableCell>
                            <TableCell align="right">{row.dist}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div> :
                <p>Enter coordinates and press the check button</p>
            }
        </div>
    )
}


function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 === lat2) && (lon1 === lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344
		return dist;
	}
}