// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
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

import {
    UserFull,
    UserFullFromJSON,
    UserFullFromJSONTyped,
    UserFullToJSON,
} from './UserFull';

/**
 * 
 * @export
 * @interface FullSupporting
 */
export interface FullSupporting {
    /**
     * 
     * @type {number}
     * @memberof FullSupporting
     */
    rank: number;
    /**
     * 
     * @type {string}
     * @memberof FullSupporting
     */
    amount: string;
    /**
     * 
     * @type {UserFull}
     * @memberof FullSupporting
     */
    receiver: UserFull;
}

