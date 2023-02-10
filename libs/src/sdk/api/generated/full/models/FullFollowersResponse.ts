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
import type { UserFull } from './UserFull';
import {
    UserFullFromJSON,
    UserFullFromJSONTyped,
    UserFullToJSON,
} from './UserFull';
import type { VersionMetadata } from './VersionMetadata';
import {
    VersionMetadataFromJSON,
    VersionMetadataFromJSONTyped,
    VersionMetadataToJSON,
} from './VersionMetadata';

/**
 * 
 * @export
 * @interface FullFollowersResponse
 */
export interface FullFollowersResponse {
    /**
     * 
     * @type {number}
     * @memberof FullFollowersResponse
     */
    latest_chain_block: number;
    /**
     * 
     * @type {number}
     * @memberof FullFollowersResponse
     */
    latest_indexed_block: number;
    /**
     * 
     * @type {number}
     * @memberof FullFollowersResponse
     */
    latest_chain_slot_plays: number;
    /**
     * 
     * @type {number}
     * @memberof FullFollowersResponse
     */
    latest_indexed_slot_plays: number;
    /**
     * 
     * @type {string}
     * @memberof FullFollowersResponse
     */
    signature: string;
    /**
     * 
     * @type {string}
     * @memberof FullFollowersResponse
     */
    timestamp: string;
    /**
     * 
     * @type {VersionMetadata}
     * @memberof FullFollowersResponse
     */
    version: VersionMetadata;
    /**
     * 
     * @type {Array<UserFull>}
     * @memberof FullFollowersResponse
     */
    data?: Array<UserFull>;
}

/**
 * Check if a given object implements the FullFollowersResponse interface.
 */
export function instanceOfFullFollowersResponse(value: object): boolean {
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

export function FullFollowersResponseFromJSON(json: any): FullFollowersResponse {
    return FullFollowersResponseFromJSONTyped(json, false);
}

export function FullFollowersResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): FullFollowersResponse {
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
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(UserFullFromJSON)),
    };
}

export function FullFollowersResponseToJSON(value?: FullFollowersResponse | null): any {
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
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(UserFullToJSON)),
    };
}

