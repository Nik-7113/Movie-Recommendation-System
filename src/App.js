import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import { Tabs, Tab, Typography, Box, Card, CardContent, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [movie, setMovie] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1); // To track the current page for lazy loading
  const [totalMovies, setTotalMovies] = useState(0); // Total number of movies available

  // Fetching movies for the Movies Tab with lazy loading
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://nik73.pythonanywhere.com/movies?page=${page}`);
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...data.movies]);
        setTotalMovies(data.total); // Assuming the API returns the total number of movies
      } catch (error) {
        alert('Error fetching movies');
      }
    };

    fetchMovies();
  }, [page]);

  const fetchRecommendations = async () => {
    if (!movie) return alert('Please enter a movie name');

    setLoading(true);
    try {
      const response = await fetch('https://nik73.pythonanywhere.com/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.error) {
        alert(data.error);
      } else {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      setLoading(false);
      alert('Error fetching recommendations');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMovieClick = (movie) => {
    //setSelectedMovie(movie);
    //setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  // Lazy loading: Track visibility of the last movie card using IntersectionObserver
  const observer = useRef(null);
  const lastMovieElementRef = useCallback((node) => {
    if (loading || movies.length >= totalMovies) return; // Stop if loading or all movies are loaded

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, movies.length, totalMovies]);

  return (
    <div className="App">
      <Tabs value={activeTab} onChange={handleTabChange} centered indicatorColor="primary" textColor="inherit" aria-label="tabs">
        <Tab label="Movies" />
        <Tab label="Recommender" />
      </Tabs>

      <Box p={3} sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
        {activeTab === 0 ? (
          <div className="movies-tab">
            <Typography variant="h5" gutterBottom>All Movies</Typography>
            <div className="movies-list">
              {movies.length === 0 ? (
                <CircularProgress sx={{ color: '#fff' }} />
              ) : (
                movies.map((movie, index) => (
                  <Card
                    className="movie-card"
                    key={index}
                    onClick={() => handleMovieClick(movie)}
                    sx={{ backgroundColor: '#333', color: '#fff', marginBottom: '15px' }}
                    ref={movies.length === index + 1 ? lastMovieElementRef : null} // Attach ref to the last card
                  >
                    <CardContent>
                      <Typography variant="h6">{movie.title}</Typography>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            {movies.length < totalMovies && (
              <Button variant="contained" color="primary" onClick={() => setPage((prevPage) => prevPage + 1)}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Load More'}
              </Button>
            )}
          </div>
        ) : (
          <div className="recommender-tab">
            <Typography variant="h5" gutterBottom>Movie Recommendation System</Typography>
            <input
              type="text"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              placeholder="Enter a movie name"
              className="movie-input"
            />
            <Button variant="contained" color="primary" onClick={fetchRecommendations} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Recommendations'}
            </Button>

            {recommendations.length > 0 && (
              <div className="recommendations-list">
                <Typography variant="h6">Recommended Movies:</Typography>
                {recommendations.map((rec, index) => (
                  <Card key={index} className="recommendation-card" sx={{ backgroundColor: '#333', color: '#fff', marginBottom: '15px' }}>
                    <CardContent>
                      <Typography variant="h6">{rec}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </Box>

      {/* Movie Detail Dialog */}
      {selectedMovie && (
        <Dialog open={open} onClose={handleCloseDialog} sx={{ backgroundColor: '#121212' }}>
          <DialogTitle>{selectedMovie.title}</DialogTitle>
          <DialogContent sx={{ color: '#fff' }}>
            <Typography variant="h6">Overview:</Typography>
            <Typography>{selectedMovie.overview || 'No overview available'}</Typography>
            <Typography variant="h6">Genres:</Typography>
            <Typography>{selectedMovie.genres ? selectedMovie.genres.join(', ') : 'No genres available'}</Typography>
            <Typography variant="h6">Cast:</Typography>
            <Typography>{selectedMovie.cast ? selectedMovie.cast.join(', ') : 'No cast available'}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default App;
