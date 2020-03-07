import { gql } from "apollo-boost";

const listInstalledModules = gql`
  {
    listInstalledModules {
      _id
      name
      summary
    }
  }
`;
const getInstalledModuleById = gql`
  mutation($id: ID!) {
    getInstalledModulesById(id: $id) {
      _id
      name
      summary
    }
  }
`;
const deleteInstalledModule = gql`
  mutation($id: ID!) {
    deleteInstalledModule(id: $id) {
      _id
      name
      summary
      licence
      email
      triggers
      variables {
        key
        value
      }
      description
      authors
    }
  }
`;

export { listInstalledModules, getInstalledModuleById, deleteInstalledModule };
