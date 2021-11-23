import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userrepo: "",
      person: []
    };
  }

  getUser(username) {
    return (
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        //  .then((response)=>{
        //   const person = response.data;
        //   this.setState({person:person})
        // })
        .then((response) => {
          return response;
        })
    );
  }

  getUserRepo(username) {
    return fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let user = await this.getUser(this.refs.username.value);
    this.setState({
      username: user.login,
      followers: user.followers,
      following: user.following,
      url: user.url
    });

    let repo = await this.getUserRepo(this.refs.username.value);
    this.setState({
      name: repo.name,
      description: repo.description,
      git_url: repo.git_url,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      size: repo.size
    });
  }

  render() {
    let user;
    if (this.state.username) {
      user = (
        <div className="resultBadge">
          <table border="2">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Followers</th>
                <th>Following</th>
              </tr>
              <tr>
                <td> {this.state.username}</td>
                <td> {this.state.followers}</td>
                <td>{this.state.following}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    let repo;
    if (this.state.userrepo) {
      repo = (
        <div className="repoResults">
          <p>
            {this.state.name}
            {this.state.full_name}
          </p>
        </div>
      );
    }

    return (
      <div>
        <header>
          <h1> Enter Valid @Github User Name For See Info </h1>
        </header>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input ref="username" type="text" placeholder="username" />
          <input type="submit" />
          <hr></hr>
        </form>
        <p>{user}</p>
        <p>{repo}</p>
      </div>
    );
  }
}

// I M practicing with hooks now using USeEffect, UseState, UseRef it may be possible . or any Callback function
