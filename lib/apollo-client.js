import { print } from "graphql/language/printer";

export function getClient() {
  const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://localhost:8000/graphql";

  return {
    query: async ({ query, variables, context }) => {
      // Convert gql AST to string
      const queryStr = print(query);

      const fetchOptions = context?.fetchOptions || {};

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...fetchOptions.headers
          },
          body: JSON.stringify({ query: queryStr, variables }),
          // Allow passing Next.js specific options like revalidate
          ...fetchOptions
        });

        if (!res.ok) {
          console.error("Fetch Error:", res.status, res.statusText);
          throw new Error(`Failed to fetch API`);
        }

        const json = await res.json();

        if (json.errors) {
          console.error("GraphQL Errors:", JSON.stringify(json.errors, null, 2));
          // Return null data or partial data logic, but for now throw or return empty
          // To prevent crashing the build completely on minor errors, we might return empty data
          // But let's throw to be safe for now.
          throw new Error("GraphQL Error");
        }

        return { data: json.data };
      } catch (error) {
        console.error("Network/Parse Error:", error);
        // Return empty structure to prevent page crashes during build if API is down
        return { data: {} };
      }
    },
  };
}
