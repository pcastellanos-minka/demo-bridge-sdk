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
  
  export class SyncCreditBankAdapter extends IBankAdapter {
    prepare(context: TransactionContext): Promise<PrepareResult> {
      console.log('RECEIVED POST /v2/credits')
  
      let result: PrepareResult
        
      const entry =  {
        schema: context.entry.schema,
        target: context.entry.target!.handle,
        source: context.entry.source!.handle,
        amount: context.entry.amount,
        symbol: context.entry.symbol.handle
        }; 
      try {
        const extractedData = extractor.extractAndValidateData(entry)

        const coreAccount = core.getAccount(
          extractedData.address?.account,
        )
        coreAccount.assertIsActive()
  
        result = {
          status: ResultStatus.Prepared,
        }
      } catch (e: any) {
        result = {
          status: ResultStatus.Failed,
          error: {
            reason: LedgerErrorReason.BridgeUnexpectedCoreError,
            detail: e.message,
            failId: undefined,
          },
        }
      }  
  
      return Promise.resolve(result)
    }
  
    abort(context: TransactionContext): Promise<AbortResult> {
      console.log('RECEIVED POST /v2/credits/abort')
  
      let result: AbortResult 
  
      result = {
        status: ResultStatus.Aborted,
      }
  
      return Promise.resolve(result)
    }
  
    commit(context: TransactionContext): Promise<CommitResult> {
      console.log('RECEIVED POST /v2/credits/commit')
  
      let result: CommitResult
  
      result = {
        status: ResultStatus.Committed,
      }
  
      return Promise.resolve(result)
    }
  }