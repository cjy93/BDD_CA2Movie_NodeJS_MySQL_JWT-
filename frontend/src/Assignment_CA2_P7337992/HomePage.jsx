import Login from './Login'
import ListMovies from './ListMoviesPage'
import { useSelector, useDispatch } from 'react-redux';
import { login } from './slices/pageSlice';

export default function HomePage(props) {
    const dispatch = useDispatch();
    const isLogin = useSelector(function (store) {
        return store.page.value;
    });

    return (<div>
        {/* If you are not logined, send you to Login page */}
        {!isLogin && <Login onLogin={(isLogin) => { dispatch(login(isLogin)) }} />}
        {/* Conditions to be on Movie Listings page */}
        {isLogin && <ListMovies />}


    </div >)

}
