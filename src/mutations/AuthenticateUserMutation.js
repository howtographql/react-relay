import {
  commitMutation,
  graphql
} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`

export default (email, password, callback) => {
  const variables = {
    email,
    password
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        const token = response.authenticateUser.token
        callback(null, token)
      },
      onError: err => console.error(err),
    },
  )
}