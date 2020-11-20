import React                  from 'react';
import { HashRouter, Route, BrowserRouter  } from 'react-router-dom';

//--css
import './sass/app.scss';


//--components
import NavBar   from './components/NavBar';
import Body     from './components/Body';
import Article  from './components/Article';
import FooterComp   from './components/Footer';
import Registration from './components/Registration';
import Profile      from './components/user/profileOptions';
import emailConfirm from './components/user/emailConfirm';


function App() {
  return (
      <HashRouter>
        <div className="App">
          <NavBar />
          <div id="m_data_index">
            <Route exact path={["/home", "/"]}  render={ (props) => <Body {...props} c_param=''/>} />
            <Route exact path="/latest"         render={ (props) => <Body {...props} c_param='Order=updatedAt'/>} />
            <Route exact path="/movies"         render={ (props) => <Body {...props} c_param='Type=movie'/>} />
            <Route exact path="/tv"             render={ (props) => <Body {...props} c_param='Type=tv'/>} />
            <Route exact path="/filtered"       render={ (props) => <Body {...props} />} />
          </div>
          <Route exact path = '/article/:id'  component = { Article } />
          <Route exact path = '/registration' component = { Registration } />
          <Route exact path = '/user/profile' component = { Profile } />
          <Route exact path = '/email/authentication/:email/:token' component = { emailConfirm } />
          <FooterComp />


        </div>
      </HashRouter>

  );
}

export default App;
