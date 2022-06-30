import { Headers } from 'node-fetch';
import fetch from 'node-fetch';
import axios from 'axios';


const token = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJUQXlOVU13T0Rrd09ETXhSVVZDUXpBNU5rSkVOVVUxUmtNeU1URTRNMEkzTWpnd05ERkdNdyJ9.eyJodHRwOi8vc2hpcGhlcm8tcHVibGljLWFwaS91c2VyaW5mbyI6eyJuYW1lIjoiVHlsZXIgQmFyc3RvdyIsImZpcnN0X25hbWUiOiJUeWxlciIsImxhc3RfbmFtZSI6IkJhcnN0b3ciLCJuaWNrbmFtZSI6InR5bGVyIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzg4ZmFmYmI2YTY3MGEwZDBiZjM4ZGQwZWM4NTkyM2JhP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGdGIucG5nIiwiYWNjb3VudF9pZCI6NTkzNjksImlzX2FjY291bnRfYWRtaW4iOmZhbHNlfSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5zaGlwaGVyby5jb20vIiwic3ViIjoiYXV0aDB8NjIzY2IxNDdiZjdmNDIwMDc0ZDNkNGRmIiwiYXVkIjpbInNoaXBoZXJvLXB1YmxpYy1hcGkiXSwiaWF0IjoxNjU2NjI2NDk5LCJleHAiOjE2NTkwNDU2OTksImF6cCI6Im10Y2J3cUkycjYxM0RjT04zRGJVYUhMcVF6UTRka2huIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSB2aWV3OnByb2R1Y3RzIGNoYW5nZTpwcm9kdWN0cyB2aWV3Om9yZGVycyBjaGFuZ2U6b3JkZXJzIHZpZXc6cHVyY2hhc2Vfb3JkZXJzIGNoYW5nZTpwdXJjaGFzZV9vcmRlcnMgdmlldzpzaGlwbWVudHMgY2hhbmdlOnNoaXBtZW50cyB2aWV3OnJldHVybnMgY2hhbmdlOnJldHVybnMgdmlldzp3YXJlaG91c2VfcHJvZHVjdHMgY2hhbmdlOndhcmVob3VzZV9wcm9kdWN0cyB2aWV3OnBpY2tpbmdfc3RhdHMgdmlldzpwYWNraW5nX3N0YXRzIG9mZmxpbmVfYWNjZXNzIiwiZ3R5IjpbInJlZnJlc2hfdG9rZW4iLCJwYXNzd29yZCJdfQ.INzGFGcz3OTNjas9WDB03Y8QQ-hOLEo2_-7JriUrKlCed9KAAdu5k1QiPa-BqWLobepYFBORicSRj26Z-LBIQi7eD5MGzlL5aTjfoh_hHbXiS6-elw3lzGpoZQb5whEWUvMT087jcJPlr9a7b4Q7SGRfsutpC1VVOCv6tvJpl9JdmK2WTBtXsxPeWSfXhdoyRp3Pq4dmqfXlMi3KXwGaPNfVW7yfmtHgn4AZ4OlLE8QztmtvgSD89pT7x76-6NFPKvSjw3Df6dIrNKAg7sG894oEaO9n--Hxt_6vmnuA_KkdhBeHkwVZxT4xKId55YUsg-va5k4V4Ao7snD-eKCLaQ";
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