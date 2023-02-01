# Authored by: Chan Jia Yi (P7337992) Date: 31 Jan 2023
# Installations
`npm install react-bootstrap bootstrap`   
`npm i react-router-dom`  
`npm install --save-dev style-loader css-loader`  
`npm install --save-dev webpack webpack-cli`  


# How to run the app?
1. Open the first terminal at the root of the folder and type `npm start`  
2. Open a second terminal at the root of the folder and type `npm run build`
3. On your VSC, click "Live Preview" and a browser window will pop up from __"127.0.0.1:5500/index_CA2.html"__.

# Brief run through of the files
1. All the codes are located in __"/src/Assignment_CA2_P7337992/", "index_CA2.html" and "App_Assignment2_P7337992.jsx"__
1. Run the frontend from __"127.0.0.1:5500/index_CA2.html"__   
1. `Python` and `bash` scripts available in folder __"/src/Assignment_CA1_P7337992/Other_codes_CA1"__. Bash script is to run all the command lines at once. Inside it will run a environment file followed with 3 python files. The final product will be "movieList.json" which I put into folder "dist". We have to put at dist so the `fetch` call can find the file.  
1. __"127.0.0.1:5500/index_CA2.html"__ is reading the js from __"/dist/App_ca2.js"__. The React DOM and HashRouter is from __"/src/App_Assignment2_P7337992.jsx"__ . The rest of the files are React Component.     

## Under folder "/src/Assignment_CA2_P7337992"  
1. __"storage.js"__ stores all the reducers.
1. __"Login.jsx"__ generates the Landing/Login Page.
1. __CreateUserAccount.jsx"__ generates the Create New Users Page. It can be navigated by both the navbar and also via Login Page.  
1. __"ListMoviesPage.jsx"__ is the page that fetches movie data from json file.
1. __"RootPage.jsx"__ contains the Navigation bar and links.    
1. __"HomePage.jsx"__ is the file that controls whether to populate the login page or the landing homepage.  
1. __"MovieAdd.jsx"__ is the component to ADD listings on Movie Listings Page.It is rendered from "ListMoviesPage.jsx"   
1. __"MovieDisp.jsx"__ is the component that writes all the functions in each movie card, such as the Delete singularly button, pin button, checkbox, card design, and function to go to Details Page. All the cards have clickable hyperlinks to IMDB website when click on movie name. It is rendered via "MovieList.jsx"     
1. __"MovieDeleteMany.jsx"__ is the component that renders when "Delete Selected" button is clicked.   
1. __"MovieRetrieve.jsx"__ is the component for "Retrieve" section. It is rendered from "ListMoviesPage.jsx"  
1. __"MovieAfterRet.jsx__ contains the form controls for "MovieRetrieve.jsx"   
1. __"MovieList.jsx"__ This is the component that renders the app when Delete singularly or Many at once, and sorts the remaining cards. There is algorithm on how to Delete Many in here. It is rendered from "ListMoviesPage.jsx" and "MovieRetrieve.jsx".   
1. __"DetailsPage.jsx"__ is the component that renders the display at the Details Page. It is rendered from "ListMoviesPage.jsx"   
1. __"MoviePin.jsx"__ is the component that loads the "Pinned page"   
1. __"MoviePinDisp.jsx"__ is the component that displays the cards under "Pinned Page"  
1. __"MovieUpdate.jsx"__ is the component that renders the form control for "Update Movies" page.  
1. __"MovieUpdateDisp.jsx"__ is the component that renders the cards for "Update Movies" page.  


## Under folder "/src/Assignment_CA2_P7337992/slices" 
1. __"addFieldsSlice.js"__ is a the slicer for keeping track of the form controls under Add.
1. __"filterfieldSlice.js"__ is a slicer to keep track of the current input fields data.  
1. __"movieSlice.js"__ is a slicer to keep track of the current movie list.  
1. __"pageSlice.js"__ is a slicer to keep track of the login status.  
1. __"pinSlice.js"__ keeps track of the movie id of which movie is pinned.  
1. __"updatefieldSlice.js"__ is a slicer that keeps track of the form controls under Update Movie. 
1. __"userAccountSlice.js"__ keeps the list of new user details.
1. __"userfieldSlice.js"__ keeps track of the current user creation fields like username and password.
 

## Styling
1. The app is refering to __"/main.css"__ for styling. Needed to add "!important" at each style, else React Bootstrap will overwrite all the styling.  
2. React Bootstrap

# Features and Functions
***Please forgive me for some gif to be slightly outdated -- I have since included "Create New User" in Navbar, which is not reflected in some of the gif (may re-record in future!). Otherwise, functions are the same!***

## 1. Create New User
![](/src/Assignment_CA2_P7337992/readmeImages/createNewUser.gif)
This can be access from Login Page or Navbar. User can create new profile by typing in username and password. Once Create button is clicked, user will see a Login button to be redirected to the Login page with valid user accounts. The stored initialised account is _username:jy_, _password:123_. Otherwise, user can create new profile and use them in Login Page.
## 2. Login
![](/src/Assignment_CA2_P7337992/readmeImages/howToLogin.gif)  
Type in valid credentials such as Username: *jy* and Password: *123* (just the stored example). You can _hide_ and _unhide_ the password field. If invalid credentials are used, alert message will be given. After logged in, user will land on the Movie Listings Page.  
Before login, if the user clicks on any of the navigators, it will say "Please go to Login Page". Users can click the Nav brand (the image logo on the left) or click "Login" to route to Login page.

## 3. Logout  
![](/src/Assignment_CA2_P7337992/readmeImages/howToLogout.gif) 
On the "Movie Listings" page, click the grey button that writes "Logout".  
## 4. Add Movies
![](/src/Assignment_CA2_P7337992/readmeImages/addMovie.gif)  
Input all the fields and click "Add". New movie listing will be added to the existing list. This updated list persists throughout the whole app until next action is done (such as delete, add or update).

## 5. Retrieve Movies
![](/src/Assignment_CA2_P7337992/readmeImages/retrieveMovie.gif) 
You can use all the input fields under "Retrieve Movies" to filter for your requirements.  

`Old/New`: If the movie is made before May 2022, it is Old. Otherwise, it is new movie. If there is no date provided to the movie, it will be classed as Old movie.   

`Genre`: Genre is filtered based on the remaining list of movies, no matter which filtered is already used. Each movie can contain more than one Genre.   

`Min Rating`: The floor rating. Any movies with ratings above this value will be shown.   

`Type movie name`: Type part/full of the movie name, regardless of upper or lower case.  

## 6. Delete One or Delete Many movies(checkboxes and button)
![](/src/Assignment_CA2_P7337992/readmeImages/deleteMovie.gif)   
__To delete one movie at a time__, click on the "delete" button on each of the movie cards.    
__To delete many movies at a time__, check the boxes on which movies you want to delete followed with clicking the blue button "Delete Selected".  

My algorithm is tight as regardless whether you clicked or unclicked any of the checkboxes, it will still keep track of which boxes is in the end "checked", by checking which checkbox is clicked an odd number of times.  
![](/src/Assignment_CA2_P7337992/readmeImages/solidAlgoDeleteMany.gif)   

## 7. Pin
![](/src/Assignment_CA2_P7337992/readmeImages/pinMovie.gif)   
To pin a movie, click on the "Pin" button on each of the movie cards. Once the button is clicked, the "Pin" button will be hidden. The pinned movies will go to another page "Pinned Movies" which you can see in the Navbar. As instructed by requirements, we can only __pin up to 5 movies__.

## 8. Unpin
![](/src/Assignment_CA2_P7337992/readmeImages/unpinMovie.gif)   
Go to "Pinned Movies" page and click on "Unpin" for the cards that you want to unpin. It will unhide the "Pin" buttons back at "Movies" page, while deleting the card in "Pinned Movies" page.

## 9. Details page
![](/src/Assignment_CA2_P7337992/readmeImages/detailsPage.gif) 
Click on "details" button on whichever card preferred. You will head to the details page with the browser link being "127.0.0.1:5500/index_ca2.html#/details/2" if the movie id is "2". If you had not selected any movie at the start (with cleared browser history), if you click on "Details" page, the URL link will read something like "127.0.0.1:5500/index_ca2.html#/details/check" with no movie details populated.  

## 10. Update page
![](/src/Assignment_CA2_P7337992/readmeImages/updateMovie.gif)
Click on "Update Movie" on the Navbar to go to updates page. 
Use the search bar to string match the movie names with partial or full string match.   
Once you found the movie, click "Select movie for Update" on the card. The movie details corresponding to the clicked card will be populated onto the Update fields.   
Feel free to edit any of the fields before clicking "Update" button in blue.  
To edit more than the primary fields, click the __Accordion__ to expose more fields to update.  
Once the fields are updated, it will reflect on the current movie list, across all pages.
![](/src/Assignment_CA2_P7337992/readmeImages/retainedUpdates.gif)

# The End of WDF CA2!