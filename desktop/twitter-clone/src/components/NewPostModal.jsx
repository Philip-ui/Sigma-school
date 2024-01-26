
import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
//import { useDispatch } from "react-redux";
//import { savePost } from "../features/posts/postsSlice";

export default function NewPostModal({ show, handleClose }) {
  const [postContent, setPostContent] = useState("");
 //const dispatch = useDispatch();

  const handleSave = () => {
    //Get stored JWT Token
    const token = localStorage.getItem("authToken");

    //Decode the token to fetch user id
    const decode = jwtDecode(token);
    const userId = decode.id // May change depending on how the server encode the token

    //Prepare data to be sent
    const data = {
      title: "Post Title",  //Add functionality to set this properly
      content: postContent,
      user_id: userId, 
    };

    //Make your API call here
    axios
    .post("https://0aa3a82e-a40f-4a70-96b6-e37dd3ac7120-00-18f289g0jr7oe.worf.replit.dev/posts", data)
    .then((response) => {
      console.log("Success:", response.data);
      handleClose();
    })
    .catch((error) => {
      console.error("Error", error);
    });
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="postContent">
              <Form.Control 
                placeholder="What is happening?!"
                as="textarea"
                rows={3}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="rounded-pill"
            onClick={handleSave}
          >
            Tweet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}