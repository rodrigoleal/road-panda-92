// Native fetch in Node 18+ (no require needed)
const API_URL = "http://35.188.192.145/graphql";

async function testQuery() {
    console.log(`Testing GraphQL at: ${API_URL}`);
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: "{ posts(first: 1) { nodes { title } } }"
            })
        });

        if (!res.ok) {
            console.error(`Error: ${res.status} ${res.statusText}`);
            const text = await res.text();
            console.error(text);
            return;
        }

        const json = await res.json();
        console.log("Success! Data received:");
        console.log(JSON.stringify(json, null, 2));

    } catch (error) {
        console.error("Fetch failed:", error);
    }
}

testQuery();
