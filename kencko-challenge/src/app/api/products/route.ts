// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const response = await fetch(
			'https://www.kencko.com/api/v1/products/US?shop_domain=vip-kencko.myshopify.com',
			{ next: { revalidate: 3600 } }
		);
		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch products' },
			{ status: 500 }
		);
	}
}
