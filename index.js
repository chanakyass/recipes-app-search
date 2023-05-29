
import RecipesAPI from './src/services/recipe-services.js';
import typeDefs from './src/types.js';
import resolvers from './src/resolvers.js';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    // cache: new InMemoryLRUCache({
    //   // ~100MiB
    //   maxSize: Math.pow(2, 20) * 100,
    //   // 5 minutes (in seconds)
    //   ttl: 300,
    // }),
    context: async ({req}) => {
      const { cache } = server;
      const authToken = req.headers['authorization'];
      return {
        // We create new instances of our data sources with each request,
        // passing in our server's cache.
        dataSources: {
          recipesAPI: new RecipesAPI({ cache, authToken }),
        },
      };
    },
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);