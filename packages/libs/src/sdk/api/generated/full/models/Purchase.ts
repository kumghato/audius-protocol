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
 * @interface Purchase
 */
export interface Purchase {
    /**
     * 
     * @type {number}
     * @memberof Purchase
     */
    slot: number;
    /**
     * 
     * @type {string}
     * @memberof Purchase
     */
    signature: string;
    /**
     * 
     * @type {string}
     * @memberof Purchase
     */
    sellerUserId: string;
    /**
     * 
     * @type {string}
     * @memberof Purchase
     */
    buyerUserId: string;
    /**
     * 
     * @type {string}
     * @memberof Purchase
     */
    amount: string;
    /**
     * 
     * @type {string}
     * @memberof Purchase
     */
    contentType: string;
    /**
     * 
     * @type {string}
     * @memberof Purchase
     */
    contentId: string;
    /**
     * 
     * @type {string}
     * @memberof Purchase
     */
    createdAt: string;
    /**
     * 
     * @type {string}
     * @memberof Purchase
     */
    updatedAt: string;
}

/**
 * Check if a given object implements the Purchase interface.
 */
export function instanceOfPurchase(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "slot" in value;
    isInstance = isInstance && "signature" in value;
    isInstance = isInstance && "sellerUserId" in value;
    isInstance = isInstance && "buyerUserId" in value;
    isInstance = isInstance && "amount" in value;
    isInstance = isInstance && "contentType" in value;
    isInstance = isInstance && "contentId" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;

    return isInstance;
}

export function PurchaseFromJSON(json: any): Purchase {
    return PurchaseFromJSONTyped(json, false);
}

export function PurchaseFromJSONTyped(json: any, ignoreDiscriminator: boolean): Purchase {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
    }
    return {
        
        'slot': json['slot'],
        'signature': json['signature'],
        'sellerUserId': json['seller_user_id'],
        'buyerUserId': json['buyer_user_id'],
        'amount': json['amount'],
        'contentType': json['content_type'],
        'contentId': json['content_id'],
        'createdAt': json['created_at'],
        'updatedAt': json['updated_at'],
    };
}

export function PurchaseToJSON(value?: Purchase | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'slot': value.slot,
        'signature': value.signature,
        'seller_user_id': value.sellerUserId,
        'buyer_user_id': value.buyerUserId,
        'amount': value.amount,
        'content_type': value.contentType,
        'content_id': value.contentId,
        'created_at': value.createdAt,
        'updated_at': value.updatedAt,
    };
}
