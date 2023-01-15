import http from "./http";

class MovieDataService {
    login(data) {
        return http.post(`/userCheck`, data);
    }

    createMovie(data) {
        return http.post(`/movie`, data);
    }
}

export default new MovieDataService();