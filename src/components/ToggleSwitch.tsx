import React from 'react';

const ToggleSwitch = ({ isOn, handleToggle }) => {
	return (
		<div className='toggle-switch'>
			<input
				checked={isOn}
				onChange={handleToggle}
				className='react-switch-checkbox'
				id={`react-switch-new`}
				type='checkbox'
			/>
			<label
				style={{ background: isOn && 'rgba(41, 115, 115, 1)' }}
				className='react-switch-label'
				htmlFor={`react-switch-new`}
			>
				<span className={`react-switch-button`} />
			</label>
		</div>
	);
};

export default ToggleSwitch;
