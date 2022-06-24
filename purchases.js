


const {
    API_TOKEN_C9TG: token,
} = process.env;


const getPurchases = async (req, res) => {



    const id = req.query.id;

    const store = 'c9testingground';

    // const result = await fetch(
    //     `https://${store}.myshopify.com/admin/api/2022-01/graphql.json`,
    //     {
    //       body: `mutation {
    //         bulkOperationRunQuery(
    //           query:"""
    //           {
    //             customers(first: 10) {
    //               edges {
    //                 node {
    //                   email,
    //                   firstName,
    //                   lastName,
    //                   id,
    //                   createdAt
    //                 }
    //               }
    //             }
    //           }
    //           """
    //         ) {
    //           bulkOperation {
    //             id
    //             status
    //           }
    //           userErrors {
    //             field
    //             message
    //           }
    //         }
    //       }`,
    //       headers: {
    //         'Content-Type': 'application/graphql',
    //         'X-Shopify-Access-Token': token,
    //       },
    //       method: 'POST',
    //     },
    // );

    // const idTest = `gid://shopify/Customer/${id}`;
    // console.log(idTest);
    // const resultTrue = await fetch(
    //     `https://${store}.myshopify.com/admin/api/2022-01/graphql.json`,
    //     {
    //       body: `mutation {
    //         bulkOperationRunQuery(
    //           query:"""
    //           {
    //             customer(id: "gid://shopify/Customer/${id}") {
    //               id,
    //               email,
    //               firstName,
    //               orders(first: 10) {
    //                 edges {
    //                     node {
    //                         id
    //                     }
    //                 }
    //               }
                  
    //             }
    //           }
    //           """
    //         ) {
    //           bulkOperation {
    //             id
    //             status
    //             url
    //           }
    //           userErrors {
    //             field
    //             message
    //           }
    //         }
    //       }`,
    //       headers: {
    //         'Content-Type': 'application/graphql',
    //         'X-Shopify-Access-Token': token,
    //       },
    //       method: 'POST',
    //     },
    // );

    const resultTrue2 = await fetch(
        `https://${store}.myshopify.com/admin/api/2022-01/graphql.json`,
        {
          body: `
              {
                customer(id: "gid://shopify/Customer/${id}") {
                  id,
                  email,
                  firstName,
                  lastName,
                  orders(first: 10) {
                    edges {
                        node {
                            id,
                            name,
                            processedAt,
                            displayAddress {
                                address1,
                                city,
                                country
                            },
                            subtotalPriceSet {
                                presentmentMoney {
                                    currencyCode,
                                    amount
                                }
                            }
                        }
                    }
                  }
                }
              }
              
          `,
          headers: {
            'Content-Type': 'application/graphql',
            'X-Shopify-Access-Token': token,
          },
          method: 'POST',
        },
    );



    // const resultTrue3 = await fetch(
    //     `https://${store}.myshopify.com/admin/api/2022-01/graphql.json`,
    //     {
    //       body: `
    //           {
    //             customers(first: 10) {
                  
    //             edges {
    //                 node {
    //                     id,
    //                     lastName
    //                 }
    //             }
                  
    //             }
    //           }
              
    //       `,
    //       headers: {
    //         'Content-Type': 'application/graphql',
    //         'X-Shopify-Access-Token': token,
    //       },
    //       method: 'POST',
    //     },
    // );

    // const result = await fetch(
    //     `https://${store}.myshopify.com/admin/api/2022-01/graphql.json`,
    //     {
    //     body: `mutation {
    //         bulkOperationRunQuery(
    //           query:"""
    //           {
    //             orders(query: "gid://shopify/Customer/${id}") {
    //                 edges {
    //                   node {
    //                     id
    //                   }
    //                 }
    //             }
    //           }
    //           """
    //         ) {
    //           bulkOperation {
    //             id
    //             status
    //           }
    //           userErrors {
    //             field
    //             message
    //           }
    //         } 
    //     }`,
    //       method: 'POST',
    //     },
    // );

    // const result3 = await fetch(
    //     `https://${store}.myshopify.com/admin/api/2022-01/graphql.json`,
    //     {
    //       body: `mutation {
    //         bulkOperationRunQuery(
    //           query:"""
    //           {
    //             orders(query: "gid://shopify/Customer/${id}") {
    //                 edges {
    //                   node {
    //                     id
    //                   }
    //                 }
    //             }
                  
                
    //           }
    //           """
    //         ) 
    //           {
    //           bulkOperation {
    //             id
    //             status
    //             url
    //           }
    //           userErrors {
    //             field
    //             message
    //           }
    //         }
    //       }`,
    //       headers: {
    //         'Content-Type': 'application/graphql',
    //         'X-Shopify-Access-Token': token,
    //       },
    //       method: 'POST',
    //     },
    // );

    // const result2 = await fetch(
    //     `https://${store}.myshopify.com/admin/api/2022-01/graphql.json`,
    //     {
    //       body: `
    //           {
    //             orders(query: "gid://shopify/Customer/${id}") {
    //                 edges {
    //                   node {
    //                     id
    //                   }
    //                 }
    //             }
    //           } 
    //       `,
    //       query: '',
    //       method: 'POST',
    //     },
    // );

    


   
    const data = await resultTrue2.json();
    
    console.log("print: " + data.body);


    return res
      .status(200)
      .json({ message: `Your id: ${id}`, data, status: 'success' });
}

export default (req, res) => {
    switch (req.method) {
      case 'GET':
        return getPurchases(req, res);
      default:
        return res.status(405).json({ message: 'Method not allowed.', status: 'error' });
    }
  };