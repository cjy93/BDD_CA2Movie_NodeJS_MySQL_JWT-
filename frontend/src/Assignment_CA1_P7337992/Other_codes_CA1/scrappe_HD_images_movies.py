# Scrappe HD movie images from Google with serapi instead of just thumbnails
## Notice: This app is still working
import pandas as pd
import numpy as np
from serpapi import GoogleSearch
import API_KEY_serapi as apiKey

df = pd.read_csv("data/handtyped_movielist.csv")
title_list = df['movie']

# Function to extract HD movie link based on title given
# Since free Serapi account allows only 100 searches each month, i split my search into 20, 20, 3 with a few accounts
def extractFullHD(title, api_key):
    params = {
        "api_key": api_key,
        "engine": "google",
        "q": title,                       # search query
        "tbm": "isch",                    # image results
        "num": 5,                     # number of images per page
        "ijn": 0,                         # page number: 0 -> first page, 1 -> second...
        }

    search = GoogleSearch(params)
    results = search.get_dict()
    return results

# My github account API key
api_key = apiKey.GITHUB_API_KEY # Do not upload to public github
list_all = []
for i in range(len(title_list)):
    dicts = {}
    dicts[i] = extractFullHD(title_list[i], api_key)
    list_all.append(dicts)

# Make a list of numeric columns
df_HD = pd.DataFrame(columns=list(range(20)))
df_HD = df_HD.add_prefix('HD_')

# Add 20 images per movie to the dataframe
for movie_item in range(len(title_list)):
    get_links = list_all[movie_item][movie_item]['images_results']
    original = []
    print(movie_item)
    for i in get_links:
        original.append(i['original'])
    # append only 20 HD images per movie
    df_HD.loc[len(df_HD)] = original[:20]

df_HD.to_csv("data/movie_HDImages_CA2.csv")