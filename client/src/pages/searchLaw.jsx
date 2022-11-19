import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import useEth from "../contexts/EthContext/useEth";
import LinkIcon from '@mui/icons-material/Link';

export default function SearchLaw() {
  const { state: { contracts, accounts } } = useEth();

  const [category, setCategory] = useState('')
  const [article, setArticle] = useState('')
  const [isFound, setIsFound] = useState(false)
  const [cid, setCid] = useState('cid')
  const [isSearchOnce, setIsSearchOnce] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const doSearch = async() => {
    console.log('category', category)
    console.log('article', article)
    setIsSearchOnce(true)
    setIsSearching(true)

    // const timer = setTimeout(() => {
    //         console.log('This will run after 1 second!')
    //       }, 1000);
    //     return () => clearTimeout(timer);
    try {
      //TODO: do search in smart contract
      const resultCid = await contracts['LawIndexing'].methods.getLatestLaw(article).call({from:accounts[0]})
      console.log(resultCid)
      setCid(resultCid)
      setIsFound(true)
    } catch (error) {
      setCid('')
      setIsFound(false)
      console.error(error)
    }
    setIsSearching(false)
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "3%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h1" color="#021630" display="inline">
            Law
          </Typography>
          <Typography variant="h1" color="orange" display="inline">
            Chain
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h1" color="#021630" display="inline">
            ระบบกฏหมายบน
          </Typography>
          <Typography variant="h1" color="orange" display="inline">
            blockchain
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
        <Typography variant="h2" color="#021630" display="inline">
            ค้นหากฏหมาย
          </Typography>
        </div>
      {/* <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
        <TextField id="standard-basic" label="หมวด" variant="standard" color="secondary" onChange={(e) => setCategory(e.target.value)} style={{width: '25%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
      </div> */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
        <TextField id="standard-basic" label="มาตรา" variant="standard" color="secondary" onChange={(e) => setArticle(e.target.value)} style={{width: '25%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
       <Button color="secondary" variant="contained" style={{fontSize: '15px', color: '#021630'}} onClick={doSearch} disabled={article === '' ? true : false}>ค้นหา</Button>
      </div>
      {isSearching && <>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
        <Typography variant="h3" color="#021630" display="inline">
            กำลังค้นหากฏหมาย &nbsp;
        </Typography>
        <CircularProgress color="secondary" />
        </div>
      </>}
      {(isSearchOnce&&!isSearching) &&
      <>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
        <Typography variant="h2" color="#021630" display="inline">
            ผลค้นหา
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
        <Typography variant="h4" color="#021630" display="inline">
            {isFound ? 'พบกฏหมาย กดปุ่มเพื่อไปยังตัวบทกฏหมาย:' : 'ไม่พบข้อมูล'}
            {/* {isFound ? <Link to={`https://ipfs.io/ipfs/${cidURL}`}>{cidURL}</Link> : ''} */}
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center"}}>
        {isFound ? <Button sx={{m:2}} href={`https://ipfs.io/ipfs/${cid}`} color="secondary" variant="contained"><LinkIcon sx={{m:0.5}}/>Click me</Button> : ''}
      </div>
      </>
      }
      </div>
    </>
  );
}
