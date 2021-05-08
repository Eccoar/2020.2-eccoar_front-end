import Routes from '../routes';

describe('Routes testing', () => {
	test('should render routes', () => {
		const response = Routes();
		expect(response).toBeTruthy();
	});
});
