import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetails from "./routes/RestaurantDetails";
import UpdatePage from "./routes/UpdatePage";

function App() {
  return (
  
      <div className="App container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/restaurants/:id" component={RestaurantDetails} />
          <Route
            exact
            path="/restaurants/:id/update"
            component={UpdatePage}
          />
        </Switch>
      </div>
   
  );
}

export default App;
