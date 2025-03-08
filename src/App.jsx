import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Versus from './pages/Versus';
import SingleUser from './pages/SingleUser';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Router>
        <div className="flex flex-col">
          <Header />
          <main className="container mx-auto px-4 py-6">
            <Switch>
              <Route 
                path="/Codeforces-Analyzer/" 
                exact 
                component={SingleUser} 
              />
              <Route 
                path="/Codeforces-Analyzer/versus" 
                component={Versus} 
              />
              <Redirect from="/" to="/Codeforces-Analyzer/" />
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
