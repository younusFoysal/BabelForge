
<h1 align="center">BABEL FORGE </h1>

# Live Link:
## [Babel-Forge.web.app](https://babel-forge.web.app)

# To Run Local

```bash
# Clone this project
$ git clone https://github.com/younusFoysal/BabelForge.git

# Access
$ cd Quarter-web

# Install dependencies
$ yarn

# Run the project
$ yarn dev

# The server will initialize in the <http://localhost:3000>
```

# Project Description

- You have to use yarn run this project

- see banner about building, loaction, cuppon section in home page

- see all the appertments information in appertments page.you can also see nice pagenation in this page

- in appertments section a user can send a request for appertment . one user only can request one appertment .

- in dashboard section admin see agrement request who send a request for appertment . if admin accept the request then the user will be a member . if admin can not accept there is nothing change The user will have the role user.

- a admin can manage member where he will delete the member.when he delete the member the member role is turn into the user member can not access member dashboard. he will become a user

- admin profile admin will see totla number of user rooms aviable rooms and also see nice profile information

- admin can make annoucement for all the members and users

- admin can make cuppon for discount.also he can edit the cuppon

- for authentication i am using jwt .if you are not admin you cannot access any admin api route if you are admin only you can access because i am using jwt verity token verify admin to handle this system.

- in member profile see a member deatis which appertment he has selected and profile information

- a member can make the payment for his appertment .in payment he cad selected which month he wants to pay when he click the submit this will go on other payment page where member can see cuppon code and card payment system.if member is input valid cuppon he will get discount if he provide invalid cuppon this is show a nice toast notiification.if member will pay and if successful he will see his payment information in payment history page.

- you can see all the data is fetching by tanstack query.You can see reusable components,private route,authentication system, context api, props drilling handle in this project

- all the data come from backend server and in loading state you can a awesome loading

- This website is fully responsive mobile tablet desktop devices