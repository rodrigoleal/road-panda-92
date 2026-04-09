import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Endereço de email inválido.' }, { status: 400 });
        }

        // Send to WordPress REST API using compatible route for Plain Permalinks
        const rawWpUrl = process.env.WORDPRESS_URL || 
                         (process.env.NEXT_PUBLIC_WORDPRESS_API_URL ? process.env.NEXT_PUBLIC_WORDPRESS_API_URL.replace('/graphql', '') : 'http://127.0.0.1:8000');
        
        // Ensure no trailing slash
        const wpBaseUrl = rawWpUrl.replace(/\/$/, '');
        
        const targetUrl = `${wpBaseUrl}/wp-json/roadpanda/v1/subscribe/`;

        console.log(`Newsletter Subscription Attempt: ${targetUrl} for ${email}`);

        const wpRes = await fetch(targetUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'User-Agent': 'RoadPanda-Newsletter-Bot/1.0'
            },
            body: JSON.stringify({ email }),
        });

        const data = await wpRes.json().catch(() => ({ message: 'Invalid JSON response from server' }));

        if (wpRes.ok) {
            return NextResponse.json({ message: data.message || 'Subscrito com sucesso!' }, { status: 200 });
        } else {
            return NextResponse.json({ 
                error: data.message || `Erro de servidor WordPress (${wpRes.status})` 
            }, { status: wpRes.status });
        }
    } catch (error) {
        console.error('Newsletter Connection Error:', error);
        
        let errorMessage = 'Erro de ligação ao servidor.';
        if (error.code === 'ECONNREFUSED' || error.message.includes('fetch failed')) {
            errorMessage = 'Impossível ligar ao servidor WordPress. Verifique se o backend está ativo.';
        }
        
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

