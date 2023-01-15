# Scrapping movie lists from IMDB (43 movies)
## Notice 1: IMDB has since in Nov disallowed scrapping of their website. Nonetheless, I'd like to submit my codes from a few months ago about how I scrapped IMDB website with Python BeautifulSoup package as part of extra effort
## Notice 2: The "class" and "id" of each HTML element may change with IMDB technical updates
## Notice 3: Running this code may take up to 20mins (if the HTML elements still same)
from bs4 import BeautifulSoup
import requests
import re
import pandas as pd

# function to grab actors image from the movie page
def actor_images_grab(actor_link):
    """
    arg:
        actor_link(list): list of actors links.
    """
    # the last actor in the list is the actor you want (this is a pandas column later on)
    url = actor_link[-1]
    response = requests.get(url)
    container = BeautifulSoup(response.text, 'html.parser')
#     container = html_soup.find('div', class_ = "poster-hero-container")
    try:
        image_temp = container.find('img', attrs={"id":"name-poster"}).get("src")
        return image_temp
    except:
        return None

# remove punctuations from any string. Modified from: https://www.programiz.com/python-programming/examples/remove-punctuation
def removePunc(my_str):
    # define punctuation
    punctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''
    
    # remove punctuation from the string
    no_punct = ""
    for char in my_str:
        if char not in punctuations:
            no_punct = no_punct + char
            no_punct = no_punct.lower()

    # display the unpunctuated string
    return no_punct

# Downloading imdb top 100 movies in 2022
url = 'https://www.imdb.com/list/ls038754350/?sort=user_rating,desc&st_dt=&mode=detail&page=1'
response = requests.get(url)
html_soup = BeautifulSoup(response.text, 'html.parser')
type(html_soup)

movie_containers = html_soup.find_all('div', class_ = 'lister-item mode-detail')

# Lists to store the scraped data in
names = []
years = []
imdb_ratings = []
metascores = []
votes = []
runtime = []



director = []
director_link = []

small_posters = []
genres = []

storyPlot = []
links = []

movieStoryLine = []



test = actor_images_grab(["https://www.imdb.com/name/nm1886602?ref_=tt_cl_t_3"])

# Extract data from individual movie container
for container in movie_containers:
# If the movie has Metascore, then extract:
    if (container.find('div', class_ = 'ratings-metascore') and container.find('div', class_ = "ipl-rating-star small")) is not None:
        # The name
        name = container.h3.a.text
        names.append(name)
        # The year
        year = container.h3.find('span', class_ = 'lister-item-year').text
        years.append(year)
        # The IMDB rating
        imdb = float(container.find('span', class_ = 'ipl-rating-star__rating').text)
        imdb_ratings.append(imdb)
        # The Metascore
        m_score = container.find('span', class_ = 'metascore').text
        metascores.append(int(m_score))
        # The number of votes
        vote = container.find('span', attrs = {'name':'nv'})['data-value']
        votes.append(int(vote))
        # The Runtine
        runtime_mid = container.find('span', class_ ="runtime").text
        runtime_mid = runtime_mid.split(" ")[0].strip()
        runtime.append(runtime_mid)
        # The genre
        genre_temp = container.find('span', class_ ='genre').text.split("\n")[1]
        genres.append(genre_temp)
        
        # get the link of the movie
        link_temp2 = container.h3.find('a', attrs={'href':re.compile("^/title/")}).get('href')
        string_link = "https://imdb.com" + link_temp2
        links.append(string_link)
        # for each movie, get the poster link
        img_temp = container.a.find('img', attrs={"loadlate":re.compile("jpg$")}).get("loadlate")
        small_posters.append(img_temp)
        # movie story line (the paragraph after a div with a class label)
        story_temp = container.find('div', class_="inline-block ratings-metascore").find_next_sibling("p").get_text()
        movieStoryLine.append(story_temp)
        # get the director and actor names
        miniWords = container.findAll('p', { "class" : "text-muted" })
        # take the third element of each list because it corresponds to the "a" links
        # get the director and actor name list collectively before splitting up the list
        dirActor_temp = []
        for i in miniWords[1]:
            try:
                s= str(i).split('">')[1].split("</")[0]
                dirActor_temp.append(s)
            except:
                pass
        # no matter how many directors, i take only the first one
        director.append(dirActor_temp[0])
        # get the hyperlink to the directors and actors
        dirActor_link_temp = []
        for i in miniWords[1]:
            try:
                j= str(i).split('="')[1].split('">')[0]
                dirActor_link_temp.append(j)
            except:
                pass
        # no matter how many directors, i take only the first one
        director_link.append("https://www.imdb.com"+ dirActor_link_temp[0])

# define new list
actor1_pic = []
actor2_pic = []
actor3_pic = []
actor4_pic = []

actor1_as = []
actor2_as = []
actor3_as = []
actor4_as = []

actor1 = []
actor2 = []
actor3 = []
actor4 = []

actor1_link = []
actor2_link = []
actor3_link = []
actor4_link = []

# in each movie link, I will scrape the actor roles
for movie in links:
    print(movie)
    cast_names = []
    url = movie
    response = requests.get(url)
    html_soup = BeautifulSoup(response.text, 'html.parser')
    print(html_soup)
    container = html_soup.find('div', class_ = "ipc-shoveler ipc-shoveler--base ipc-shoveler--page0 title-cast__grid")
    cast_names_temp = container.findAll('a', attrs={"data-testid":"ipc-avatar--dynamic-width"})
    cast_as_temp = container.findAll('span', attrs = {"data-testid": "ipc-inline-list__item"})

 
    # get actor name and hyperlink of actor
    actors_per_movie = []
    actors_links = []
    for item in cast_names_temp:
        actors_per_movie.append(item.text)
        actors_links.append("https://www.imdb.com" + item.get('href'))
    # get casting as names
    actors_as = []
    for item in cast_as_temp:
        actors_as.append(item.text)
    # take only first 4 actors names
    actor1.append(actors_per_movie[0])
    actor2.append(actors_per_movie[1])
    actor3.append(actors_per_movie[2])
    actor4.append(actors_per_movie[3])
    # take first 4 actors corresponding link (so we can get the images later)
    actor1_link.append(actors_links[0])
    actor2_link.append(actors_links[1])
    actor3_link.append(actors_links[2])
    actor4_link.append(actors_links[3])
    # take first 4 actors casting roles
    actor1_as.append(actors_as[0])
    actor2_as.append(actors_as[1])
    actor3_as.append(actors_as[2])
    actor4_as.append(actors_as[3])
    # for every actor link, go to their website to scrape the image file
    # if there is not image for the actor, put my replacement image file
    actor1_pic.append(actor_images_grab(actor1_link) if not None else "/data/noImage_png")
    actor2_pic.append(actor_images_grab(actor2_link) if not None else "/data/noImage_png")
    actor3_pic.append(actor_images_grab(actor3_link) if not None else "/data/noImage_png")
    actor4_pic.append(actor_images_grab(actor4_link) if not None else "/data/noImage_png")
    
    # story plot
    html_soup2 = BeautifulSoup(response.text, 'html.parser')
    container2 = html_soup2.find('div', class_="sc-132205f7-0 bJEfgD")
    story_temp = container2.find('span', class_="ipc-html-content-inner-div").get_text()
    storyPlot.append(story_temp)
    
test_df = pd.DataFrame({'movie': names,
'year': years,
'imdb': imdb_ratings,
'metascore': metascores,
'votes': votes,
'runtime': runtime,
'genres':genres,
'storyPlot': storyPlot,
'google_image1': google_image1,  
'google_image2': google_image2, 
'google_image3': google_image3, 
'google_image4': google_image4, 
'google_image5': google_image5,                         
'director': director,
'actor1': actor1,
'actor2': actor2,
'actor3': actor3,
'actor4': actor4,
'actor1_as': actor1_as,
'actor2_as': actor2_as,
'actor3_as': actor3_as,
'actor4_as': actor4_as,  
'actor1_pic': actor1_pic,
'actor2_pic': actor2_pic,
'actor3_pic': actor3_pic,
'actor4_pic': actor4_pic,                         
'director_link': director_link,
'actor1_link': actor1_link,
'actor2_link': actor2_link,
'actor3_link': actor3_link,
'actor4_link': actor4_link,
                        
'links': links,
'small_posters': small_posters,

})
# do not truncate long strings
pd.set_option("display.max_colwidth", None)
print(test_df.info())

test_df.index.name = 'id'
test_df.year = 2022
test_df
# declare new dataframe
df = test_df
names = df['movie']
google_image1 = []
google_image2 = []
google_image3 = []
google_image4 = []
google_image5 = []

# scrape first 5 images from google based on movie name
for search in names:
    images_top5 = []
    # First 5 images from Google search
    search = removePunc(search)
    words = search.split()
    # google image search pattern : https://stackoverflow.com/questions/21530274/format-for-a-url-that-goes-to-google-image-search
    search_link = "https://www.google.com/search?q=" + '+'.join(words) + '&tbm=isch'
    # http://www.google.com/search?q=<SEARCH TERM>&tbm=isch
#     print(search_link)
    search_result = requests.get(search_link).text
    soup = BeautifulSoup(search_result, 'html.parser')
    images = soup.findAll('img',class_="yWs4tf")
    for item in range(5):
        a = images[item].get("src")
        images_top5.append(a)
    print(len(images_top5))

    # fill up the individual list
    google_image1.append(images_top5[0])
    google_image2.append(images_top5[1])
    google_image3.append(images_top5[2])
    google_image4.append(images_top5[3])
    google_image5.append(images_top5[4])

# add google searched images as part of the dataframe
df['google_image1'] = google_image1
df['google_image2'] = google_image2
df['google_image3'] = google_image3
df['google_image4'] = google_image4
df['google_image5'] = google_image5

# Merge the dataframe with another dataframe which i had to manually make data for the 43 movies
df_left = df
df_right = pd.read_csv("data/handtyped_movielist.csv")
# merge
df_final = pd.merge(df_left, df_right, on=["id"])
df_final.drop(["Unnamed: 0","movie_y"], axis = 1, inplace = True)
df_final.rename(columns={"movie_x":"movie"}, inplace = True)
df_final.to_csv("data/2022_movies_final_merged.csv", index = False)

# if the actor image is empty, fill with a standard image i had
df_add_image = df_final
df_add_image[['actor1_pic','actor2_pic','actor3_pic','actor4_pic']] = df_add_image[['actor1_pic','actor2_pic','actor3_pic','actor4_pic']].fillna('data/noImage.png')
df_add_image.to_csv("data/2022_movies_final_merged.csv", index = False)
df_add_image.drop(["Unnamed: 5"], axis = 1, inplace = True)
# merge with HD images (must create this earlier)
df_HD = pd.read_csv("data/movie_HDImages_CA2.csv")
df_finalHD = pd.merge(df_add_image, df_HD, on=["id"])
df_finalHD.to_csv("data/2022_movies_final_merged.csv", index = False)

# we only need this file for next steps in REACTJS : "data/2022_movies_final_merged.csv"