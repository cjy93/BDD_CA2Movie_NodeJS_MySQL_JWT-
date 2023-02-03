import http from "./http.js"; // For keeping bearer token 
// https://stackoverflow.com/questions/40988238/sending-the-bearer-token-with-axios
const config = {
  headers: {
    Authorization: `Bearer ${localStorage["token"]}`
  }
};
class MovieDataService {
  login(data) {
    return http.post(`/login`, data);
  }
  createMovie(data) {
    return http.post(`/movie`, data, config).then(console.log).catch(console.log);
  }
  allMovies() {
    return http.get(`/movieforApp`);
  }
  updateMovies(data, config) {
    return http.put(`movie/${data[index]}`, data);
  }
  deleteMovie(index) {
    return http.delete(`movie/${index}`, config).then(console.log).catch(console.log);
  }
}
export default new MovieDataService();