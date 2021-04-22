import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Historic from './pages/HistoricComplaint';
import SubmitComplaintInfos from './pages/SubmitComplain/SubmitComplaintInfos';
import SubmitComplaitOptionPhoto from './pages/SubmitComplain/SubmitComplaitOptionPhoto';
import SubmitComplaintPhoto from './pages/SubmitComplain/SubmitComplaitPhoto';
import SubmitComplaintGeolocation from './pages/SubmitComplain/SubmitComplaintGeolocation';
import SubmitComplaintConclude from './pages/SubmitComplain/SubmitComplaintConclude';
import ComplaintDetails from './pages/ComplaintDetails';
import FirstPage from './pages/FirstPage';
import RegisterName from './pages/Register/RegisterName';
import RegisterAdress from './pages/Register/RegisterAdress';
import RegisterEmail from './pages/Register/RegisterEmail';

const Routes = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route component={FirstPage} path='/' exact />
				<Route component={RegisterName} path='/register/name' />
				<Route component={RegisterAdress} path='/register/adress' />
				<Route component={RegisterEmail} path='/register/email' />
				<Route component={Home} path='/home' />
				<Route component={Historic} path='/historic' />
				<Route
					component={SubmitComplaintInfos}
					path='/submit-complaint/infos'
				/>
				<Route
					component={SubmitComplaitOptionPhoto}
					path='/submit-complaint/photo'
				/>
				<Route
					component={SubmitComplaintPhoto}
					path='/submit-complaint/take-photo'
				/>
				<Route
					component={SubmitComplaintGeolocation}
					path='/submit-complaint/location'
				/>
				<Route
					component={SubmitComplaintConclude}
					path='/submit-complaint/done'
				/>
				<Route
					component={ComplaintDetails}
					path='/complaint/details/:id'
				/>
			</Switch>
		</Router>
	);
};

export default Routes;
