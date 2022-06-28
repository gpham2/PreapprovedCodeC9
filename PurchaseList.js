import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { apiRequest } from '../../util/util';
import { createListString } from '../../util/createListString'; 
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

function PurchaseList({ id }) {

  // Setting values of columns
  const [purchases, setPurchases] = useState([]);
  const [colDefs] = useState([
      { field: 'id', flex: 1, headerName: 'ID',
        valueGetter:({ row }) => row.node.id.substring(20)
      },
      { field: 'date', flex: 1, headerName: 'Date',
        valueGetter: ({ row }) => timeConvert(row.node.processedAt)
      },
      { field: 'items', flex: 2, headerName: 'Items',
        valueGetter: ({ row }) => createListString(row.node.lineItems.edges, (item) => item.node.name)
      },
      {
        field: 'total', headerName: 'Total',
        valueGetter: ({ row }) => `$${row.node.subtotalPriceSet.presentmentMoney.amount}`,
      },
    ]);

  // Function that converts utc time from the shopify api and convert to the user's local time
  const timeConvert = (utcTime) => {

    const oldTime = new Date(Date.UTC(
        parseInt(utcTime.substring(0,4)),   // year
        parseInt(utcTime.substring(5,7)),   // month
        parseInt(utcTime.substring(8,10)),  // day
        parseInt(utcTime.substring(12,14)), // hour
        parseInt(utcTime.substring(15,17)), // minute
        parseInt(utcTime.substring(18,20))  // millisecond
    ));

    const newTime = oldTime.toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, timeZoneName: 'short'});
    return newTime;
  }

  // Customizable HTML for if user made no purchases
  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        User Made No Purchases
      </Stack>
    );
  }

  // Api request to fetch purchase data
  const refresh = async () => {
    const data = await apiRequest(`/shopify/purchases/?id=${id.substring(23)}`, 'GET');
    setPurchases(data.data.customer.orders.edges);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <Grid container direction="row" >
        <h1>Purchase List</h1>
        <IconButton  onClick={refresh}>
          <Box sx={{ml: 2}}></Box>
          <RefreshIcon/>
          <Box sx={{mr: 2}}></Box>
        </IconButton>
      </Grid>
      <div style={{
        background: 'white', color: 'black', flexGrow: 1, height: 400}}> 
            <DataGrid
            columns={colDefs}
            rows={purchases}
            getRowId={(row) =>  row.node.id.substring(20)}
            components={{ NoRowsOverlay }}
            />
      </div>
    </>
  );
}

export default PurchaseList;
