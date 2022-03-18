export default {
  type: "object",
  properties: {
    email: { 
      type: 'string',
      title: 'Email cannot be empty',
    },
    password: { 
      type: 'string',
      title: 'enter cannot be empty'
    }
  },
  required: ['email', 'password']
} as const;
