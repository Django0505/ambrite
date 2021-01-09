import React from 'react'
import fileOne from '../data/geo.json';
import fileTwo from '../data/data.json';
import Button from '@material-ui/core/Button';

function isValidJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export default function One() {

    const [isFileOneValid, setIsFileOneValid] = React.useState(null);
    const [isFileOTwoValid, setIsFileTwoValid] = React.useState(null);

    React.useEffect(() => {
      console.log('FILE ONE ', fileOne);
      console.log('FILE TWO ', fileTwo);
    });
    return (
        <div>
            <h1>Challenge One</h1>
            <p>
                Write a function that performs some validity checks on two JSON files,
                geo.json and data.json. The page must display whether or not the given
                files/input are valid.
            </p>
            <br/>
            <Button
                onClick={() => setIsFileOneValid(isValidJSONString(JSON.stringify(fileOne)))}
            >Check file one</Button>
            {
                isFileOneValid !== null ?
                    isFileOneValid ? 
                        <p>File one is valid</p> :
                    <p>File one is not valid</p> :
                null
            }
            <br/><br/>
            <Button
                onClick={() => setIsFileTwoValid(isValidJSONString(JSON.stringify(fileTwo)))}
            >Check file two</Button>
            {
                isFileOTwoValid !== null ?
                    isFileOTwoValid ? 
                        <p>File two is valid</p> :
                    <p>File two is not valid</p> :
                null
            }
        </div>
    )
}