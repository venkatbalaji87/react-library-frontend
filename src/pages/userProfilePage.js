import React, { Fragment, useState, useEffect } from "react";
//import Post from "../Components/Post";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import routes from "../routes/routes";
import useAdminProvider from "../store/AdminProvider/useAdminProvider";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const history = useHistory();
  const { isAdminLoggedIn } = useAdminProvider();

  useEffect(() => {
    fetch("https://4h9tu.sse.codesandbox.io/library/profiles")
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
        setPost(data.post);
      })
      .catch(console.error);
    if (!isAdminLoggedIn) {
      history.push(routes.Login);
    }
  }, []);

  return (
    <Fragment>
      <div className="home">
        <h1>User Profile</h1>
        <h3>Profile Information</h3>
        <div class="#container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">email</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, postIndex) => {
                // const submitForm = async event => {
                //   event.preventDefault();
                //   try {
                //     const postData = {
                //       bookid: post.bookid,
                //       bookName: post.bookName,
                //       genre: post.genre,
                //       authorName: post.authorName,
                //     };
                //     const response = await fetch(
                //       "https://4h9tu.sse.codesandbox.io/library/checkout",
                //       {
                //         method: "POST",
                //         mode: "cors",
                //         headers: {
                //           "Content-Type": "application/json"
                //         },
                //         body: JSON.stringify(postData)
                //       }
                //     );
                //     const data = await response.json();
                //     if (data.status === "SUCCESS") {
                //       alert("book is successfully check out!");
                //     } else {
                //       console.error(data);
                //       alert("Unable to check out!");
                //     }
                //   } catch (e) {
                //     console.error(e);
                //     alert("Unable to check out!");
                //   }
                // };

                return (
                  <Fragment>
                    <tr>
                      <th scope="row">{post.firstName}</th>
                      <td>{post.lastName}</td>
                      <td>{post.email}</td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <h3>Books Information</h3>
        <div class="#container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Bookid</th>
                <th scope="col">BookName</th>
                <th scope="col">genre</th>
                <th scope="col">AuthorName</th>
                <th scope="col">Quantity</th>
                <th scope="col">Return the borrowed books</th>
              </tr>
            </thead>
            <tbody>
              {post.map((posts, postIndex) => {
                const submitForm = async event => {
                  event.preventDefault();
                  try {
                    const postData = {
                      bookid: posts.bookid,
                      bookName: posts.bookName,
                      genre: posts.genre,
                      authorName: posts.authorName,
                      quantity: posts.quantity
                    };
                    const response = await fetch(
                      "https://4h9tu.sse.codesandbox.io/library/return",
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
                      alert("book is successfully Returned!");
                    } else {
                      console.error(data);
                      alert("Unable to Return!");
                    }
                  } catch (e) {
                    console.error(e);
                    alert("Unable to Return!");
                  }
                };

                return (
                  <Fragment>
                    <tr>
                      <th scope="row">{posts.bookid}</th>
                      <td>{posts.bookName}</td>
                      <td>{posts.genre}</td>
                      <td>{posts.authorName}</td>
                      <td>{posts.quantity}</td>
                      <td>
                        {posts.bookid ? (
                          <button onClick={submitForm}>Return</button>
                        ) : null}
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

export default Profile;
