import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComplainCard from '../../components/complainCard';

jest.spyOn(window, 'alert').mockImplementation();

describe('Tests ComplainCard Component', () => {
	test('renders ComplainCard', () => {
		const onClick = jest.fn();
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
				onClick={onClick}
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
		userEvent.click(screen.getByTestId('button-id'));
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('echo-icon')).toHaveClass(
			'complaint__icon--selected complaint__icon',
		);
	});

	test('test setConfirmed state', () => {
		const onClick = jest.fn();
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
				onClick={onClick}
				vote_id={1}
			/>,
		);
		userEvent.click(screen.getByTestId('button-id'));
		expect(window.alert).toBeCalledTimes(1);
	});

	test('test submitted click event', () => {
		const onClick = jest.fn();
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
				onClick={onClick}
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
				onClick={onClick}
			/>,
		);
		userEvent.click(screen.getByTestId('confirmed-type'));

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('confirmed-type')).toHaveClass(
			'complaint__upvote complaint__upvote--confirmed',
		);
	});
});
