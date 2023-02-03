import http from "./http";

class MovieDataService {
    login(data) {
        return http.post(`/login`, data);
    }

    createMovie(data) {
        return http.post(`/movie`, data);
    }

    // allMovies() {
    //     return http.get(`/movie`);
    // }

    // updateMovies(data, index) {
    //     return http.put(`movie/${index}`, data)
    // }

    // deleteMovie(index) {
    //     return http.delete(`movie/${index}`)
    // }


}

export default new MovieDataService();