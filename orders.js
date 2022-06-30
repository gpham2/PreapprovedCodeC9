import { Headers } from 'node-fetch';
import fetch from 'node-fetch';
import axios from 'axios';


const token = "Bearer <INSER TOKEN HERE>";

const headerObj = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, 
  }); 

const getOrders = async (req, res) => {
    const resultTrue = await fetch(
        `https://public-api.shiphero.com/graphql/`,
        {
          body: `query {
            orders(email: "vincent@cloud9.gg") {
              data(first: 100) {
                edges {
                  node {
                    id
                    line_items(first: 2) {
                      edges {
                          node {
                              id
                              sku
                              quantity
                              product_name
                              fulfillment_status
                              quantity_allocated
                              backorder_quantity
                              barcode
                          }
                      cursor
                      }
                    }
                  }
                }
              }
            }
          }`,
        //   headers: {
        //     'Content-Type': 'application/graphql',
        //     'Authorization': token,
        //   },
          headers: headerObj,
          credentials: 'include',
          //mode: 'cors',
          method: 'POST',
        },
    );

    //Can use go to http://localhost:3000/api/shiphero/orders/
    const data = await resultTrue.json();
    console.log(data);
    return res
      .status(200)
      .json({ message: `working`, data, status: 'success' });
}

export default (req, res) => {
    switch (req.method) {
      case 'GET':
        return getOrders(req, res);
      default:
        return res.status(405).json({ message: 'Method not allowed.', status: 'error' });
    }
  };