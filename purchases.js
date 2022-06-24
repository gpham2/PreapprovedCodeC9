


const {
    API_TOKEN_C9TG: token,
} = process.env;


const getPurchases = async (req, res) => {

    const id = req.query.id;

    const store = 'c9testingground';

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

    const data = await resultTrue2.json();
    
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