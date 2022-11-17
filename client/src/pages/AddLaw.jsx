import { Box, Button, CircularProgress, Tab, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function AddLaw() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
        setAddCategory('')
        setAddArticle('')
        setUploadedFile({})
        setIsAddingSuccess(false)
        setIsAddPressed(false)

        setSignCategory('')
        setSignArticle('')
        setIsSigningSuccess(false)
        setIsSignPressed(false)
        }
    ,[value])

    const [addCategory, setAddCategory] = useState('')
    const [addArticle, setAddArticle] = useState('')
    const [uploadedFile, setUploadedFile] = useState({})
    const [adding, setAdding] = useState(false)
    const [isAddingSuccess, setIsAddingSuccess] = useState(false)
    const [isAddPressed, setIsAddPressed] = useState(false)

    const [signCategory, setSignCategory] = useState('')
    const [signArticle, setSignArticle] = useState('')
    const [signing, setSigning] = useState(false)
    const [isSigningSuccess, setIsSigningSuccess] = useState(false)
    const [isSignPressed, setIsSignPressed] = useState(false)

    const handleUpload = (e) => {
        setUploadedFile(e.target.files[0])
    }

    const doAddLaw = () => {
        console.log('add law', addCategory, addArticle)
        setIsAddPressed(true)
        setAdding(true)
        //push file to IPFS

        //Add in Smart Contract
        const addingResult = true // should be true if adding complete

        setIsAddingSuccess(addingResult)
        setAdding(false)
    }

    const doSign = () => {
        console.log('sign with', signCategory, signArticle)
        setIsSignPressed(true)
        setSigning(true)
        // Sign in Smart Contract
        const signingResult = true // should be true if signing complete

        // const timer = setTimeout(() => {
        //     console.log('This will run after 1 second!')
        //   }, 1000);
        // return () => clearTimeout(timer);

        setIsSigningSuccess(signingResult)
        setSigning(false)
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
            สำหรับผู้ออกกฏหมาย
          </Typography>
        </div>
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "2%"  }}>
    <Box sx={{ width: '50%', typography: 'h5' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="ผู้ออกกฏหมายเลือกทำได้ 2 อย่าง">
            <Tab label="เพิ่มกฎหมายใหม่" value="1" style={{fontSize: '20px'}} disabled={(signing||adding) ? true : false}/>
            <Tab label="เซ็นกฎหมาย" value="2" style={{fontSize: '20px'}} disabled={(signing||adding) ? true : false}/>
          </TabList>
        </Box>
        <TabPanel value="1"> 
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
            <TextField id="standard-basic" label="หมวด" variant="standard" color="secondary" onChange={(e) => setAddCategory(e.target.value)} style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
          </div>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
            <TextField id="standard-basic" label="มาตรา" variant="standard" color="secondary" onChange={(e) => setAddArticle(e.target.value)} style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
          </div>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
            <input type='file' name='Upload ไฟล์กฏหมาย' onChange={handleUpload}/>
          </div>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
           <Button color="secondary" variant="contained" style={{fontSize: '15px', color: '#021630'}} onClick={doAddLaw} disabled={adding ? true : false}>เพิ่มกฏหมาย</Button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
        {adding ? (<>
                <Typography variant="h3" color="#021630" display="inline">
                    กำลังเพิ่มกฏหมาย &nbsp;
                </Typography>
                <CircularProgress color="secondary" />
                </>
            ) 
            : ''
        }
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
        {isAddPressed ? (isAddingSuccess ? 
            <>
                <Typography variant="h3" color="#021630" display="inline">
                    เพิ่มกฎหมายสำเร็จ <CheckIcon style={{fontSize: 30, color: 'green'}}/>
                </Typography>
            </>
            :
            <>
                <Typography variant="h3" color="#021630" display="inline">
                    เพิ่มกฎหมายไม่สำเร็จ <CloseIcon style={{fontSize: 30, color: 'red'}}/>
                </Typography>
            </>
            ) : ''
        }
      </div>
        </TabPanel>
        <TabPanel value="2">
                <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
        <TextField id="standard-basic" label="หมวด" variant="standard" color="secondary" onChange={(e) => setSignCategory(e.target.value)} style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
        <TextField id="standard-basic" label="มาตรา" variant="standard" color="secondary" onChange={(e) => setSignArticle(e.target.value)} style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
       <Button color="secondary" variant="contained" style={{fontSize: '15px', color: '#021630'}} onClick={doSign} disabled={signing ? true : false}>เซ็น</Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
        {signing ? (<>
                <Typography variant="h3" color="#021630" display="inline">
                    กำลังเซ็นกฏหมาย &nbsp;
                </Typography>
                <CircularProgress color="secondary" />
                </>
            ) 
            : ''
        }
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
        {isSignPressed ? (isSigningSuccess ? 
            <>
                <Typography variant="h3" color="#021630" display="inline">
                    เซ็นกฎหมายสำเร็จ <CheckIcon style={{fontSize: 30, color: 'green'}}/>
                </Typography>
            </>
            :
            <>
                <Typography variant="h3" color="#021630" display="inline">
                    เซ็นกฎหมายไม่สำเร็จ <CloseIcon style={{fontSize: 30, color: 'red'}}/>
                </Typography>
            </>
            ) : ''
        }
      </div>
        </TabPanel>
      </TabContext>
    </Box>
    </div>
    </div>
    </>
  )
}
