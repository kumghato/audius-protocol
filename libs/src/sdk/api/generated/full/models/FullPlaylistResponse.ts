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
import type { PlaylistFull } from './PlaylistFull';
import {
    PlaylistFullFromJSON,
    PlaylistFullFromJSONTyped,
    PlaylistFullToJSON,
} from './PlaylistFull';
import type { VersionMetadata } from './VersionMetadata';
import {
    VersionMetadataFromJSON,
    VersionMetadataFromJSONTyped,
    VersionMetadataToJSON,
} from './VersionMetadata';

/**
 * 
 * @export
 * @interface FullPlaylistResponse
 */
export interface FullPlaylistResponse {
    /**
     * 
     * @type {number}
     * @memberof FullPlaylistResponse
     */
    latest_chain_block: number;
    /**
     * 
     * @type {number}
     * @memberof FullPlaylistResponse
     */
    latest_indexed_block: number;
    /**
     * 
     * @type {number}
     * @memberof FullPlaylistResponse
     */
    latest_chain_slot_plays: number;
    /**
     * 
     * @type {number}
     * @memberof FullPlaylistResponse
     */
    latest_indexed_slot_plays: number;
    /**
     * 
     * @type {string}
     * @memberof FullPlaylistResponse
     */
    signature: string;
    /**
     * 
     * @type {string}
     * @memberof FullPlaylistResponse
     */
    timestamp: string;
    /**
     * 
     * @type {VersionMetadata}
     * @memberof FullPlaylistResponse
     */
    version: VersionMetadata;
    /**
     * 
     * @type {Array<PlaylistFull>}
     * @memberof FullPlaylistResponse
     */
    data?: Array<PlaylistFull>;
}

/**
 * Check if a given object implements the FullPlaylistResponse interface.
 */
export function instanceOfFullPlaylistResponse(value: object): boolean {
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

export function FullPlaylistResponseFromJSON(json: any): FullPlaylistResponse {
    return FullPlaylistResponseFromJSONTyped(json, false);
}

export function FullPlaylistResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): FullPlaylistResponse {
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
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(PlaylistFullFromJSON)),
    };
}

export function FullPlaylistResponseToJSON(value?: FullPlaylistResponse | null): any {
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
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(PlaylistFullToJSON)),
    };
}

