import {
    commitMutation,
    graphql
} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation SignupUserMutation($email: String!, $password: String!, $name: String!) {
    signupUser(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`

export default (name, email, password, callback) => {
  const variables = {
    name,
    email,
    password,
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        const id = response.signupUser.id
        const token = response.signupUser.token
        callback(id, token)
      },
      onError: err => console.error(err),
    },
  )
}