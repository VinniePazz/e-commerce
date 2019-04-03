import React, { Component } from "react";
import { connect } from "react-redux";

import { auth } from "../../actions/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function(ComposedClass, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    };

    async componentDidMount() {
			await this.props.auth();
			
      let user = this.props.user.userData;

      if (!user.isAuth) {
        if (reload) {
          this.props.history.push("/register_login");
        }
      } else {
        if (adminRoute && !user.isAdmin) {
          this.props.history.push("/user/dashboard");
        } else {
          if (reload === false) {
            this.props.history.push("/user/dashboard");
          }
        }
      }
      this.setState({ loading: false });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: "#777777" }} thickness={4} />
          </div>
        );
      }
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapState(state) {
    return {
      user: state.user
    };
  }

  return connect(
    mapState,
    { auth }
  )(AuthenticationCheck);
}