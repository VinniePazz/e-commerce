import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import styled from "styled-components";
import Button from "@material-ui/core/Button";

import { Heading } from "../../../styled_components";

import TextInput from "../../../app/common/form/Textinput";

import { getGenres, addGenre } from "../../../actions/productActions";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  return errors;
};

const GenresBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
	justify-content: center;
	position: relative;
	padding: 1rem;
	border-radius: 1em;

`;

const Genre = styled.div`
  margin: 0.5em;
  padding: 0.5em 1em;
  border: 2px solid #e76f5163;
  color: #e76f51;
  font-weight: 500;
`;

const GenreForm = styled.form`
  width: 50%;
  margin: 0 auto;
`;

class ManageGenres extends Component {
  componentDidMount() {
    this.props.getGenres();
  }

  submit = async values => {
    let existingGenres = this.props.products.genres;

    const response = await this.props.addGenre(values, existingGenres);

    if (!response.success) {
      throw new SubmissionError({
        _error: "this genre already exist"
      });
    } else {
      this.props.reset();
    }
  };

  showCategoryItems = () => {
    return this.props.products.genres
      ? this.props.products.genres.map(genre => (
          <Genre key={genre._id}>{genre.name}</Genre>
        ))
      : null;
  };

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      pristine,
      error,
      submitFailed,
      submitSucceeded
    } = this.props;

    return (
      <>
        <Heading>Add genre</Heading>
        <GenresBlock>{this.showCategoryItems()}</GenresBlock>
        <GenreForm onSubmit={handleSubmit(this.submit)}>
          <Field
            name="name"
            type="text"
            label="type here"
            component={TextInput}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={invalid || submitting || pristine}
            fullWidth
            classes={{
              root: this.props.classes.root,
              disabled: this.props.classes.disabled
            }}
          >
            add genre
          </Button>
          {submitFailed && (
            <p style={{ color: "#ff4d4d", textAlign: "center" }}>{error}</p>
          )}
          {submitSucceeded && (
            <p style={{ color: "green", textAlign: "center" }}>success</p>
          )}
        </GenreForm>
      </>
    );
  }
}

const styles = {
  root: {
    marginTop: "2em",
    marginBottom: "1em"
  },
  disabled: {
    backgroundColor: "#e76f517a !important",
    color: "#ffffff !important"
  }
};

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  {
    getGenres,
    addGenre
  }
)(reduxForm({ form: "addGenre", validate })(withStyles(styles)(ManageGenres)));
