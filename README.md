# Secondhand Bazaar - Resale Market | [Live Site](https://secondhand-bazaar.web.app/)

This website is created to sell used (second-hand) Desktop computer parts. This project was created as a part of assignment of **Complete Web Development Bootcamp** by **Programming Hero** with **Jhankar Mahbub**. 

## Project Features

### Categories
* Users can find items of different categories.
* Each category page is generated dynamically.
* Each category page has items associated with that category.

### Buyer
* User can log in either as a buyer or a seller.
* If logged in as buyer user can book an item from categories or advertised section.
* User can pay for the booked item to finalize the deal from my orders page in dashboard
* Buyers can pay with stripe payment gateway.
* User can also report an item.

### Seller
* Seller can not buy items and can only sell items.
* sellers will see Add a item, my items, my buyers page in dashboard.
* In the add a item page user can upload a item with relevant information.
* Uploaded items will appear in my items page.
* User can advertise or remove the item.
* If someone buys the item it will appear in my buyers page along with buyer information.

### Admin
* Admin can see all sellers and all buyers in All Sellers and All Buyers page in dashboard.
* Admin can remove a seller or user.
* Admin can remove a reported item.

### Advertised Items
* This website has a section for advertised items which are being advertised by sellers.
* Sellers can add or remove advertising of their items.

### Security
* All dashboard routes are protected.
* Each type of user can only access relevant routes in dashboard.
* Firebase authentication and JWT based authorization is used to maintain security.

### Blog
* In the blog page there are some web development related question and their answers.

### Others
* User is notified of each action with toast.
* Data from server is cached.
* Express is used on server and MongoDb is used as database.

### Used npm packages
* react
* tanstack/react-query
* axios
* firebase
* react-router-dom
* tailwindcss
* daisyui
* react-hook-form
* react-hot-toast
* react-icons
* stripe/stripe-js
* stripe/react-stripe-js


##### Admin access
adminEmail: admin@gmail.com

adminPassword: 111111