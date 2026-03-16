import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Endereço de email inválido.' }, { status: 400 });
        }

        // Send to WordPress REST API using compatible route for Plain Permalinks
        // Using 127.0.0.1 instead of localhost to avoid IPv6 issues on some Windows setups
        const wpRes = await fetch('http://127.0.0.1:8000/?rest_route=/roadpanda/v1/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await wpRes.json();

        if (wpRes.ok) {
            return NextResponse.json({ message: data.message || 'Subscrito com sucesso!' }, { status: 200 });
        } else {
            return NextResponse.json({ error: data.message || 'Erro ao processar a subscrição.' }, { status: wpRes.status });
        }
    } catch (error) {
        console.error('Newsletter Error:', error);
        return NextResponse.json({ error: 'Erro de ligação ao servidor.' }, { status: 500 });
    }
}
