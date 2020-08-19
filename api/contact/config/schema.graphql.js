module.exports = {
  definition: `
    input ContactInput {
      name: String!
      email: String!
      message: String!
    }

    type SuccessResponse {
      success: Boolean
    }
  `,
  mutation: `
    contact(data: ContactInput!): SuccessResponse
  `,
  resolver: {
    Mutation: {
      contact: {
        description: "Send a contact email",
        resolverOf: "application::contact.contact.index",
        resolver: async (_obj, _options, { context }) => {
          const {
            data: { name, email, message },
          } = context.request.body;

          await strapi.plugins["email"].services.email.send({
            to: process.env.EMAIL,
            from: email,
            subject: "Contact form",
            text: `
              ${name} has sent you a message:

              ${message}
            `,
          });

          return {
            success: true,
          };
        },
      },
    },
  },
};
