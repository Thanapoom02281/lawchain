import { Button, Typography } from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    //TODO: add navigate in the Judgement part.
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '150px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h1" color="#021630" display="inline">
                        Law
                    </Typography>
                    <Typography variant="h1" color="orange" display="inline">
                        Chain
                    </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h1" color="#021630" display="inline">
                        ระบบกฏหมายบน
                    </Typography>
                    <Typography variant="h1" color="orange" display="inline">
                        blockchain
                    </Typography>
                </div>
                <div style={{ paddingTop: '80px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ fontSize: '20px', marginBottom: '25px', color: '#021630' }}
                            onClick={() => navigate('/searchlaw')}>
                            ค้นหากฏหมาย
                        </Button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ fontSize: '20px', color: '#021630' }}
                            onClick={() => navigate('/search-judgement')}>
                            ค้นหาคำตัดสิน
                        </Button>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '70px',
                        flexDirection: 'row'
                    }}>
                    <Button
                        color="primary"
                        style={{ fontSize: '15px', color: '#021630' }}
                        onClick={() => navigate('/addlaw')}>
                        สำหรับผู้ออกกฏหมาย
                    </Button>
                    <Button
                        color="primary"
                        style={{ fontSize: '15px', color: '#021630' }}
                        onClick={() => navigate('/judgement')}>
                        สำหรับผู้พิพากษา
                    </Button>
                </div>
            </div>
        </>
    );
}
