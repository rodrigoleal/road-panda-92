// Native fetch
const fetch = globalThis.fetch;

async function testUrl(url) {
    console.log(`Testing ${url}...`);
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2000); // 2s timeout

        const res = await fetch(url, { signal: controller.signal });
        console.log(`✅ ${url}: Status ${res.status}`);
    } catch (error) {
        console.log(`❌ ${url}: ${error.message}`);
    }
}

async function main() {
    await testUrl('http://127.0.0.1:8000/');
    await testUrl('http://localhost:8000/');
    await testUrl('http://[::1]:8000/');
}

main();
