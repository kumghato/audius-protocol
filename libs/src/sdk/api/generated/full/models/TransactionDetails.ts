/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/**
 * API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
} from './';

/**
 * 
 * @export
 * @interface TransactionDetails
 */
export interface TransactionDetails {
    /**
     * 
     * @type {string}
     * @memberof TransactionDetails
     */
    transaction_date: string;
    /**
     * 
     * @type {string}
     * @memberof TransactionDetails
     */
    transaction_type: string;
    /**
     * 
     * @type {string}
     * @memberof TransactionDetails
     */
    method: string;
    /**
     * 
     * @type {string}
     * @memberof TransactionDetails
     */
    signature: string;
    /**
     * 
     * @type {string}
     * @memberof TransactionDetails
     */
    user_bank: string;
    /**
     * 
     * @type {string}
     * @memberof TransactionDetails
     */
    change: string;
    /**
     * 
     * @type {string}
     * @memberof TransactionDetails
     */
    balance: string;
    /**
     * 
     * @type {object}
     * @memberof TransactionDetails
     */
    metadata: object;
}

/**
 * Check if a given object implements the TransactionDetails interface.
 */
export function instanceOfTransactionDetails(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "transaction_date" in value;
    isInstance = isInstance && "transaction_type" in value;
    isInstance = isInstance && "method" in value;
    isInstance = isInstance && "signature" in value;
    isInstance = isInstance && "user_bank" in value;
    isInstance = isInstance && "change" in value;
    isInstance = isInstance && "balance" in value;
    isInstance = isInstance && "metadata" in value;

    return isInstance;
}

export function TransactionDetailsFromJSON(json: any): TransactionDetails {
    return TransactionDetailsFromJSONTyped(json, false);
}

export function TransactionDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionDetails {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        
        'transaction_date': json['transaction_date'],
        'transaction_type': json['transaction_type'],
        'method': json['method'],
        'signature': json['signature'],
        'user_bank': json['user_bank'],
        'change': json['change'],
        'balance': json['balance'],
        'metadata': json['metadata'],
    };
}

export function TransactionDetailsToJSON(value?: TransactionDetails | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'transaction_date': value.transaction_date,
        'transaction_type': value.transaction_type,
        'method': value.method,
        'signature': value.signature,
        'user_bank': value.user_bank,
        'change': value.change,
        'balance': value.balance,
        'metadata': value.metadata,
    };
}

