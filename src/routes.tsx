import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import SubmitComplaintInfos from './pages/SubmitComplaintInfos';
import ShouldTakePhoto from './pages/ShouldTakePhoto';
import ChoosePhoto from './pages/ChoosePhoto';
import ChooseLocation from './pages/ChooseLocation';
import ConcludeComplaintSubmition from './pages/ConcludeComplaintSubmition';

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
					component={ShouldTakePhoto}
					path='/submit-complaint/photo'
				/>
				<Route
					component={ChoosePhoto}
					path='/submit-complaint/take-photo'
				/>
				<Route
					component={ChooseLocation}
					path='/submit-complaint/location'
				/>
				<Route
					component={ConcludeComplaintSubmition}
					path='/submit-complaint/done'
				/>
			</Switch>
		</Router>
	);
};

export default Routes;
