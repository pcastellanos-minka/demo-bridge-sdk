import {
    AbortResult,
    CommitResult,
    IBankAdapter,
    ResultStatus,
    PrepareResult,
    TransactionContext,
  } from '@minka/bridge-sdk'
  import { LedgerErrorReason } from '@minka/bridge-sdk/errors'
  
  import * as extractor from '../extractor'
  import core from '../core'
  
  export class SyncDebitBankAdapter extends IBankAdapter {
    prepare(context: TransactionContext): Promise<PrepareResult> {
      console.log('RECEIVED POST /v2/debits')
  
      let result: PrepareResult
  
      result = {
        status: ResultStatus.Suspended,
      }
  
      return Promise.resolve(result)
    }
  
    abort(context: TransactionContext): Promise<AbortResult> {
      console.log('RECEIVED POST /v2/debits/abort')
  
      let result: AbortResult
  
      result = {
        status: ResultStatus.Suspended,
      }
  
      return Promise.resolve(result)
    }
  
    commit(context: TransactionContext): Promise<CommitResult> {
      console.log('RECEIVED POST /v2/debits/commit')
  
      let result: CommitResult
  
      result = {
        status: ResultStatus.Suspended,
      }
  
      return Promise.resolve(result)
    }
  }