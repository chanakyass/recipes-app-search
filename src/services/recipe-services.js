import { RESTDataSource } from '@apollo/datasource-rest';

class RecipesAPI extends RESTDataSource {
  baseURL = 'http://localhost:8080/api/v1/';

  constructor(options) {
    super(options);
    this.authToken = options.authToken;
    this.params = options.params;
  }

  willSendRequest(_path, request) {
    request.headers['Authorization'] = this.authToken;
  }

  async getRecipe(id) {
    return this.get(`recipe/${encodeURIComponent(id)}`);
  }

  async getAllRecipes() {
    return this.get('recipes');
  }

  async getAllRecipesWith(searchString) {
    return this.get('recipes', {
      params: {
        searchString,
      },
    });
  }

//   async getMostViewedMovies(limit = '10') {
//     const data = await this.get('movies', {
//       params: {
//         per_page: limit,
//         order_by: 'most_viewed',
//       },
//     });
//     return data.results;
//   }
}

export default RecipesAPI;