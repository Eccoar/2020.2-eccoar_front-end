export default function validateEmail(email: string) {
	const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
	return re.test(email);
}
