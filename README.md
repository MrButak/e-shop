# e-shop

**About:**
Full-stack e-commerce website which accepts payments via stripe, sends confirmation emails, and integrates a postgres database to update 
menu items and store order information.
    
**Technologies:**
Frontend: Vue, Javascript , CSS, Backend: Node.js, Express, Postgres, Stripe API, Send In Blue API, Heroku (for deployment)

**Database:** A Postgres database is used to store menu items and order and customer details.
	
**Address Validation:** Google Places library as part of the Maps API was used to ensure the delivery address was valid and in 
delivery range.
	
**Payment:** Stripe payment API is used to validate payment details.
	
**Order Receipt:** I used a webhook to watch for payment confirmation from Stripe, then used Send In Blue's 
SMTP API to send a templatized e-mail with order details and delivery time.
