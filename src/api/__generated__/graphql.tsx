import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  File: { input: any; output: any; }
  ObjectID: { input: any; output: any; }
};

export type ActivityAddPathPointInput = {
  activityId: Scalars['ObjectID']['input'];
  lat: Scalars['String']['input'];
  lon: Scalars['String']['input'];
};

export type ActivityAddScoreInput = {
  activityId: Scalars['ObjectID']['input'];
  points: Scalars['Float']['input'];
};

export type ActivityAddTrashInput = {
  activityId: Scalars['ObjectID']['input'];
  lat: Scalars['String']['input'];
  lon: Scalars['String']['input'];
};

export type ActivityCreateInput = {
  activityType: ActivityType;
  description: Scalars['String']['input'];
  distance?: Scalars['Float']['input'];
  durationTime?: Scalars['Float']['input'];
  imageUrls?: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  path?: Array<PathPointInput>;
  points?: Scalars['Float']['input'];
  trashLocations?: Array<PathPointInput>;
  userId: Scalars['ObjectID']['input'];
};

export type ActivityEndInput = {
  activityId: Scalars['ObjectID']['input'];
  distance: Scalars['Float']['input'];
  imageUrls: Array<Scalars['String']['input']>;
};

export type ActivityFindManyInput = {
  activityType?: InputMaybe<ActivityType>;
  description?: InputMaybe<Scalars['String']['input']>;
  maxDistance?: InputMaybe<Scalars['Float']['input']>;
  maxDurationTime?: InputMaybe<Scalars['Float']['input']>;
  maxPoints?: InputMaybe<Scalars['Float']['input']>;
  maxTrashCount?: InputMaybe<Scalars['Float']['input']>;
  minDistance?: InputMaybe<Scalars['Float']['input']>;
  minDurationTime?: InputMaybe<Scalars['Float']['input']>;
  minPoints?: InputMaybe<Scalars['Float']['input']>;
  minTrashCount?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ActivityFindManySortInput = {
  activityType?: InputMaybe<SortInput>;
  createdAt?: InputMaybe<SortInput>;
  distance?: InputMaybe<SortInput>;
  durationTime?: InputMaybe<SortInput>;
  name?: InputMaybe<SortInput>;
  points?: InputMaybe<SortInput>;
  trashCount?: InputMaybe<SortInput>;
  updatedAt?: InputMaybe<SortInput>;
};

export type ActivityInput = {
  id: Scalars['ObjectID']['input'];
};

export type ActivityObject = {
  __typename?: 'ActivityObject';
  activityType: ActivityType;
  createdAt: Scalars['DateTime']['output'];
  currentDuration?: Maybe<Scalars['Float']['output']>;
  description: Scalars['String']['output'];
  distance: Scalars['Float']['output'];
  durationTime: Scalars['Float']['output'];
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ObjectID']['output'];
  imageUrls: Array<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  path: Array<PathPointObject>;
  points: Scalars['Float']['output'];
  startTime?: Maybe<Scalars['DateTime']['output']>;
  trashCount: Scalars['Float']['output'];
  trashLocations: Array<PathPointObject>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<UserObject>;
  userId: Scalars['ObjectID']['output'];
};

export type ActivityPaginationResponse = {
  __typename?: 'ActivityPaginationResponse';
  data: Array<ActivityObject>;
  metadata: PaginationMetadata;
};

export type ActivityStartInput = {
  activityType: ActivityType;
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  userId: Scalars['ObjectID']['input'];
};

export enum ActivityType {
  Biking = 'BIKING',
  Other = 'OTHER',
  Running = 'RUNNING',
  Trekking = 'TREKKING',
  Walking = 'WALKING'
}

export type ActivityUpdateInput = {
  activityType?: InputMaybe<ActivityType>;
  description?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['Float']['input']>;
  durationTime?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ObjectID']['input'];
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Array<PathPointUpdateInput>>;
  points?: InputMaybe<Scalars['Float']['input']>;
  trashCount?: InputMaybe<Scalars['Float']['input']>;
};

export type AwardCreateInput = {
  iconUrl: Scalars['String']['input'];
};

export type AwardFindManyInput = {
  iconUrl?: InputMaybe<Scalars['String']['input']>;
};

export type AwardFindManySortInput = {
  createdAt?: InputMaybe<SortInput>;
  iconUrl?: InputMaybe<SortInput>;
  updatedAt?: InputMaybe<SortInput>;
};

export type AwardInput = {
  id: Scalars['ObjectID']['input'];
};

export type AwardObject = {
  __typename?: 'AwardObject';
  createdAt: Scalars['DateTime']['output'];
  iconUrl: Scalars['String']['output'];
  id: Scalars['ObjectID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AwardPaginationResponse = {
  __typename?: 'AwardPaginationResponse';
  data: Array<AwardObject>;
  metadata: PaginationMetadata;
};

export type AwardUpdateInput = {
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectID']['input'];
};

export type ChallengeCreateInput = {
  description: Scalars['String']['input'];
  iconUrl: Scalars['String']['input'];
  points: Scalars['Float']['input'];
  topic: Scalars['String']['input'];
};

export type ChallengeFindManyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
};

export type ChallengeFindManySortInput = {
  createdAt?: InputMaybe<SortInput>;
  description?: InputMaybe<SortInput>;
  points?: InputMaybe<SortInput>;
  topic?: InputMaybe<SortInput>;
  updatedAt?: InputMaybe<SortInput>;
};

export type ChallengeInput = {
  id: Scalars['ObjectID']['input'];
};

export type ChallengeObject = {
  __typename?: 'ChallengeObject';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  iconUrl: Scalars['String']['output'];
  id: Scalars['ObjectID']['output'];
  points: Scalars['Float']['output'];
  topic: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ChallengePaginationResponse = {
  __typename?: 'ChallengePaginationResponse';
  data: Array<ChallengeObject>;
  metadata: PaginationMetadata;
};

export type ChallengeUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectID']['input'];
  points?: InputMaybe<Scalars['Float']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
};

export enum Error {
  ActivityAlreadyStarted = 'ACTIVITY_ALREADY_STARTED',
  ActivityNotActive = 'ACTIVITY_NOT_ACTIVE',
  ActivityNotFound = 'ACTIVITY_NOT_FOUND',
  ExampleNameNotUniqueCode = 'EXAMPLE_NAME_NOT_UNIQUE_CODE',
  ExampleNotFoundCode = 'EXAMPLE_NOT_FOUND_CODE',
  UnauthenticatedErrorCode = 'UNAUTHENTICATED_ERROR_CODE'
}

export type EventCreateInput = {
  eventType: EventType;
  imageUrl?: Scalars['String']['input'];
  localization: LocalizationInput;
  name: Scalars['String']['input'];
  time: Scalars['String']['input'];
  userIds: Array<Scalars['String']['input']>;
};

export type EventFindManyInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  eventType?: InputMaybe<Array<EventType>>;
  localization?: InputMaybe<LocalizationInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['DateTime']['input']>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EventFindManySortInput = {
  createdAt?: InputMaybe<SortInput>;
  date?: InputMaybe<SortInput>;
  eventType?: InputMaybe<SortInput>;
  name?: InputMaybe<SortInput>;
  time?: InputMaybe<SortInput>;
  updatedAt?: InputMaybe<SortInput>;
};

export type EventInput = {
  eventType: EventType;
  id: Scalars['ObjectID']['input'];
  imageIcon: Scalars['String']['input'];
  localization: LocalizationInput;
  name: Scalars['String']['input'];
  time: Scalars['String']['input'];
  userIds: Array<Scalars['String']['input']>;
};

export type EventObject = {
  __typename?: 'EventObject';
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  eventType: EventType;
  id: Scalars['ObjectID']['output'];
  imageUrl: Scalars['String']['output'];
  localization: Array<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  place: Scalars['String']['output'];
  time: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userIds: Array<Scalars['String']['output']>;
};

export type EventPaginationResponse = {
  __typename?: 'EventPaginationResponse';
  data: Array<EventObject>;
  metadata: PaginationMetadata;
};

/** Type of the event, can be ECOLOGICAL or SOCIAL */
export enum EventType {
  Ecological = 'ECOLOGICAL',
  Social = 'SOCIAL'
}

export type EventUpdateInput = {
  eventType?: InputMaybe<EventType>;
  id: Scalars['String']['input'];
  imageIcon?: InputMaybe<Scalars['String']['input']>;
  localization?: InputMaybe<LocalizationInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum ExampleColor {
  Black = 'BLACK',
  Blue = 'BLUE',
  Brown = 'BROWN',
  Green = 'GREEN',
  Orange = 'ORANGE',
  Pink = 'PINK',
  Purple = 'PURPLE',
  Red = 'RED',
  White = 'WHITE',
  Yellow = 'YELLOW'
}

export type ExampleCreateInput = {
  color: ExampleColor;
  name: Scalars['String']['input'];
};

export type ExampleFindManyInput = {
  color?: InputMaybe<Array<ExampleColor>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ExampleFindManySortInput = {
  color?: InputMaybe<SortInput>;
  name?: InputMaybe<SortInput>;
};

export type ExampleInput = {
  id: Scalars['ObjectID']['input'];
};

export type ExampleObject = {
  __typename?: 'ExampleObject';
  color: ExampleColor;
  id: Scalars['ObjectID']['output'];
  name: Scalars['String']['output'];
};

export type ExamplePaginationResponse = {
  __typename?: 'ExamplePaginationResponse';
  data: Array<ExampleObject>;
  metadata: PaginationMetadata;
};

export type ExampleUpdateInput = {
  color?: InputMaybe<ExampleColor>;
  id: Scalars['ObjectID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type LeaderboardEntryObject = {
  __typename?: 'LeaderboardEntryObject';
  activityPoints: Scalars['Float']['output'];
  avatarUrl?: Maybe<Scalars['String']['output']>;
  challengePoints: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ObjectID']['output'];
  lastname: Scalars['String']['output'];
  rank: Scalars['Float']['output'];
  totalPoints: Scalars['Float']['output'];
};

export type LeaderboardFindInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: Scalars['Int']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type LocalizationInput = {
  /** Distance in kilometers */
  distance: Scalars['Float']['input'];
  /** Your current latitude */
  latitude: Scalars['Float']['input'];
  /** Your current longitude */
  longitude: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activityAddPathPoint: ActivityObject;
  activityAddScore: ActivityObject;
  activityAddTrash: ActivityObject;
  activityCreate: ActivityObject;
  activityDelete?: Maybe<ActivityObject>;
  activityEnd: ActivityObject;
  activityStart: ActivityObject;
  activityUpdate?: Maybe<ActivityObject>;
  awardCreate: AwardObject;
  awardDelete?: Maybe<AwardObject>;
  awardUpdate?: Maybe<AwardObject>;
  challengeCreate: ChallengeObject;
  challengeDelete?: Maybe<ChallengeObject>;
  challengeUpdate?: Maybe<ChallengeObject>;
  eventCreate: EventObject;
  eventDelete?: Maybe<EventObject>;
  eventUpdate?: Maybe<EventObject>;
  exampleCreate: ExampleObject;
  exampleDelete: Success;
  exampleUpdate: ExampleObject;
  userCreate: UserObject;
};


export type MutationActivityAddPathPointArgs = {
  input: ActivityAddPathPointInput;
};


export type MutationActivityAddScoreArgs = {
  input: ActivityAddScoreInput;
};


export type MutationActivityAddTrashArgs = {
  input: ActivityAddTrashInput;
};


export type MutationActivityCreateArgs = {
  input: ActivityCreateInput;
};


export type MutationActivityDeleteArgs = {
  input: ActivityInput;
};


export type MutationActivityEndArgs = {
  input: ActivityEndInput;
};


export type MutationActivityStartArgs = {
  input: ActivityStartInput;
};


export type MutationActivityUpdateArgs = {
  input: ActivityUpdateInput;
};


export type MutationAwardCreateArgs = {
  input: AwardCreateInput;
};


export type MutationAwardDeleteArgs = {
  input: AwardInput;
};


export type MutationAwardUpdateArgs = {
  input: AwardUpdateInput;
};


export type MutationChallengeCreateArgs = {
  input: ChallengeCreateInput;
};


export type MutationChallengeDeleteArgs = {
  input: ChallengeInput;
};


export type MutationChallengeUpdateArgs = {
  input: ChallengeUpdateInput;
};


export type MutationEventCreateArgs = {
  input: EventCreateInput;
};


export type MutationEventDeleteArgs = {
  input: EventInput;
};


export type MutationEventUpdateArgs = {
  input: EventUpdateInput;
};


export type MutationExampleCreateArgs = {
  input: ExampleCreateInput;
};


export type MutationExampleDeleteArgs = {
  input: ExampleInput;
};


export type MutationExampleUpdateArgs = {
  input: ExampleUpdateInput;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};

export type PaginationInput = {
  /** default: 1 */
  page?: Scalars['Int']['input'];
  /** default: 10, minimum: 1, max: 100 */
  pageSize?: Scalars['Int']['input'];
};

export type PaginationMetadata = {
  __typename?: 'PaginationMetadata';
  currentPage: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PathPointInput = {
  lat: Scalars['String']['input'];
  lon: Scalars['String']['input'];
};

export type PathPointObject = {
  __typename?: 'PathPointObject';
  lat: Scalars['String']['output'];
  lon: Scalars['String']['output'];
};

export type PathPointUpdateInput = {
  lat?: InputMaybe<Scalars['String']['input']>;
  lon?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  activities: ActivityPaginationResponse;
  activitiesThrashMap: Array<PathPointObject>;
  activity?: Maybe<ActivityObject>;
  activityCurrentDuration?: Maybe<Scalars['Float']['output']>;
  activityStarted?: Maybe<ActivityObject>;
  award?: Maybe<AwardObject>;
  awards: AwardPaginationResponse;
  challenge?: Maybe<ChallengeObject>;
  challenges: ChallengePaginationResponse;
  errors: Array<Error>;
  event?: Maybe<EventObject>;
  events: EventPaginationResponse;
  example: ExampleObject;
  examples: ExamplePaginationResponse;
  /** Get top users by total points (activities + challenges) with optional date filtering */
  leaderboard: Array<LeaderboardEntryObject>;
  minioTest: Scalars['String']['output'];
  user?: Maybe<UserObject>;
  users: UserPaginationResponse;
};


export type QueryActivitiesArgs = {
  input: ActivityFindManyInput;
  pagination: PaginationInput;
  sort: ActivityFindManySortInput;
};


export type QueryActivityArgs = {
  input: ActivityInput;
};


export type QueryActivityCurrentDurationArgs = {
  activityId: Scalars['String']['input'];
};


export type QueryActivityStartedArgs = {
  userId: Scalars['String']['input'];
};


export type QueryAwardArgs = {
  input: AwardInput;
};


export type QueryAwardsArgs = {
  input: AwardFindManyInput;
  pagination: PaginationInput;
  sort: AwardFindManySortInput;
};


export type QueryChallengeArgs = {
  input: ChallengeInput;
};


export type QueryChallengesArgs = {
  input: ChallengeFindManyInput;
  pagination: PaginationInput;
  sort: ChallengeFindManySortInput;
};


export type QueryEventArgs = {
  input: EventInput;
};


export type QueryEventsArgs = {
  input: EventFindManyInput;
  pagination: PaginationInput;
  sort: EventFindManySortInput;
};


export type QueryExampleArgs = {
  input: ExampleInput;
};


export type QueryExamplesArgs = {
  input: ExampleFindManyInput;
  pagination: PaginationInput;
  sort: ExampleFindManySortInput;
};


export type QueryLeaderboardArgs = {
  input: LeaderboardFindInput;
};


export type QueryUserArgs = {
  input: UserInput;
};


export type QueryUsersArgs = {
  input: UserFindManyInput;
  pagination: PaginationInput;
  sort: UserFindManySortInput;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortInput = {
  direction: Sort;
};

export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean']['output'];
};

export type UserCreateInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  awardIds?: InputMaybe<Array<Scalars['ObjectID']['input']>>;
  challengeIds?: InputMaybe<Array<Scalars['ObjectID']['input']>>;
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};

export type UserFindManyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
};

export type UserFindManySortInput = {
  createdAt?: InputMaybe<SortInput>;
  email?: InputMaybe<SortInput>;
  firstname?: InputMaybe<SortInput>;
  lastname?: InputMaybe<SortInput>;
  updatedAt?: InputMaybe<SortInput>;
};

export type UserInput = {
  id: Scalars['ObjectID']['input'];
};

export type UserObject = {
  __typename?: 'UserObject';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  awardIds: Array<Scalars['ObjectID']['output']>;
  awards: Array<AwardObject>;
  challengeIds: Array<Scalars['ObjectID']['output']>;
  challenges: Array<ChallengeObject>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ObjectID']['output'];
  lastname: Scalars['String']['output'];
  points: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserPaginationResponse = {
  __typename?: 'UserPaginationResponse';
  data: Array<UserObject>;
  metadata: PaginationMetadata;
};

export type ThrashmapQueryVariables = Exact<{ [key: string]: never; }>;


export type ThrashmapQuery = { __typename?: 'Query', activitiesThrashMap: Array<{ __typename?: 'PathPointObject', lat: string, lon: string }> };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'UserObject', avatarUrl?: string | null, awardIds: Array<any>, challengeIds: Array<any>, createdAt: any, email: string, firstname: string, id: any, lastname: string, points: number, updatedAt: any, awards: Array<{ __typename?: 'AwardObject', createdAt: any, iconUrl: string, id: any, title: string, updatedAt: any }>, challenges: Array<{ __typename?: 'ChallengeObject', createdAt: any, description: string, iconUrl: string, id: any, points: number, topic: string, updatedAt: any }> } | null };


export const ThrashmapDocument = gql`
    query thrashmap {
  activitiesThrashMap {
    lat
    lon
  }
}
    `;

/**
 * __useThrashmapQuery__
 *
 * To run a query within a React component, call `useThrashmapQuery` and pass it any options that fit your needs.
 * When your component renders, `useThrashmapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThrashmapQuery({
 *   variables: {
 *   },
 * });
 */
export function useThrashmapQuery(baseOptions?: Apollo.QueryHookOptions<ThrashmapQuery, ThrashmapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ThrashmapQuery, ThrashmapQueryVariables>(ThrashmapDocument, options);
      }
export function useThrashmapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ThrashmapQuery, ThrashmapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ThrashmapQuery, ThrashmapQueryVariables>(ThrashmapDocument, options);
        }
export function useThrashmapSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ThrashmapQuery, ThrashmapQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ThrashmapQuery, ThrashmapQueryVariables>(ThrashmapDocument, options);
        }
export type ThrashmapQueryHookResult = ReturnType<typeof useThrashmapQuery>;
export type ThrashmapLazyQueryHookResult = ReturnType<typeof useThrashmapLazyQuery>;
export type ThrashmapSuspenseQueryHookResult = ReturnType<typeof useThrashmapSuspenseQuery>;
export type ThrashmapQueryResult = Apollo.QueryResult<ThrashmapQuery, ThrashmapQueryVariables>;
export const UserDocument = gql`
    query user {
  user(input: {id: ""}) {
    avatarUrl
    awardIds
    awards {
      createdAt
      iconUrl
      id
      title
      updatedAt
    }
    challengeIds
    challenges {
      createdAt
      description
      iconUrl
      id
      points
      topic
      updatedAt
    }
    createdAt
    email
    firstname
    id
    lastname
    points
    updatedAt
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;