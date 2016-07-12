import React from 'react';
<% if (useCssFramework === 'bootstrap') { %>
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
<% } else if (useCssFramework === 'semanticui') { %>
import '../node_modules/semantic-ui-css/semantic.min.css';
<% } %>

const App = React.createClass({
    getInitialState: function () {
       return {}
    },
    render: function () {
      return (
<% if (useCssFramework === 'bootstrap') { %>
  <div>
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Hello World!</a>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="container" style={{marginTop: '50px'}}>
      <div className="starter-template">
        <h1>Bootstrap starter template</h1>
        <p className="lead">Use this document as a way to quickly start any new project.<br/> All you get is this text and a mostly barebones HTML document.</p>
      </div>
    </div>
  </div>

<% } else if (useCssFramework === 'semanticui') { %>
        <div className="ui container">
          <div className="ui grid">
            <div className="ui sixteen wide column">
              <h1>Hello World! </h1>
            </div>
          </div>
        </div>
<% } else { %>
  <h1>Hello World! </h1>
<% } %>
      );
    }
});

module.exports = App;