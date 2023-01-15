# Installations
`npm install react-bootstrap bootstrap`   
`npm i react-router-dom`  
`npm install --save-dev style-loader css-loader`  

dropped "style.css" into `/node modules` folder so it can render 
Edited the `/webpack.config.js` file so the app can load css and styles

# How to run the app?
1. Open the first terminal at the root of the folder and type `npm start`  
2. Open a second terminal at the root of the folder and type `npm run build`
3. On your VSC, click "Live Preview" and a browser window will pop up from __"127.0.0.1:5500/index_CA1.html"__.

# Brief run through of the files
1. Run the frontend from __"127.0.0.1:5500/index_CA1.html"__   
2. `Python` and `bash` scripts available in folder __"/src/Assignment_CA1_P7337992/Other_codes_CA1"__. Bash script is to run all the command lines at once. Inside it will run a environment file followed with 3 python files. The final product will be "movieList.json" which I put into folder "dist". We have to put at dist so the `fetch` call can find the file.  
3. __"127.0.0.1/5500/index_CA1.html"__ is reading the jsx from __"App_Assignment1_P7337992.jsx"__. The rest of the files are React Components.    
4. __"Login.jsx"__ generates the Landing/Login Page.  
5. __"ListMoviesPage.jsx"__ is the file that generates the Movie Listings Page.  
6. __"StartList.jsx"__ is the component to load the INITIAL listings on Movie Listings Page.  
7. __"MovieAdd.jsx"__ is the component to ADD listings on Movie Listings Page.   
8. __"MovieDelete.jsx"__ is the component that writes all the functions in each movie card, such as the Delete singularly button, checkbox, card design, and function to go to Details Page. 
9. __"MovieDeleteMany.jsx"__ is the component that renders when "Delete Selected" button is clicked.  
10. __"MovieHide.jsx"__ is the component for "Retrieve" section.
11. __"MovieList.jsx"__ This is the component that renders the app when Delete singularly or Many at once, and sorts the remaining cards. There is algorithm on how to Delete Many in here.  
12. __"DetailsPage.jsx"__ is the component that renders the display at the Details Page.
13. The app is refering to "styles.css" at "node_modules/mycodes/Assignment_CA1_P7337992/styles.css".   



# 1. Landing page
This page is reading direct from `index_CA1.html`.  The browser address should be `http://127.0.0.1:5500/index_ca1.html`.  
Landing page will land on the `login page` like so:
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/1.jpg)
Username: jy , Password: 123   
If you type wrongly, you will have error alert message as shown:  
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/2.jpg)

# 2. Movie Listings page
once you successfully login by clicking the `login` button on Landing page, you will reach this:
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/3.jpg)  
Here you have a slew of functions mainly :   
1 . Reset/initialise button    
2 . Adding new movies function    
* Title of movie
* Rating of movie
* Genre of movie(one or more, separated by commas)
* Poster URL of movie
* Website URL of movie
* Movie's release date in format (MMM DD, YYYY)   

3 . Retrieve/filtering function    
* Old/New/All movies (where old means before May 2022)
* Genre (this menu will be first filtered by Old/New/All to prevent undefined selection)  
* Min Rating (filter ratings above this value)
   
4 . Select many and Delete/ delete singular function 
* If you press the `Delete` button at each movie card, it is singular delete
* If you check the checkboxes of a few movies and press the button `Delete Selected` is to delete many movies at once. Cards will disappear in place.   

5 . Logout function    
* `logout` button brings you back to Landing Page  

__To Start the page__ click `Load initial Movies/Reset` and you will see:
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/3.5.jpg). There are total of 43 movie listings, all data are scrapped from the web with `Python` using `BeautifulSoup` and `Serapi` packages.

# 3. Add Movies at Listings page
Start typing in the fields at "Add" section
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/4.jpg). Once you hit `Add` button, you can see the newest movie is added to the top left:
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/5.jpg).

My code has been proven to add unlimited number of entries and it will all add on to the top left.   

Furthermore, these new entries will add to existing movie list and can be used in also `Retrieval` and `Deletion` sections!   

# 4. Retrieve/ Filter Movies at Listings Page
You can input your requirements as follows:
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/6.jpg). The code has a safety `prevent default` to prevent non numeric inputs under `Min rating`.
Once you click the `Retrieve` button, the results accurately filters as shown:
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/7.jpg).  

# 5. Delete many/ Delete singular at Listings Page
If you want to delete one at a time, simply press the `Delete` button located within each movie card:
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/8.jpg)  
To prove it has been successfully removed correctly:
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/9.jpg) 
If you want to delete many at a go, click the checkboxes called "Add to delete list"within each of the movie card, followed with pressing `Delete Selected` button under the "Delete those selected" section.
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/10.jpg) 
To prove it has been successfully removed correctly:
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/11.jpg) 

# 6. Details page
Click on `Details Page!` button at each card like so:
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/12.jpg) 
You will end up with this details page with a lot of features inclusive of hyperlinked posters, embedded Youtube videos and more!
![](/src/Assignment_CA1_P7337992/Other_codes_CA1/data/readme_img/13.jpg) .
Finally, there is a `Back` button so you can return to `Movie Listings page`. At `Movie Listings Page`, you can also logout to head back to Landing page.

# Extra bonus features into consideration
1. React Bootstrap CSS features
2. Used state variables to link between login, listings and details pages
3. Tight algorithm and logic such as
* When you click and unclick selections and delete, it will delete the correct listings, and not those which was clicked followed with unclick (even multiple times). To do this, notice that checkboxes clicked EVEN number of times means it was unclicked, checkboxes clicked ODD number of times means it was ticked. Find all the indexes of the movies that have ODD number of times it was ticked, and send for list splicing => Delete many at once.  
* Made sure after deleted the movies, the `Details page` managed to still go to the correct movie as I had used `localStorage` to store the movie index (item's id, not the location id of the list item) and at Details page I filtered all the current movie listing(even after add, or delete) based on item id to retrieve the corresponding movie Details.  
4. Used Python's `BeautifulSoup` and `Serapi` to scrape movie details from IMDA(before it got banned) and transform it to JSON.
5. Used `Fetch` request to import JSON object from ".json" extention. (Notice the json is written like and object of object `{{},{},{}}` instead of list of objects `[{},{},{}]`.
6. Explored tools like `React.useEffect` because some variables re-render very quickly such as `Fetch`. React.useEffect() helps control when the variables re-render.
7. Troubleshoot and solved how to import bootstrap and css because our current file set up does not allow `import` functions.

# Learning points and experience
1. Had to learn `React` from scratch over a short few weeks. Doing this project took me 2.5 weeks, but it was well worth the learning experience.
2. Had a lot of difficulty when debugging point 3-7 in the Extra Bonus Features. After doing a lot of debugging, managed to solve them independently.
3. Had so much trouble getting to understand the State and State Function syntax, not sure when to write what, when to use functions or properties.
4. React always convert all my ".css" files to ".css.js" and ".css.js.js" file format and caused me to not able to use the styling. FORTUNATELY, I found the solution is to drop into `node modules` and import from there.

Overall, this had been such a rewarding experience and my first React project. Hope you enjoyed my work! Thank you!