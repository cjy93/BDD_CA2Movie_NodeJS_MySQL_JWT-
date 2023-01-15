#!/bin/bash

# install these dependencies
pip install -r requirements.txt
# run this script to get "data/movie_HDImages_CA2.csv"
python scrappe_HD_images_movies.py
# run this script to get "data/2022_movies_final_merged.csv" which is what we will input into ReactJS
python scrapeMoviesIMDB.py
# convert csv to json
python convertCsvToJson.py
# HOW TO RUN THIS (on WSL2)
# `bash runScript.sh`