import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { apiRequest } from '../../util/util';
import {createListString} from '../../util/createListString'; 



function PurchaseList({ id }) {
  const [purchases, setPurchases] = useState([]);
  
  const [colDefs] = useState([
      { field: 'id', flex: 1, headerName: 'ID', valueGetter: ({ row }) => row.node.id.substring(20) },
      {
        field: 'date', flex: 1, headerName: 'Date (PST)', valueGetter: ({ row }) => 
        timeConvert(row.node.processedAt),
      },
    //   {
    //     field: 'address', flex: 2, headerName: 'Shipping Address', valueGetter: ({ row }) =>
    //     `${row.node.displayAddress.address1}, ${row.node.displayAddress.city}, ${row.node.displayAddress.country}`,
    //   },
      {
        field: 'items', flex: 2, headerName: 'Items', valueGetter: ({ row }) => 
        // row.node.lineItems.edges.reduce((accum, item) => { return `${accum} ${item.node.name}`;}, ''),
        createListString(row.node.lineItems.edges, (item) => item.node.name),
      },
      {
        field: 'total', headerName: 'Total', valueGetter: ({ row }) => 
        `$${row.node.subtotalPriceSet.presentmentMoney.amount}`,
      },
    ]);

  const timeConvert = (utcTime, newZone) => {
    
    const oldTime = new Date(Date.UTC(
        parseInt(utcTime.substring(0,4)),   // year
        parseInt(utcTime.substring(5,7)),   // month
        parseInt(utcTime.substring(8,10)),  // day
        parseInt(utcTime.substring(12,14)), // hour
        parseInt(utcTime.substring(15,17)), // minute
        parseInt(utcTime.substring(18,20))  // millisecond
    ));

    const pst = oldTime.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles"
    })

    return pst;
  }


  const refresh = async () => {
    const data = await apiRequest(`/shopify/purchases/?id=${id.substring(23)}`, 'GET');
    console.log("testing");
    setPurchases(data.data.customer.orders.edges);

  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <h1>Purchase List</h1>
      <div style={{
        background: 'white', color: 'black', flexGrow: 1, height: 400}}> 
        <DataGrid
            columns={colDefs}
            rows={purchases}
            getRowId={(row) =>  row.node.id.substring(20)}
            />
      </div>
    </>
  );
}

export default PurchaseList;
