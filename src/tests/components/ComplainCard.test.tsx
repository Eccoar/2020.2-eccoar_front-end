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
				removeClick={jest.fn()}
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
				status={'open'}
				removeClick={jest.fn()}
				vote_id={1}
			/>,
		);
		userEvent.click(screen.getByTestId('echo-icon'));
		userEvent.click(screen.getByTestId('button-id'));
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('echo-icon')).toHaveClass(
			'complaint__icon--selected complaint__icon',
		);
	});

	test('test remove upvote click event', () => {
		const onClick = jest.fn();
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
				onClick={onClick}
				status={'open'}
				removeClick={jest.fn()}
				vote_id={undefined}
			/>,
		);
		userEvent.click(screen.getByTestId('echo-icon'));
		userEvent.click(screen.getByTestId('button-id'));
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('echo-icon')).toHaveClass(
			'complaint__icon--unselected complaint__icon',
		);
	});

	test('test confirmed click event', () => {
		const onClick = jest.fn();
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
				onClick={onClick}
				status={'wait'}
				removeClick={jest.fn()}
			/>,
		);
		userEvent.click(screen.getByTestId('check-icon'));

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('check-icon')).toHaveClass(
			'complaint__check',
		);
	});

	test('test upvote click event', () => {
		const onClick = jest.fn();
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
				onClick={onClick}
				status={'open'}
				removeClick={jest.fn()}
			/>,
		);
		userEvent.click(screen.getByTestId('echo-icon'));

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('echo-icon')).toHaveClass('complaint__icon');
	});

	test('test remove upvote click event', () => {
		const removeClick = jest.fn();
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
				onClick={jest.fn()}
				status={'open'}
				removeClick={removeClick}
				vote_id={1}
			/>,
		);
		userEvent.click(screen.getByTestId('echo-icon'));

		expect(removeClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('echo-icon')).toHaveClass('complaint__icon');
	});

	test('test submitted click event and class changing, status wait', () => {
		const onClick = jest.fn();
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
				onClick={onClick}
				status={'wait'}
				removeClick={jest.fn()}
			/>,
		);
		userEvent.click(screen.getByTestId('button-id'));

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('button-id')).toHaveClass(
			'complaint__upvote--confirmed complaint__upvote',
		);
	});

	test('test submitted click event and class changing, status open', () => {
		const onClick = jest.fn();
		render(
			<ComplainCard
				title={'Buraco na rua!'}
				label={'Buraco'}
				description={'Que buracao meu'}
				onClick={onClick}
				status={'open'}
				removeClick={jest.fn()}
			/>,
		);
		userEvent.click(screen.getByTestId('button-id'));

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('button-id')).toHaveClass(
			'complaint__upvote--submitted complaint__upvote',
		);
	});
});
