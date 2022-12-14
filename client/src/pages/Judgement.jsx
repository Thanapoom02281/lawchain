import { useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import { Button, Box, Card, Input, TextField, Typography, Grid, CardContent, CircularProgress, Tab } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import { Container } from "@mui/system";
import ipfs from "../ipfs.js";
import Navbar from '../components/Navbar';
import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";



export default function Judgement() {
    const { state: { contracts, accounts } } = useEth();
    const [jPdf, setJpdf] = useState();
    const [listJSectionNumber, setListJSectionNumber] = useState([]);
    const [listJSectionNumberFind, setListJSectionNumberFind] = useState([]);
    const [jSectionNumber, setJSectionNumber] = useState("");
    const [redCaseName, setRedCaseName] = useState("");
    const [redCaseFind, setRedCaseFind] = useState("");
    const [jDesFind, setJDesFind] = useState("");
    const [jLinkFind, setJLinkFind] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const [secret, setSecret] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [isAddingAccount, setIsAddingAccount] = useState(false);

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const doAddAccount = async() => {
        console.log('add account');
        setIsAddingAccount(true);
        try {
            await contracts['JudgementIndexing'].methods.addAuthorizedUser(publicKey,secret).send({from:accounts[0]});
            console.log('Add account success');
        } catch (error) {
            console.error(error)
        }
        setIsAddingAccount(false);
    };

    return(
        <>
            <Navbar />
            <Container>
                <div style={{ paddingTop: "3%" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h1" color="#021630" display="inline">Law</Typography>
                        <Typography variant="h1" color="orange" display="inline">Chain</Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h1" color="#021630" display="inline">????????????????????????????????????</Typography>
                        <Typography variant="h1" color="orange" display="inline">blockchain</Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
                        <Typography variant="h2" color="#021630" display="inline">????????????????????????????????????????????????</Typography>
                    </div>
                </div>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="?????????????????????????????????????????????????????????????????? 2 ???????????????">
                            <Tab label="???????????????????????????????????????" value="1" style={{fontSize: '20px'}} disabled={isAddingAccount || isAdding ? true : false}/>
                            <Tab label="????????????????????????????????????????????????????????????" value="2" style={{fontSize: '20px'}} disabled={isAddingAccount || isAdding ? true : false}/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Card
                            sx={{
                                p: 3,
                                m: 2,
                            }}
                        >
                            <Typography variant="h3" gutterBottom>
                        ???????????????????????????????????????
                            </Typography>
                            <Container>
                                <Box sx={{ m:2}}>
                            
                                    <Grid container spacing={2} display="flex" alignItems="center" justifyItems="center">

                                        <Grid item xs={6}>
                                            <TextField variant="standard" value={redCaseName} size="small" fullWidth label="??????????????????????????????"
                                                onChange={(e) => {
                                                    setRedCaseName(e.target.value);
                                                }}
                                                style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}
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
                                            <TextField variant="standard" value={jSectionNumber} size="small" fullWidth label="????????????????????????"
                                                onChange={(e) => {
                                                    setJSectionNumber(e.target.value);
                                                }}
                                                style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}
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
                                        setIsAdding(true);
                                        const added = await ipfs.add(jPdf);
                                        console.log("add", added);
                                        console.log(listJSectionNumber);
                                        const listJSectionNumberString = listJSectionNumber.map((sec) => sec.toString());
                                        await contracts['JudgementIndexing'].methods.addNewJudgement(cleanRedCaseName, listJSectionNumberString, added.path.toString()).send({from:accounts[0]});
                                    } catch (err) {
                                        alert("????????????????????????????????????????????????????????????");
                                        console.log('err', err.message);
                                    }
                                    setIsAdding(false);
                                }
                            }}
                            disabled={(jPdf === undefined || redCaseName === '' || listJSectionNumber.length === 0)? true : false }
                            >Submit</Button>
                            {isAdding && <>
                                <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
                                    <Typography variant="h3" color="#021630" display="inline">
            ?????????????????????????????????????????????????????? &nbsp;
                                    </Typography>
                                    <CircularProgress color="secondary" />
                                </div>
                            </>}
                        </Card>
                    </TabPanel>
                    <TabPanel value="2">
                        <Card
                            sx={{
                                p: 3,
                                m: 2,
                            }}
                        >
                            <Typography variant="h3" gutterBottom>
                        ????????????????????????????????????????????????????????????
                            </Typography>
                            <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
                                <TextField id="standard-basic" type="Password" label="Secret" variant="standard" color="primary" onChange={(e) => setSecret(e.target.value)} style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
                                <TextField id="standard-basic" label="Public Key" variant="standard" color="primary" onChange={(e) => setPublicKey(e.target.value)} style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
                                <Button color="primary" variant="contained" style={{fontSize: '15px', color: '#ffffff'}} onClick={doAddAccount} disabled={(isAddingAccount || secret === '' || publicKey === '') ? true : false}>??????????????????????????????</Button>
                            </div>
                            {isAddingAccount && <>
                                <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
                                    <Typography variant="h3" color="#021630" display="inline">
            ??????????????????????????????????????????????????????????????????????????? &nbsp;
                                    </Typography>
                                    <CircularProgress color="secondary" />
                                </div>
                            </>}
                        </Card>
                    </TabPanel>
                </TabContext>
            </Container>
        </>);
}