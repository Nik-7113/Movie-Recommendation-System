# Movie Recommendation System

This is a **Movie Recommendation System** built with **React** for the frontend and **Python** for the backend. It provides movie recommendations based on a custom-built machine learning algorithm that utilizes data science concepts. The movie data and recommendations are fetched dynamically from the backend.
Deployed link : [https://movie-recommender-9f504.web.app/](https://movie-recommender-9f504.web.app/)
## Features

- **Movie Exploration**: View a list of movies with their title and a brief overview.
- **Movie Recommendations**: Enter a movie title to get recommendations based on the movie's genre, keywords, cast, and crew.
- **Movie Info Dialog**: Click on a movie to open a dialog with more details (coming soon feature).
- **Dark Mode UI**: The app is designed with a dark theme for enhanced user experience.

## Technologies Used

- **Frontend**: React, Material UI, Axios (for fetching data)
- **Backend**: Python (via PythonAnywhere), RESTful API
- **Machine Learning**: 
    - **Cosine Similarity** for finding similar movies based on text data (tags, genres, keywords, cast, and crew).
    - **CountVectorizer** from scikit-learn for text vectorization, converting movie attributes like genres, keywords, and cast into numeric data that can be compared for similarity.
  
## Backend Logic (Machine Learning)

The recommendation system uses a **content-based filtering approach** where movie attributes (such as genres, keywords, cast, crew, and overview) are combined into a "tags" column. These tags are processed and compared using the following steps:

1. **Data Merging and Preprocessing**: 
   - The movie data (`tmdb_5000_movies.csv`) is merged with movie credits (`tmdb_5000_credits.csv`) using the movie title.
   - The columns related to genres, keywords, cast, and crew are cleaned and processed to convert strings into lists using Python's `ast.literal_eval` function.
   - Link for Datasets : https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata
     
2. **Text Vectorization**:
   - The **CountVectorizer** from scikit-learn is used to convert text data (tags) into numeric vectors.
   - A total of 5,000 features are extracted from the tags, which consist of genres, keywords, cast, crew, and overview.

3. **Cosine Similarity**:
   - The **Cosine Similarity** algorithm is used to compare the vectorized movie tags and calculate the similarity between movies.
   - This similarity is then used to recommend movies that are most similar to the one entered by the user.

4. **Recommendation Function**:
   - The system uses an index lookup to find the movie that matches the user's input and then calculates the most similar movies.
   - The top 5 recommendations are returned based on their similarity score.

Example:

For the movie *Avatar*, the system recommends:
- *Titan A.E.*
- *Small Soldiers*
- *Ender's Game*
- *Aliens vs Predator: Requiem*
- *Independence Day*


4. The backend should be hosted separately (e.g., using PythonAnywhere). Ensure your backend is running to fetch movie data and recommendations.

## How to Use

1. **Movies Tab**: Browse through the list of movies. Click on a movie to view more details.
2. **Recommender Tab**: Enter the name of any movie in the search bar to get a list of recommended movies based on that title.

## Screenshots

![image](https://github.com/user-attachments/assets/b3e1aa77-c58a-40af-a01b-7894aaf48f7c)

![image](https://github.com/user-attachments/assets/3649a20b-85cc-4e56-9a02-8f752d23ad9f)


## Contributing

Feel free to fork the repository and submit issues or pull requests. Contributions are always welcome!

1. Fork this repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- [Material UI](https://mui.com/) for the UI components.
- [React](https://reactjs.org/) for the frontend framework.
- [PythonAnywhere](https://www.pythonanywhere.com/) for hosting the backend API.
- **scikit-learn** for the machine learning algorithms: **CountVectorizer** and **Cosine Similarity**.

---

### Notes

- The recommendation system is based on the **content-based filtering** approach, which uses movie attributes such as genres, keywords, cast, and crew to make recommendations.
- This app requires a backend that serves the data and handles the recommendation logic. The backend API is implemented using Python and can be hosted on platforms like PythonAnywhere.
- You can extend the backend by adding more movie attributes or improving the recommendation algorithm, such as implementing collaborative filtering.

