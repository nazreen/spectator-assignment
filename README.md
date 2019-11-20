# spectator-assignment

# up and running

1. Go to `/app/routes/calculate-basket/handleCalculateBasket.js`
2. On Line 5, replace 'API_KEY_HERE'` with the API_KEY provided
3. Run `npm start` in the project root folder

# making a request

Params are passed as queries in a GET request to `localhost:3000/calculate`

for example:
`GET http://localhost:3000/calculate?items=Apples,Bread&currency=USD`

items: comma separated list

currency: USD | EUR | GBP
