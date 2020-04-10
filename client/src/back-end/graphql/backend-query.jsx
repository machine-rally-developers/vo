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
  query getInstalledModuleById($id: ID!) {
    getInstalledModuleById(id: $id) {
      _id
      name
      summary
      licence
      email
      triggers
      variables {
        _id
        key
        value
      }
      description
      authors
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
const addVariable = gql`
  mutation($moduleId: ID!, $key: String!, $value: String!) {
    addVariable(moduleId: $moduleId, key: $key, value: $value) {
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
const deleteVariable = gql`
  mutation($moduleId: ID!, $variableId: ID!) {
    deleteVariable(moduleId: $moduleId, variableId: $variableId) {
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

export {
  listInstalledModules,
  getInstalledModuleById,
  deleteInstalledModule,
  addVariable,
  deleteVariable
};
