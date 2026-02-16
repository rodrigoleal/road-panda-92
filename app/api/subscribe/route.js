
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Endereço de email inválido.' }, { status: 400 });
        }

        // In a real application, you would save this to a database or send to Mailchimp/ConvertKit
        console.log(`[Newsletter] Subscrição recebida: ${email}`);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({ message: 'Subscrito com sucesso!' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao processar o pedido.' }, { status: 500 });
    }
}
