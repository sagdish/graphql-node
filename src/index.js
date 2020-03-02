const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for graphql'
},
{
  id: 'link-1',
  url: 'www.sagdi.com',
  description: 'my personal website'
}];

const mapper = (arr, id) => {
  return arr.findIndex((el) => el.id === id)
}

let idCount = links.length
const resolvers = {
  
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      // console.log(parent);
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      console.log("before links: ", links);
      
      const indexToEdit = mapper(links, args.id);

      console.log("indexToEdit: ", indexToEdit);
      const newLinks = links.map((link, i) => {
        if (i === indexToEdit) {
          return { ...link, description: args.description, url: args.url }
        } else {
          return link
        }
      });
      console.log(newLinks);
      links = newLinks;
      return newLinks[indexToEdit];
        
    },
    deleteLink: (parent, args) => {

    }
  },

  // this is not needed(because the GraphQL server infers what they look like) but still, I will include for educational purposes
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))