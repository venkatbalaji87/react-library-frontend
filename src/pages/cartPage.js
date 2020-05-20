import React, { Fragment, useState, useEffect } from "react";
//import Post from "../Components/Post";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import routes from "../routes/routes";
import useAdminProvider from "../store/AdminProvider/useAdminProvider";

const Cart = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const { isAdminLoggedIn } = useAdminProvider();

  useEffect(() => {
    fetch("https://4h9tu.sse.codesandbox.io/library/carts")
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
      })
      .catch(console.error);
      if (!isAdminLoggedIn) {
        history.push(routes.Login);
      }
  }, []);

  return (
    <Fragment>
      <div className="home">
        <h1>Cart</h1>
        <h3>Books added to the cart</h3>
        <div class="#container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Book Id</th>
                <th scope="col">Book Name</th>
                <th scope="col">Genre</th>
                <th scope="col">Author Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Add to Checkout</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, postIndex) => { 
                  const submitForm = async event => {
                    event.preventDefault();
                    try {
                      const postData = {
                        bookid: post.bookid,
                        bookName: post.bookName,
                        genre: post.genre,
                        authorName: post.authorName,
                        quantity : post.quantity
                      };
                      const response = await fetch(
                        "https://4h9tu.sse.codesandbox.io/library/checkout",
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
                        alert("book is successfully check out!");
                      } else {
                        console.error(data);
                        alert("Unable to check out!");
                      }
                    } catch (e) {
                      console.error(e);
                      alert("Unable to check out!");
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
                        <button onClick = {submitForm}>Add Checkout</button>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
