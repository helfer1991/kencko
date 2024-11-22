export async function getProducts() {
	try {
		const response = await fetch('http://localhost:3000/api/products');
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
		return response.json();
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
}
