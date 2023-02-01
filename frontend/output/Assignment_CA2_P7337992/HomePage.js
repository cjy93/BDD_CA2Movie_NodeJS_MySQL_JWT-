import Login from "./Login.js";
import ListMovies from "./ListMoviesPage.js";
import { useSelector, useDispatch } from 'react-redux';
import { login } from "./slices/pageSlice.js";
export default function HomePage(props) {
  const dispatch = useDispatch();
  const isLogin = useSelector(function (store) {
    return store.page.value;
  });
  return /*#__PURE__*/React.createElement("div", null, !isLogin && /*#__PURE__*/React.createElement(Login, {
    onLogin: isLogin => {
      dispatch(login(isLogin));
    }
  }), isLogin && /*#__PURE__*/React.createElement(ListMovies, null));
}