import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import React from "react";
import { AppBar, Button, Box, Card, FormControl, IconButton, Input, TextField, Toolbar, Typography, Grid, CardContent } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import { Container } from "@mui/system";
import ipfs from "../../ipfs.js";


export default function Test() {
    const { state: { contracts, accounts } } = useEth();
    const [val,setVal] = useState("");
    const [buffer,setBuffer] = useState(null);
    const [ipfsHash, setIpfsHash] = useState("");
    const [importFile, setImportFile]= useState('');
    const [text, setText] = useState("");
    const [buff, setBuff] = useState(null);
    const [fileHash, setFileHash] = useState(null);

    const [jPdf, setJpdf] = useState({});
    const [listJSectionNumber, setListJSectionNumber] = useState([]);
    const [listJSectionNumberFind, setListJSectionNumberFind] = useState([]);
    const [jSectionNumber, setJSectionNumber] = useState("");
    const [redCaseName, setRedCaseName] = useState("");
    const [redCaseFind, setRedCaseFind] = useState("");
    const [jDesFind, setJDesFind] = useState("");
    const [jLinkFind, setJLinkFind] = useState("");

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
                </Card>

                <Card
                    sx={{
                        p: 3,
                        m: 2,
                    }}
                >
                    <Typography variant="h3" gutterBottom>
                        Judgement
                    </Typography>
                
                    <Typography variant="h4">
                            Please attach pdf file and add the section numbers
                    </Typography>
                    
                    <Container>
                        <Box sx={{ m:2}}>
                            
                            <Grid container spacing={2} display="flex" alignItems="center" justifyItems="center">

                                <Grid item xs={6}>
                                    <TextField value={redCaseName} size="small" fullWidth label="Redcase name"
                                        onChange={(e) => {
                                            setRedCaseName(e.target.value);
                                        }}   
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3} display="flex" justifyContent="end">
                                    <Input 
                                        type="file"
                                        onChange={ async (event) => {
                                            if (event.target.value !== '' && event.target.value !== null && event.target.value !== undefined) {
                                                setJpdf(event.target.files[0]);
                                            }
                                        }}
                                        sx={{m: 1}}
                                    />
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField value={jSectionNumber} size="small" fullWidth label="Section Number"
                                        onChange={(e) => {
                                            setJSectionNumber(e.target.value);
                                        }}   
                                    />
                                </Grid>
                                <Grid item xs={1} alignContent="center">
                                    <Button 
                                        fullWidth
                                        variant="contained"
                                        onClick={() => {
                                            const cleanJSectionNumber = (jSectionNumber).trim();
                                            if (cleanJSectionNumber) {
                                                console.log(cleanJSectionNumber);
                                                if (!listJSectionNumber.includes(cleanJSectionNumber)) {
                                                    setListJSectionNumber([...listJSectionNumber, cleanJSectionNumber]);
                                                    
                                                }
                                            }
                                            setJSectionNumber('');
                                        }}
                                    ><AddIcon/></Button>
                                </Grid>
                                
                            </Grid>  
                        </Box>
                        {listJSectionNumber.map((section, index) => (
                            <Box 
                                sx={{
                                    p:1,
                                    m:1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                                    color: (theme) => theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                    border: '1px solid',
                                    borderColor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                                    borderRadius: 2,
                                    fontSize: '1rem',
                                    fontWeight: '700'
                                }}
                                key={index}
                            >
                                <div>{section}</div>
                                <Button variant="contained" onClick={(e) => {
                                    setListJSectionNumber(listJSectionNumber.filter((item) => item !== section));
                                }}><DeleteIcon/></Button>
                            </Box>
                        ))}
                    </Container>
                

                    <Button sx={{m: 1}} size="large" fullWidth variant="contained" type="submit" onClick={ async (event) => {
                        event.preventDefault();
                        const cleanRedCaseName = redCaseName.trim();
                        if (cleanRedCaseName !== "") {
                            try {
                                const added = await ipfs.add(jPdf);
                                console.log("add", added);
                                console.log(listJSectionNumber);
                                const listJSectionNumberString = listJSectionNumber.map((sec) => sec.toString());
                                await contracts['JudgementIndexing'].methods.addNewJudgement(cleanRedCaseName, listJSectionNumberString, added.path.toString()).send({from:accounts[0]});
                            } catch (err) {
                                alert("Unsuccess");
                                console.log('err', err.message);
                            }
                        }
                    }}>Submit</Button>
                </Card>
                
                <Card
                    sx={{
                        p: 3,
                        m: 2,
                    }}
                >
                    <CardContent>
                        <Typography variant="h3" gutterBottom>
                        Find Judgement
                        </Typography>
                        <Container >
                            <Box sx={{m:2}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={9}>
                                        <TextField value={redCaseFind} size="small" fullWidth label="Redcase Name"
                                            onChange={(e) => {
                                                setRedCaseFind(e.target.value);
                                            }}   
                                        />
                                    </Grid>
                                    <Grid item xs={3} alignContent="center">
                                        <Button 
                                            size="large"
                                            fullWidth
                                            variant="contained"
                                            onClick={ async () => {
                                                try {
                                                    const jListSec = await contracts['JudgementIndexing'].methods.getSectionNumbersByRedCase(redCaseFind.toString()).call({from:accounts[0]});
                                                    console.log(jListSec);
                                                    const jCid = await contracts['JudgementIndexing'].methods.getCIDByRedCase(redCaseFind.toString()).call({from:accounts[0]});
                                                    console.log(jCid);
                                                    setJDesFind("This is Redcase for you");
                                                    setListJSectionNumberFind(jListSec);
                                                    setJLinkFind(`https://ipfs.io/ipfs/${jCid}`);
                                                } catch (err) {
                                                    setJDesFind("Do not have this redcase name");
                                                    setListJSectionNumberFind([]);
                                                    setJLinkFind("");
                                                }
                                            }}
                                        ><SearchIcon></SearchIcon></Button>
                                    </Grid>
                                </Grid>  
                            </Box>
                            <Typography variant="h4">{jDesFind}</Typography>
                            {jLinkFind!=="" && <Box
                                display="flex"
                                justifyContent="end"
                                alignItems="center"
                            >
                                <Typography variant="h5">Link pdf</Typography>
                                <Button sx={{m:2}} href={jLinkFind} target="_blank" variant="contained"><LinkIcon sx={{m:0.5}}/>Click me</Button>
                            </Box>}
                            {(listJSectionNumberFind.length!==0) && <Box>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Related section numbers</Typography>
                                </Grid>
                                {listJSectionNumberFind.map((section, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            p:1,
                                            m:1,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                                            color: (theme) => theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                            border: '1px solid',
                                            borderColor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                                            borderRadius: 2,
                                            fontSize: '1rem',
                                            fontWeight: '700'
                                        }}
                                        key={index}
                                    >
                                        <div>{section}</div>
                                    </Grid>
                                ))}
                            </Box>}
                        </Container>
                    </CardContent>
                </Card>
            </Container>
        </>);
    
}