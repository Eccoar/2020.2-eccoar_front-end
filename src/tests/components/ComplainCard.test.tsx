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
				id={1}
				onClick={jest.fn()}
				status={'open'}
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
				id={1}
				onClick={onClick}
				status={'open'}
			/>,
		);
		userEvent.click(screen.getByTestId('echo-icon'));

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('echo-icon')).toHaveClass(
			'complaint__icon--unselected',
		);
	});

	test('test submitted click event', () => {
		const onClick = jest.fn();
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
				id={1}
				onClick={onClick}
				status={'wait'}
			/>,
		);
		userEvent.click(screen.getByTestId('check-icon'));

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('check-icon')).toHaveClass('complaint__icon');
	});

	test('test submitted click event and class changing', () => {
		const onClick = jest.fn();
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
				id={1}
				onClick={onClick}
				status={'wait'}
			/>,
		);
		userEvent.click(screen.getByTestId('confirmed-type'));

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('confirmed-type')).toHaveClass(
			'complaint__upvote complaint__upvote--confirmed',
		);
	});
});
