import React from 'react'
import ViewTotalSales from './viewTotalSales'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ViewEmployeeSales from './viewEmployeeSales';
import ViewTanker from './viewTanker';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button'


function Admin() {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    const handleLogout = () =>{
      window.location.replace('http://localhost:3000')
    }

  return (
    <>
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Total Sale" value="1" />
            <Tab label="Employee Sale" value="2" />
            <Tab label="Delivery" value="3" />
          </TabList>
          <Button variant='contained' endIcon={<LogoutIcon />} style={{float: "right", marginTop: "20px", marginRight: "20px"}} onClick={handleLogout}>Log out</Button>
        </Box>

        <TabPanel value="1"><ViewTotalSales /></TabPanel>
        <TabPanel value="2"><ViewEmployeeSales /></TabPanel>
        <TabPanel value="3"><ViewTanker /></TabPanel>
      </TabContext>
    </Box>
    </>
  )
}

export default Admin