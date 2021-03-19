import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComplainCard from '../../components/complainCard';

describe('Tests ComplainCard Component', () => {
	test('renders ComplainCard', () => {
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
			/>,
		);

		expect(screen.getByText('Buraco na rua!')).toBeInTheDocument();
		expect(screen.getByText('Buraco')).toBeInTheDocument();
		expect(screen.getByText('Que buracao meu')).toBeInTheDocument();
	});

	test('test upvote click event', () => {
		const onClick = jest.fn();
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
				onClick={onClick}
			/>,
		);
		userEvent.click(screen.getByTestId('echo-icon'));

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('echo-icon')).toHaveClass('icon-red');
	});
});
