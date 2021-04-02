import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import SubmitComplaintInfos from './pages/SubmitComplain/SubmitComplaintInfos';
import SubmitComplaitOptionPhoto from './pages/SubmitComplain/SubmitComplaitOptionPhoto';
import SubmitComplaintPhoto from './pages/SubmitComplain/SubmitComplaitPhoto';
import SubmitComplaintGeolocation from './pages/SubmitComplain/SubmitComplaintGeolocation';
import SubmitComplaintConclude from './pages/SubmitComplain/SubmitComplaintConclude';
import ComplaintDetails from './pages/ComplaintDetails';

const Routes = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route component={Home} path='/' exact />
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
