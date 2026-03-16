import { NextResponse } from 'next/server';

export async function POST(request) {
  const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://35.188.192.145/graphql";
  
  try {
    const body = await request.json();
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GraphQL Proxy Error:", error);
    return NextResponse.json({ errors: [{ message: "Internal Proxy Error", detail: error.message }] }, { status: 500 });
  }
}

export async function GET() {
  return new Response("WP GraphQL Proxy is Active", { status: 200 });
}
