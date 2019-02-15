import { ApolloError } from 'apollo-client'
import React from 'react'
import {
  OperationVariables,
  Query as ApolloQuery,
  QueryProps as ApolloQueryProps,
  QueryResult as ApolloQueryResult,
} from 'react-apollo'
import { Omit } from './types'

interface Loading {
  type: 'loading'
}

interface Data<T> {
  type: 'data'
  data: T
}

interface Error {
  type: 'error'
  error: ApolloError
}

export type QueryResult<T> = Loading | Data<T> | Error

export interface QueryProps<TData, TVariables>
  extends Omit<
    ApolloQueryProps<TData, TVariables>,
    'children' | 'notifyOnNetworkStatusChange'
  > {
  children: (
    value: {
      result: QueryResult<TData>
    },
  ) => React.ReactNode
}

class Query<
  TData = any,
  TVariables = OperationVariables
> extends React.PureComponent<QueryProps<TData, TVariables>> {
  public render() {
    return (
      <ApolloQuery {...this.props}>
        {data => this.props.children({ result: this.mapData(data) })}
      </ApolloQuery>
    )
  }

  private mapData = (
    result: ApolloQueryResult<TData, TVariables>,
  ): QueryResult<TData> => {
    const { loading, error, data } = result

    if (loading) {
      return { type: 'loading' }
    }
    if (error) {
      return {
        type: 'error',
        error,
      }
    }
    if (data) {
      return {
        type: 'data',
        data,
      }
    }

    // This point should actually never be reached due to the restrictions of Apollo GraphQL responses
    console.error(
      'An unexpected Query sidecase happened where no valid union type could be found, please file an issue for this.',
    )
    return { type: 'error', error: new ApolloError({}) }
  }
}

export default Query
