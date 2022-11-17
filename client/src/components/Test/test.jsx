import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import React from "react";
import { AppBar, Button, Card, FormControl, IconButton, Input, TextField, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from "@mui/system";
import ipfs from "../../ipfs.js";


export default function Test(){
    const { state: { contracts, accounts } } = useEth();
    const [val,setVal] = useState("");
    const [buffer,setBuffer] = useState(null);
    const [ipfsHash, setIpfsHash] = useState("");
    const [importFile, setImportFile]= useState('');
    const [text, setText] = useState("");
    const [buff, setBuff] = useState(null);
    const [fileHash, setFileHash] = useState(null);
    const [pdf, setPdf] = useState({});
    const [val2, setVal2] = useState("");


    async function submit(e){
        console.log(e.target[0].value);
        await contracts['Test'].methods.setValue(e.target[0].value).send({from:accounts[0]});
        e.preventDefault();
    }
    
    function captureFile(event) {
        const file = event.target.files[0];
        console.log(file);
        // const reader = new FileReader();
        // reader.readAsArrayBuffer(file);
        // reader.onloadend = ()=>{
        //     setBuffer(Buffer(reader.result));
        // };
    }

    function onSubmit(e){
        e.preventDefault();
        // ipfs.files.add(buffer,(err,res)=>{
        //     if(err){
        //         console.log(err);
        //         return;
        //     }
        //     setIpfsHash(res[0].hash)
        // });
        
    }

    return(
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h3" color="inherit" component="div">
            Test
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Card style={{padding : 20, marginTop: 50}}>
                    <form onSubmit={submit}>
            change Value : <Input></Input>
                        <br></br>
                        <Button variant="contained" type = "submit">Submit</Button>
                    </form>
                    <br></br>
                    current Value : <p>{val}</p><br></br>
                    <Button variant="contained" onClick={
                        async ()=>{
                            const value = await contracts['Test'].methods.testVal().call({from:accounts[0]});
                            setVal(value);
                        }
                    }>See value</Button>
                    <br></br>
                    <br></br>
                    {/* <img src="" alt = "Image"></img>
                    <form onSubmit={onSubmit}>
                        <input type='file'  onChange={captureFile}></input><br></br>
                        <button type="submit">submit</button>
                    </form> */}
                    <Input type="file" onChange={ async (event) => {
                        if (event.target.value !== '' && event.target.value !== null && event.target.value !== undefined) {
                            setPdf(event.target.files[0]);
                        }
                    }
                    }></Input>
                    <Button variant="contained" type="submit" onClick={ async (event) => {
                        event.preventDefault();
                        if (pdf !== {}) {
                            try {
                                const added = await ipfs.add(pdf);
                                console.log("add", added);
                                setFileHash(added.cid.toString());
                                console.log(fileHash);
                            } catch (err) {
                                console.log('err', err.message);
                            }
                        }
                    }}>Submit</Button>
                    {val2}
                    <Button variant="contained" onClick={
                        async ()=>{
                            const value = await contracts['JudgementContract'].methods.getCID().call({from:accounts[0]});
                            setVal2(value);
                        }
                    }>See value</Button>
                </Card>
            </Container>
        </>);
    
}