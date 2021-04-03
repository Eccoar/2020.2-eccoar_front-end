import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../../components/Button';

describe('Tests Button Component', () => {
	test('renders Button', () => {
		render(<Button text='oi' />);

		expect(screen.getByText('oi')).toBeInTheDocument();
	});

	test('test primary pattern', () => {
		render(<Button text='testing' pattern='primary' />);

		expect(screen.getByText('testing')).toHaveClass('complain-button');
	});

	test('test secondary pattern', () => {
		render(<Button text='testing' pattern='secondary' />);

		expect(screen.getByText('testing')).toHaveClass('complain-button');
	});

	test('test next icon', () => {
		render(<Button text='testing' icon='next' />);

		expect(screen.getByTestId('next-icon')).toBeInTheDocument();
	});
	test('test check icon', () => {
		render(<Button text='testing' icon='check' />);

		expect(screen.getByTestId('check-icon')).toBeInTheDocument();
	});

	test('test megaphone icon', () => {
		render(<Button text='testing' icon='megaphone' />);

		expect(screen.getByTestId('megaphone-icon')).toBeInTheDocument();
	});

	test('test echo icon', () => {
		render(<Button text='testing' icon='echo' />);

		expect(screen.getByTestId('echo-icon')).toBeInTheDocument();
	});

	test('test click event', () => {
		const onClick = jest.fn();
		render(<Button text='testing' onClick={onClick} />);
		userEvent.click(screen.getByText('testing'));

		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
