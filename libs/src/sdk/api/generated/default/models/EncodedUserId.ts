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
 * @interface EncodedUserId
 */
export interface EncodedUserId {
    /**
     * 
     * @type {string}
     * @memberof EncodedUserId
     */
    user_id?: string;
}

/**
 * Check if a given object implements the EncodedUserId interface.
 */
export function instanceOfEncodedUserId(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EncodedUserIdFromJSON(json: any): EncodedUserId {
    return EncodedUserIdFromJSONTyped(json, false);
}

export function EncodedUserIdFromJSONTyped(json: any, ignoreDiscriminator: boolean): EncodedUserId {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'user_id': !exists(json, 'user_id') ? undefined : json['user_id'],
    };
}

export function EncodedUserIdToJSON(value?: EncodedUserId | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'user_id': value.user_id,
    };
}

