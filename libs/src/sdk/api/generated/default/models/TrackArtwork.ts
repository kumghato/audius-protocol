/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/**
 * API
 * Audius V1 API
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TrackArtwork
 */
export interface TrackArtwork {
    /**
     * 
     * @type {string}
     * @memberof TrackArtwork
     */
    _150x150?: string;
    /**
     * 
     * @type {string}
     * @memberof TrackArtwork
     */
    _480x480?: string;
    /**
     * 
     * @type {string}
     * @memberof TrackArtwork
     */
    _1000x1000?: string;
}

/**
 * Check if a given object implements the TrackArtwork interface.
 */
export function instanceOfTrackArtwork(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TrackArtworkFromJSON(json: any): TrackArtwork {
    return TrackArtworkFromJSONTyped(json, false);
}

export function TrackArtworkFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackArtwork {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        '_150x150': !exists(json, '150x150') ? undefined : json['150x150'],
        '_480x480': !exists(json, '480x480') ? undefined : json['480x480'],
        '_1000x1000': !exists(json, '1000x1000') ? undefined : json['1000x1000'],
    };
}

export function TrackArtworkToJSON(value?: TrackArtwork | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '150x150': value._150x150,
        '480x480': value._480x480,
        '1000x1000': value._1000x1000,
    };
}

