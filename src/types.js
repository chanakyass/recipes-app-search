const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  enum MealType {
    BREAKFAST
    BRUNCH
    LUNCH
    SNACKS
    DINNER
    PRE_WORKOUT
    POST_WORKOUT
  }

  enum UnitOfMeasurement {
    MILLIGRAMS
    GRAMS
    KILOGRAMS
    MILLILITRES
    LITRES
    TEA_SPOON
    TABLE_SPOON
    NUMBER
  }

  enum ItemType {
    VEG
    NON_VEG
  }

  type Ingredient {
    id: Int
    name: String
  }

  type RecipeIngredient {
    id: Int
    ingredient: Ingredient
    quantity: Float
    uom: UnitOfMeasurement
  }

  type User {
    id: Int
    firstName: String
    middleName: String
    lastName: String
    profileName: String
    email: String
    userSummary: String
    dob: String
  }

  type Recipe {
    id: Int
    name: String
    description: String
    createdOn: String
    itemType: ItemType
    mealTypes: [MealType]
    serving: Int
    cuisines: [String]
    dishCategories: [String]
    recipeImageAddress: String
    cookingInstructions: String
    recipeIngredients: [RecipeIngredient]
    user: User
  }

  type Query {
    recipes(itemTypes: [ItemType!], mealTypes: [MealType!], serving: Int, cuisines: [String!], dishCategories: [String!], users: [Int], ingredients: [String!], searchString: String): [Recipe]
  }
`;

export default typeDefs;