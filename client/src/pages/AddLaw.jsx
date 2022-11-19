import { Box, Button, CircularProgress, Tab, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

// import { Web3Storage } from 'web3.storage'
// import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import Navbar from '../components/Navbar'
import ipfs from "../ipfs.js";
import useEth from "../contexts/EthContext/useEth";

export default function AddLaw() {
    // const storage = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZkREM1RmYzZjI5MjI0N2RmOTNhMzQ2OTA2ZTEwMDc1MDhmREZDNDIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njg3MDYzNTMxMjcsIm5hbWUiOiJMYXdDaGFpbiJ9.DIFdXPvzpGxEcrm9i9-IoXkhKHAXcE3MDjl6Dbfyx7E' })

    const { state: { contracts, accounts } } = useEth();
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
        setAddCategory('')
        setAddArticle('')
        setUploadedFile(undefined)
        setIsAddingSuccess(false)
        setIsAddPressed(false)

        setSignCategory('')
        setSignArticle('')
        setIsSigningSuccess(false)
        setIsSignPressed(false)

        setSecret('')
        setPublicKey('')
        setIsAddingAccountSuccess(false)
        setIsAddingAccountPressed(false)
        }
    ,[value])

    const [addCategory, setAddCategory] = useState('')
    const [addArticle, setAddArticle] = useState('')
    const [uploadedFile, setUploadedFile] = useState()
    const [adding, setAdding] = useState(false)
    const [isAddingSuccess, setIsAddingSuccess] = useState(false)
    const [isAddPressed, setIsAddPressed] = useState(false)

    const [signCategory, setSignCategory] = useState('')
    const [signArticle, setSignArticle] = useState('')
    const [signing, setSigning] = useState(false)
    const [isSigningSuccess, setIsSigningSuccess] = useState(false)
    const [isSignPressed, setIsSignPressed] = useState(false)

    const [secret, setSecret] = useState('')
    const [publicKey, setPublicKey] = useState('')
    const [addingAccount, setAddingAccount] = useState(false)
    const [isAddingAccountSuccess, setIsAddingAccountSuccess] = useState(false)
    const [isAddingAccountPressed, setIsAddingAccountPressed] = useState(false)

    const handleUpload = (e) => {
        setUploadedFile(e.target.files[0])
    }

    const doAddLaw = async () => {
        console.log('add law', addCategory, addArticle)
        setIsAddPressed(true)
        setAdding(true)
        try {
            
            //TODO: push file to IPFS
            // const files = [uploadedFile]
            // const cid = await storage.put(files)
            const cid = await ipfs.add(uploadedFile);
            console.log('cid', cid)
            
            //TODO: Add in Smart Contract
            await contracts['LawIndexing'].methods.editOrCreateDraft(addArticle,cid.path.toString()).send({from:accounts[0]});
            const addingResult = true // should be true if adding complete
            
            setIsAddingSuccess(addingResult)
        } catch (error) {
            console.error(error)
            setIsAddingSuccess(false)
        }
        setAdding(false)
    }

    const doSign = async() => {
        console.log('sign with', signCategory, signArticle)
        setIsSignPressed(true)
        setSigning(true)
        try {
          //TODO: Sign in Smart Contract
          await contracts['LawIndexing'].methods.sign(signArticle).send({from:accounts[0]});  
          setIsSigningSuccess(true)
        } catch (error) {
          console.error(error)
          setIsSigningSuccess(false)
        }
        setSigning(false)
    }

    const doAddAccount = async() => {
      setIsAddingAccountPressed(true)
      setAddingAccount(true)
      try {
        //TODO: Add in Smart Contract
        await contracts['LawIndexing'].methods.addAuthorizedUser(publicKey,secret).send({from:accounts[0]});
        setIsAddingAccountSuccess(true)
      } catch (error) {
        console.error(error)
      }
      console.log('Add account success')
      setAddingAccount(false)
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
            <Tab label="เพิ่มกฎหมายใหม่" value="1" style={{fontSize: '20px'}} disabled={(signing||adding||addingAccount) ? true : false}/>
            <Tab label="เซ็นกฎหมาย" value="2" style={{fontSize: '20px'}} disabled={(signing||adding||addingAccount) ? true : false}/>
            <Tab label="เพิ่มบัญชี" value="3" style={{fontSize: '20px'}} disabled={(signing||adding||addingAccount) ? true : false}/>
          </TabList>
        </Box>
        <TabPanel value="1"> 
          {/* <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
            <TextField id="standard-basic" label="หมวด" variant="standard" color="secondary" onChange={(e) => setAddCategory(e.target.value)} style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
          </div> */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
            <TextField id="standard-basic" label="มาตรา" variant="standard" color="secondary" onChange={(e) => setAddArticle(e.target.value)} style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
          </div>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
            <input type='file' name='Upload ไฟล์กฏหมาย' onChange={handleUpload}/>
          </div>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
           <Button color="secondary" variant="contained" style={{fontSize: '15px', color: '#021630'}} onClick={doAddLaw} disabled={(adding || addArticle === '' || uploadedFile === undefined) ? true : false}>เพิ่มกฏหมาย</Button>
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
        {(isAddPressed&&!adding) ? ((isAddingSuccess) ? 
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
      {/* <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
        <TextField id="standard-basic" label="หมวด" variant="standard" color="secondary" onChange={(e) => setSignCategory(e.target.value)} style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
      </div> */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
        <TextField id="standard-basic" label="มาตรา" variant="standard" color="secondary" onChange={(e) => setSignArticle(e.target.value)} style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
       <Button color="secondary" variant="contained" style={{fontSize: '15px', color: '#021630'}} onClick={doSign} disabled={(signing || signArticle === '') ? true : false}>เซ็น</Button>
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
        {(isSignPressed&&!signing) ? (isSigningSuccess ? 
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
        <TabPanel value="3"> 
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
          <TextField id="standard-basic" type="Password" label="Secret" variant="standard" color="secondary" onChange={(e) => setSecret(e.target.value)} style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
        </div>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
          <TextField id="standard-basic" label="Public Key" variant="standard" color="secondary" onChange={(e) => setPublicKey(e.target.value)} style={{width: '50%'}} inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 15}}}/>
       </div>
       <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
         <Button color="secondary" variant="contained" style={{fontSize: '15px', color: '#021630'}} onClick={doAddAccount} disabled={(addingAccount || secret === '' || publicKey === '') ? true : false}>เพิ่มบัญชี</Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
        {addingAccount ? (<>
                <Typography variant="h3" color="#021630" display="inline">
                    กำลังเพิ่มบัญชี &nbsp;
                </Typography>
                <CircularProgress color="secondary" />
                </>
            ) 
            : ''
        }
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>
        {(isAddingAccountPressed&&!addingAccount) ? (isAddingAccountSuccess ? 
            <>
                <Typography variant="h3" color="#021630" display="inline">
                    เพิ่มบัญชีสำเร็จ <CheckIcon style={{fontSize: 30, color: 'green'}}/>
                </Typography>
            </>
            :
            <>
                <Typography variant="h3" color="#021630" display="inline">
                    เพิ่มบัญชีไม่สำเร็จ <CloseIcon style={{fontSize: 30, color: 'red'}}/>
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
