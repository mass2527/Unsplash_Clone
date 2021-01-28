import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';

interface LocationProps {
  searchTerm: string;
}

const App: React.FC = () => {
  const location = useLocation<LocationProps>();

  return (
    <Switch>
      <Route exact path="/photos/:photoId" component={location.state?.searchTerm ? Search : Home} />
      <Route exact path="/s/photos/:searchTerm" component={Search} />
      <Route path="/" component={Home} />
    </Switch>
  );
};

export default App;
