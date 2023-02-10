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
import type { TransactionDetails } from './TransactionDetails';
import {
    TransactionDetailsFromJSON,
    TransactionDetailsFromJSONTyped,
    TransactionDetailsToJSON,
} from './TransactionDetails';
import type { VersionMetadata } from './VersionMetadata';
import {
    VersionMetadataFromJSON,
    VersionMetadataFromJSONTyped,
    VersionMetadataToJSON,
} from './VersionMetadata';

/**
 * 
 * @export
 * @interface TransactionHistoryResponse
 */
export interface TransactionHistoryResponse {
    /**
     * 
     * @type {number}
     * @memberof TransactionHistoryResponse
     */
    latest_chain_block: number;
    /**
     * 
     * @type {number}
     * @memberof TransactionHistoryResponse
     */
    latest_indexed_block: number;
    /**
     * 
     * @type {number}
     * @memberof TransactionHistoryResponse
     */
    latest_chain_slot_plays: number;
    /**
     * 
     * @type {number}
     * @memberof TransactionHistoryResponse
     */
    latest_indexed_slot_plays: number;
    /**
     * 
     * @type {string}
     * @memberof TransactionHistoryResponse
     */
    signature: string;
    /**
     * 
     * @type {string}
     * @memberof TransactionHistoryResponse
     */
    timestamp: string;
    /**
     * 
     * @type {VersionMetadata}
     * @memberof TransactionHistoryResponse
     */
    version: VersionMetadata;
    /**
     * 
     * @type {Array<TransactionDetails>}
     * @memberof TransactionHistoryResponse
     */
    data?: Array<TransactionDetails>;
}

/**
 * Check if a given object implements the TransactionHistoryResponse interface.
 */
export function instanceOfTransactionHistoryResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "latest_chain_block" in value;
    isInstance = isInstance && "latest_indexed_block" in value;
    isInstance = isInstance && "latest_chain_slot_plays" in value;
    isInstance = isInstance && "latest_indexed_slot_plays" in value;
    isInstance = isInstance && "signature" in value;
    isInstance = isInstance && "timestamp" in value;
    isInstance = isInstance && "version" in value;

    return isInstance;
}

export function TransactionHistoryResponseFromJSON(json: any): TransactionHistoryResponse {
    return TransactionHistoryResponseFromJSONTyped(json, false);
}

export function TransactionHistoryResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionHistoryResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'latest_chain_block': json['latest_chain_block'],
        'latest_indexed_block': json['latest_indexed_block'],
        'latest_chain_slot_plays': json['latest_chain_slot_plays'],
        'latest_indexed_slot_plays': json['latest_indexed_slot_plays'],
        'signature': json['signature'],
        'timestamp': json['timestamp'],
        'version': VersionMetadataFromJSON(json['version']),
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(TransactionDetailsFromJSON)),
    };
}

export function TransactionHistoryResponseToJSON(value?: TransactionHistoryResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'latest_chain_block': value.latest_chain_block,
        'latest_indexed_block': value.latest_indexed_block,
        'latest_chain_slot_plays': value.latest_chain_slot_plays,
        'latest_indexed_slot_plays': value.latest_indexed_slot_plays,
        'signature': value.signature,
        'timestamp': value.timestamp,
        'version': VersionMetadataToJSON(value.version),
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(TransactionDetailsToJSON)),
    };
}

