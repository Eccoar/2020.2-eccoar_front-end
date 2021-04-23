import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from '../../context/auth';
import api from '../../services/api';

jest.mock('../../context/auth', () => ({
	...(jest.requireActual('../../context/auth') as any),
	useAuth: () => ({ userId: 'DoOJ8n4s5YuQFnE24ZlcL6zIbgTK' }),
}));

describe('AuthContext', () => {
	it('Render AuthContext', async () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2NrIjoiand0In0.IwCNjXLvxdbyU9JSew9yXMvcQgEjabofy-_1DXo3YpE';

		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.resolve({ data: { token } }),
		);

		render(<AuthProvider />);
		const { result } = renderHook(() => useAuth());
		expect(result.current.userId).toEqual('DoOJ8n4s5YuQFnE24ZlcL6zIbgTK');
	});
});
