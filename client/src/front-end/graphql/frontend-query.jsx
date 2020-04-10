import { gql } from "apollo-boost";
const conversation = gql`
  mutation($question: String!) {
    conversation(question: $question) {
      question
      answer
    }
  }
`;
export { conversation };
