/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSchool = /* GraphQL */ `
  query GetSchool($id: ID!) {
    getSchool(id: $id) {
      id
      name
      users {
        items {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          schoolUsersId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listSchools = /* GraphQL */ `
  query ListSchools(
    $filter: ModelSchoolFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchools(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        users {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSchools = /* GraphQL */ `
  query SyncSchools(
    $filter: ModelSchoolFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSchools(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        users {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      school {
        id
        name
        users {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      documents {
        items {
          id
          name
          filePath
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userDocumentsId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      schoolUsersId
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        school {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        documents {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        schoolUsersId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        school {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        documents {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        schoolUsersId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getDocument = /* GraphQL */ `
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
      id
      user {
        id
        name
        school {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        documents {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        schoolUsersId
        owner
      }
      name
      filePath
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userDocumentsId
      owner
    }
  }
`;
export const listDocuments = /* GraphQL */ `
  query ListDocuments(
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          schoolUsersId
          owner
        }
        name
        filePath
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userDocumentsId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDocuments = /* GraphQL */ `
  query SyncDocuments(
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDocuments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        user {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          schoolUsersId
          owner
        }
        name
        filePath
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userDocumentsId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
