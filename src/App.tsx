import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Appointments from './components/appointments/Appointments';
import Consultant from './components/consultant/Consultant';
import Dashboard from './components/dashboard/Dashboard';
import DesignationAndService from './components/designation & service/DesignationAndService';
import FAQ from './components/faq/FAQ';
import LightExercise from './components/lightExercise/LightExercise';
import Login from './components/login/Login';
import Music from './components/music/Music';
import Notification from './components/notification/Notification';
import Orders from './components/orders/Orders';
import PinVideo from './components/pinVideo/PinVideo';
import PrivacyAndPolicy from './components/privacy/PrivacyAndPolicy';
import Products from './components/products/Products';
import TermsAndConditions from './components/terms/TermsAndConditions';
import TipsAndTricks from './components/tipsAndtricks/TipsAndTricks';

const App = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/appointments" component={Appointments} />
            <Route path="/designations and services" component={DesignationAndService} />
            <Route path="/consultants" component={Consultant} />
            <Route path="/tips and tricks" component={TipsAndTricks} />
            <Route path="/pin videos" component={PinVideo} />
            <Route path="/light exercises" component={LightExercise} />
            <Route path="/music" component={Music} />
            <Route path="/products" component={Products} />
            <Route path="/orders" component={Orders} />
            <Route path="/notification" component={Notification} />
            <Route path="/faq" component={FAQ} />
            <Route path="/terms and conditions" component={TermsAndConditions} />
            <Route path="/privacy and policy" component={PrivacyAndPolicy} />
        </Switch>
    </Router>
);

export default App;
