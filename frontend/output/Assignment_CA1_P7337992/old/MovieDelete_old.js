import Movie from "./Movie.js";
import React from 'react';
export default function MovieDelete(props) {
  const [isIndex, setIsIndex] = React.useState([]);
  // delete many at one go
  const deleteManyButton = id => {
    const todos = isIndex;
    let res = [];
    if (todos.length != undefined) {
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id !== id) {
          res.push(todos[i]);
        }
      }
    }
    setIsIndex([...res]);
  }; // end of deleteManyButton
  // Reference: https://stackoverflow.com/questions/53634298/deleting-collection-item-in-react-map-vs-for-loop

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: deleteManyButton
  }, "Delete all"), props.movies.map(function (movie, index) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Movie, {
      key: index,
      url: movie.links,
      title: movie.movie,
      rating: movie.imdb,
      small_posters: movie.small_posters
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => props.onDelete(index)
    }, "Delete"), /*#__PURE__*/React.createElement(BoxClicked, {
      onAdd: i => setIsIndex([...isIndex, i]),
      onIndex: index
    }));
  }));

  // create a list to store the index of which checkboxes are checked to "true"
  function BoxClicked(props) {
    const [isCheck, setIsCheck] = React.useState(false);
    {/* callback function to pass something to "MovieDelete" */}
    // React.useEffect(() => {
    //     if (isCheck === true) { props.onAdd(props.onIndex); console.log("i am here") };
    // }, [isIndex])
    const function1 = async e => {
      setIsCheck(e.target.checked);
    }; // add keyword "async" "await
    const function2 = e => {
      console.log("I am here 1");
      if (e.target.checked === true) {
        props.onAdd(props.onIndex);
        console.log("i am here2");
        console.log(e.target.checked);
      }
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: isCheck,
      onChange: e => {
        function1(e).then(function2(e));
      }
    }), " Add to delete list", console.log("reachedsadasdas"), console.log(props.onIndex), console.log(isCheck), console.log(isIndex));
  }
  ; // end of BoxClicked function
}

// How to create buttons: https://beta.reactjs.org/learn/updating-arrays-in-state