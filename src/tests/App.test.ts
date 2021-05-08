import App from '../App';

describe('Test App tsx', () => {
	test('should render', () => {
		const response = App();
		expect(response).toBeTruthy();
	});
});
