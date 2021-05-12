const { ApolloServer, gql } = require('apollo-server-lambda')
const pokemons = require('../pokemon')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Attack {
    name: String
    type: String
    damage: Int
  }

  type Attacks {
    fast: [Attack]
    special: [Attack]
  }

  type Evolutions {
    name: String
  }

  type EvolutionRequirements {
    name: String
    amount: Int
  }

  type MinMax {
    minimum: String
    maximum: String
  }

  type Pokemon {
    id: String
    number: String
    name: String
    image: String
    classification: String
    types: [String]
    resistant: [String]
    attacks: Attacks
    weaknesses: [String]
    fleeRate: Float
    maxCP: Int
    maxHP: Int
    evolutions: [Evolutions]
    evolutionRequirements: EvolutionRequirements
    weight: MinMax
    height: MinMax
  }

  type Query {
    pokemons: [Pokemon]
  }
`

const resolvers = {
  Query: {
    pokemons: () => pokemons,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

exports.handler = server.createHandler()
