import { render, screen } from '@testing-library/react';
import ComplaintDetails from '../../pages/ComplaintDetails';
import * as ReactRouterDom from 'react-router-dom';

const mockHistoryPush = jest.fn();
const mockReactRouterDom = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as typeof mockReactRouterDom),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
	useParams: () => ({
		id: 1,
	}),
}));

describe('Test ComplaintDetails', () => {
	test('test screen rendering', () => {
		render(<ComplaintDetails />);

		expect(screen.getByTestId('ComplainDetails')).toBeInTheDocument();
	});
});
