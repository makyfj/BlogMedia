import React from "react";

const SSGPage = () => {
  return <div></div>;
};

export default SSGPage;

// import { gql, useQuery } from "@apollo/client";
// import { GetStaticPropsContext } from "next";
// import { initializeApollo, addApolloState } from "../lib/apolloClient";

// interface Country {
//   name: string;
//   code: string;
//   emoji: string;
// }

// const GET_COUNTRIES = gql`
//   query CountriesQuery {
//     countries {
//       name
//       code
//       emoji
//     }
//   }
// `;

// export default function SSG() {
//   const { loading, error, data } = useQuery(GET_COUNTRIES);
//   const countries = data?.countries.map((country: Country) => country) || [];
//   const haveCountries = Boolean(countries.length);

//   return (
//     <>
//       <h1>SSG Page</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>An error has occurred.</p>
//       ) : !haveCountries ? (
//         <p>No posts found.</p>
//       ) : (
//         countries.map((country: Country, id: number) => {
//           return (
//             <article
//               key={id}
//               style={{
//                 border: "2px solid #eee",
//                 padding: "1rem",
//                 marginBottom: "1rem",
//                 borderRadius: "10px",
//               }}
//             >
//               <h2>{country.name}</h2>
//               <h3>{country.code}</h3>
//               <h3>{country.emoji}</h3>
//             </article>
//           );
//         })
//       )}
//     </>
//   );
// }

// export async function getStaticProps(context: GetStaticPropsContext) {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: GET_COUNTRIES,
//   });

//   return addApolloState(apolloClient, {
//     props: {},
//   });
// }
