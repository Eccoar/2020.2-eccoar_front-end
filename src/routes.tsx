import {
	Route,
	Switch,
	BrowserRouter as Router,
	Redirect,
	RouteProps,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/auth';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SubmitComplaintInfos from './pages/SubmitComplaint/SubmitComplaintInfos';
import SubmitComplaitOptionPhoto from './pages/SubmitComplaint/SubmitComplaitOptionPhoto';
import SubmitComplaintPhoto from './pages/SubmitComplaint/SubmitComplaitPhoto';
import SubmitComplaintGeolocation from './pages/SubmitComplaint/SubmitComplaintGeolocation';
import SubmitComplaintConclude from './pages/SubmitComplaint/SubmitComplaintConclude';
import ComplaintDetails from './pages/ComplaintDetails';
import FirstPage from './pages/FirstPage';
import RegisterName from './pages/Register/RegisterName';
import RegisterAdress from './pages/Register/RegisterAdress';
import RegisterEmail from './pages/Register/RegisterEmail';
import Login from './pages/Login';

const ProtectedRoute: React.FC<RouteProps> = (props) => {
	const { userId } = useAuth();

	if (!userId) {
		return <Redirect to='/login' />;
	}

	return <Route {...props} />;
};

const Routes = () => {
	return (
		<Router>
			<AuthProvider>
				<Navbar />
				<Switch>
					<Route component={FirstPage} path='/' exact />
					<Route component={RegisterName} path='/register/name' />
					<Route component={RegisterAdress} path='/register/adress' />
					<Route component={RegisterEmail} path='/register/email' />
					<ProtectedRoute component={Home} path='/home' />
					<ProtectedRoute
						component={SubmitComplaintInfos}
						path='/submit-complaint/infos'
					/>
					<ProtectedRoute
						component={SubmitComplaitOptionPhoto}
						path='/submit-complaint/photo'
					/>
					<ProtectedRoute
						component={SubmitComplaintPhoto}
						path='/submit-complaint/take-photo'
					/>
					<ProtectedRoute
						component={SubmitComplaintGeolocation}
						path='/submit-complaint/location'
					/>
					<ProtectedRoute
						component={SubmitComplaintConclude}
						path='/submit-complaint/done'
					/>
					<ProtectedRoute
						component={ComplaintDetails}
						path='/complaint/details/:id'
					/>
					<Route component={Login} path='/login' />
				</Switch>
			</AuthProvider>
		</Router>
	);
};

export default Routes;
