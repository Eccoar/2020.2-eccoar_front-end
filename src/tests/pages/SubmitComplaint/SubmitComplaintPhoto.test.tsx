import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SubmitComplaitPhoto from '../../../pages/SubmitComplaint/SubmitComplaitPhoto';

const mockHistoryPush = jest.fn();
const mockReactRouterDom = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as typeof mockReactRouterDom),
	useHistory: () => ({
		push: mockHistoryPush,
		location: () => ({ state: '' }),
	}),
}));

describe('Test SubmitComplaintPhoto screen', () => {
	test('test screen rendering', () => {
		render(<SubmitComplaitPhoto />);
		expect(screen.getByTestId('SubmitComplaintPhoto')).toBeInTheDocument();
	});

	test('Accept image png', async () => {
		jest.mock('history');
		const { container } = render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<SubmitComplaitPhoto />
				</Router>
			</MemoryRouter>,
		);
		await waitFor(() => {
			fireEvent.change(container.querySelector('input') as Element, {
				DataTransfer: {
					files: [
						new File(['string'], 'chucknorris.png', {
							type: 'image/png',
						}),
					],
				},
			});
		});
		fireEvent.click(screen.getByText('Continuar'));
		expect(mockHistoryPush).toHaveBeenCalledTimes(1);
	});
});
