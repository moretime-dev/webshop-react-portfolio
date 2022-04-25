This project is for my frontend portfolio website. It is a fictional e-Commerce website made with React.

It is connected to a simple Firebase/Firestore database that contains users and products data. It renders a list of products, that can be filtered in several ways (categories and values like alphabetical or least/most expensive). All products have a details page and can be added to the cart from there. The cart itself is able to add and remove products or change the amount of a certain item.

There is a simple login function that will render content for logged in status conditionally. A user has a profile page with shipping address and order history. An admin will be able to create new products and edit/delete products from the shop.

The biggest task for me was to handle the state of products and user globally. I used the context API to solve this. While doing so I faced the situation where I have several files to manage different states, which made me realize how Redux might be a better solution for this. I am currently working on a new project that will do it in that way.
