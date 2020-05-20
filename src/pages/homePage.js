import React, { Fragment, useState, useEffect } from "react";
//import Post from "../Components/Post";
//import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import useAdminProvider from "../store/AdminProvider/useAdminProvider";
import routes from "../routes/routes";
import adminRequests from "../services/adminRequests";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  const { isAdminLoggedIn } = useAdminProvider();
  const { setAdminLoggedIn } = useAdminProvider();

  useEffect(() => {
    adminRequests("https://4h9tu.sse.codesandbox.io/signin/isLoggedIn")
      .then(() => {
        setAdminLoggedIn(true);
      })
      .catch(console.error);
    },[]);

 const refresh = () => {   fetch("https://4h9tu.sse.codesandbox.io/library")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPosts(data.posts);
      })
      .catch(console.error);
 
    if (!isAdminLoggedIn) {
      history.push(routes.Login);
    }
  }
  refresh();

  return (
    <Fragment>
      <div className="home">
        <h1>Library Books</h1>
        <h3>Science Fiction</h3>
        <div class="#container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Book Id</th>
                <th scope="col">Book Name</th>
                <th scope="col">Genre</th>
                <th scope="col">Author Name</th>
                <th scope="col">Availabel Quantity</th>
                <th scope="col">Add to Cart</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, postIndex) => {
                if (post.genre === "Science Fiction") {
                  const submitForm = async event => {
                    event.preventDefault();
                    try {
                      const postData = {
                        bookid: post.bookid,
                        bookName: post.bookName,
                        genre: post.genre,
                        authorName: post.authorName,
                        quantity: post.quantity
                      };
                      const response = await fetch(
                        "https://4h9tu.sse.codesandbox.io/library/cart",
                        {
                          method: "POST",
                          mode: "cors",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify(postData)
                        }
                      );
                      const data = await response.json();
                      if (data.status === "SUCCESS") {
                        alert("book has been added to Cart!");
                 //       window.location.href='https://tf89g.csb.app/library';
                  
                      } else {
                        console.error(data);
                        alert("Unable to add in cart!");
                      }
                    } catch (e) {
                      console.error(e);
                      alert("Unable to add in cart!");
                    }
                  };

                  return (
                    <Fragment>
                      <tr>
                        <th scope="row">{post.bookid}</th>
                        <td>{post.bookName}</td>
                        <td>{post.genre}</td>
                        <td>{post.authorName}</td>
                        <td>{post.quantity}</td>
                        <td>
                          {(post.quantity === 0) ? 
                          "No books Availabel" : 
                          <button id={post.bookid} onClick={submitForm}>
                            Add to cart
                          </button>}
                          
                        </td>
                      </tr>
                    </Fragment>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <h3>Fantasy</h3>
        <div class="#container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Book Id</th>
                <th scope="col">Book Name</th>
                <th scope="col">Genre</th>
                <th scope="col">Author Name</th>
                <th scope="col">Availabel Quantity</th>
                <th scope="col">Add to Cart</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, postIndex) => {
                if (post.genre === "Fantasy") {
                  const submitForm = async event => {
                    event.preventDefault();
                    try {
                      const postData = {
                        bookid: post.bookid,
                        bookName: post.bookName,
                        genre: post.genre,
                        authorName: post.authorName,
                        quantity: post.quantity
                      };
                      const response = await fetch(
                        "https://4h9tu.sse.codesandbox.io/library/cart",
                        {
                          method: "POST",
                          mode: "cors",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify(postData)
                        }
                      );
                      const data = await response.json();
                      if (data.status === "SUCCESS") {
                        alert("book has been added to Cart!");
                      } else {
                        console.error(data);
                        alert("Unable to add in cart!");
                      }
                    } catch (e) {
                      console.error(e);
                      alert("Unable to add in cart!");
                    }
                  };

                  return (
                    <Fragment>
                      <tr>
                        <th scope="row">{post.bookid}</th>
                        <td>{post.bookName}</td>
                        <td>{post.genre}</td>
                        <td>{post.authorName}</td>
                        <td>{post.quantity}</td>
                        <td>
                          <button onClick={submitForm}>Add to cart</button>
                        </td>
                      </tr>
                    </Fragment>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
