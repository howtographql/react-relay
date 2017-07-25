import {
  commitMutation,
  graphql
} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation SigninMutation($input: SigninUserInput!) {
    signinUser(input: $input) {
      token
      user {
        id
      }
    }
  }
`

export default (email, password, callback) => {
  const variables = {
    input: {
      email: {
        email,
        password
      },
      clientMutationId: ""
    },
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        const id = response.signinUser.user.id
        const token = response.signinUser.token
        callback(id, token)
      },
      onError: err => console.error(err),
    },
  )
}