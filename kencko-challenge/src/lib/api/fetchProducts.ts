// lib/api.ts
export async function getProducts() {
	try {
		const response = await fetch(
			'https://www.kencko.com/api/v1/products/US?shop_domain=vip-kencko.myshopify.com',
			{
				next: { revalidate: 3600 },
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
}
