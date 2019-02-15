import { ApolloError } from 'apollo-client'
import React from 'react'
import {
  Mutation as ApolloMutation,
  MutationFn,
  MutationProps as ApolloMutationProps,
  MutationResult as ApolloMutationResult,
  OperationVariables,
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

export type MutationResult<T> = Loading | Data<T> | Error

export interface MutationProps<TData, TVariables>
  extends Omit<ApolloMutationProps<TData, TVariables>, 'children'> {
  children: (
    value: {
      mutateFn: MutationFn<TData, TVariables>
      result: MutationResult<TData>
    },
  ) => React.ReactNode
}

class Mutation<
  TData = any,
  TVariables = OperationVariables
> extends React.PureComponent<MutationProps<TData, TVariables>> {
  public render() {
    return (
      <ApolloMutation {...this.props}>
        {(mutateFn, data) =>
          this.props.children({ mutateFn, result: this.mapData(data) })
        }
      </ApolloMutation>
    )
  }

  private mapData = (
    result: ApolloMutationResult<TData>,
  ): MutationResult<TData> => {
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
      'An unexpected Mutation sidecase happened where no valid union type could be found, please file an issue for this.',
    )
    return { type: 'error', error: new ApolloError({}) }
  }
}

export default Mutation
