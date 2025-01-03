import React, { useContext, useState } from "react";
import { DataContext } from "../../context/context.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaStar } from "react-icons/fa";
import * as Yup from "yup";
import { Alert, Button, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";

export default function ReviewsofUsers() {
  const { postReview, user, loading } = useContext(DataContext);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    rating: Yup.number()
      .min(1, "Rating is required")
      .max(5, "Maximum rating is 5")
      .required("Please provide a rating"),
    comment: Yup.string().required("Please provide a comment"),
    reviewFor: Yup.string().required("Please select a review category"),
  });

  // Handling form submission
  const handleSubmit = async (values, { resetForm }) => {
    if (!user) {
      setErrorMessage("User not authenticated. Please log in.");
      return;
    }
    const reviewData = {
      user: user._id, // Taking user ID from the decoded token stored in the context
      rating: values.rating,
      comment: values.comment,
      reviewFor: values.reviewFor,
    };

    const response = await postReview(reviewData);
    if (response) {
      setSuccessMessage("Review posted successfully!");
      resetForm(); // Reset form after submission
    } else {
      setErrorMessage("Error posting review. Please try again.");
    }
  };
  console.log("User ", user);

  return (
    <div className="container mt-5">
      <h2>Submit Your Review</h2>
      <Helmet>
        <title>Reviews</title>
        <meta name="description" content="Explore KSA Reviews" />
      </Helmet>
      {/* Show success or error messages */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {/* Review Form using Formik */}
      <Formik
        initialValues={{
          rating: 0,
          comment: "",
          reviewFor: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="rating">Rating</label>
              <div>
                {[1, 2, 3, 4, 5].map((value) => (
                  <FaStar
                    key={value}
                    className={`star fs-3 ${value <= values.rating ? "text-warning" : "text-muted"}`}
                    onClick={() => setFieldValue("rating", value)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
              <ErrorMessage name="rating" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="comment">Comment</label>
              <Field as="textarea" name="comment" className="form-control" placeholder="Leave your comment here..." />
              <ErrorMessage name="comment" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="reviewFor">Category</label>
              <Field as="select" name="reviewFor" className="form-control">
                <option value="">Select a category</option>
                <option value="Destination">Destination</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Transportation">Transportation</option>
                <option value="Itineraries">Itineraries</option>
              </Field>
              <ErrorMessage name="reviewFor" component="div" className="text-danger" />
            </div>

            <Button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Submit Review"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
