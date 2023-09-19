#### How to run the solution

-   git clone https://github.com/pvitalii/superheroes_app
-   cd superheroes_app
-   npm run start:init (to build docker images and run containers) 
    or 
    npm run start (if images have been already built)
-   npm run seed:dev (run it after db has initialized and backend has successfully started)

#### Functionality

-   On main page there is a navigation to access paginated list of heroes and form for creation new heroes
-   By click on each hero on the main page you can access page with detailed information about hero you have clicked on 
-   On details page also there are buttons for edit and remove superhero
-   Superpowers are seeded in database and using html select element with multiple option. So to choose several options you need to do it using CTRL button.
