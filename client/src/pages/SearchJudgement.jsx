import { useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import { Button, Box, Card, Input, TextField, Typography, Grid, CardContent, CircularProgress } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import { Container } from "@mui/system";
import ipfs from "../ipfs.js";
import Navbar from '../components/Navbar';
import React from "react";



export default function SearchJudgement() {
    const { state: { contracts, accounts } } = useEth();
    const [listJSectionNumberFind, setListJSectionNumberFind] = useState([]);
    const [redCaseFind, setRedCaseFind] = useState("");
    const [jDesFind, setJDesFind] = useState("");
    const [jLinkFind, setJLinkFind] = useState("");
    const [isSearching, setIsSearching] = useState(false);

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
                        <Typography variant="h1" color="#021630" display="inline">ระบบกฏหมายบน</Typography>
                        <Typography variant="h1" color="orange" display="inline">blockchain</Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
                        <Typography variant="h2" color="#021630" display="inline">ค้นหาคำตัดสิน</Typography>
                    </div>
                </div>
                <Card
                    sx={{
                        p: 3,
                        m: 2,
                    }}
                >
                    <CardContent>
                        <Typography variant="h3" gutterBottom>
                        ค้นหาคำตัดสิน
                        </Typography>
                        <Container >
                            <Box sx={{m:2}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={9}>
                                        <TextField variant="standard" value={redCaseFind} size="small" fullWidth label="ชื่อเลขแดง"
                                            onChange={(e) => {
                                                setRedCaseFind(e.target.value);
                                            }}
                                            style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}
                                        />
                                    </Grid>
                                    <Grid item xs={3} alignContent="center">
                                        <Button 
                                            size="large"
                                            fullWidth
                                            variant="contained"
                                            onClick={ async () => {
                                                try {
                                                    setIsSearching(true);
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
                                                setIsSearching(false);
                                            }}
                                            disabled={redCaseFind == '' ? true : false}
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
                            {isSearching && <>
                    <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
                        <Typography variant="h3" color="#021630" display="inline">
            กำลังค้นหาคำตัดสิน &nbsp;
                        </Typography>
                        <CircularProgress color="secondary" />
                    </div>
                </>}
                        </Container>
                    </CardContent>
                </Card>
            </Container>
        </>);
    
}