import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Index from './pages/Index'


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/'>
            <Index />
          </Route>
          <Route exact path='*'>
            <NotFound />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
