import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function SearchLaw() {
  const [category, setCategory] = useState('')
  const [article, setArticle] = useState('')
  const [isFound, setIsFound] = useState(false)
  const [cidURL, setCidURL] = useState('cid')
  const [isSearchOnce, setIsSearchOnce] = useState(false)

  const doSearch = () => {
    console.log('category', category)
    console.log('article', article)
    setIsSearchOnce(true)

    //do search in smart contract
    const resultCid = 'mock'

    if(resultCid){
      setCidURL(resultCid)
      setIsFound(true)
    }else{
      setCidURL('')
      setIsFound(false)
    }
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
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
        <TextField id="standard-basic" label="หมวด" variant="standard" color="secondary" onChange={(e) => setCategory(e.target.value)} style={{width: '25%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
        <TextField id="standard-basic" label="มาตรา" variant="standard" color="secondary" onChange={(e) => setArticle(e.target.value)} style={{width: '25%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
       <Button color="secondary" variant="contained" style={{fontSize: '15px', color: '#021630'}} onClick={doSearch}>ค้นหา</Button>
      </div>
      {isSearchOnce &&
      <>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
        <Typography variant="h2" color="#021630" display="inline">
            ผลค้นหา
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
        <Typography variant="h4" color="#021630" display="inline">
            {isFound ? 'Link ไปยังตัวบทกฏหมาย:' : 'ไม่พบข้อมูล'}
            {isFound ? <Link to={{ pathname: `${setCidURL}` }}></Link> : ''}
        </Typography>
      </div>
      </>
      }
      </div>
    </>
  );
}
