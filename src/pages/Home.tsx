import React, { useState, useEffect } from 'react';
import ComplainCard from '../components/complainCard';
import { listComplaints } from '../services/complaint';

const Home = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const handleComplaint = async () => {
			const result = await listComplaints();
			setData(result);
			console.log(result);
		};
		handleComplaint();
		console.log(data);
	}, []);
	return <div></div>;
};

export default Home;
