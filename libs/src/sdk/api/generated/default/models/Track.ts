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
import type { RemixParent } from './RemixParent';
import {
    RemixParentFromJSON,
    RemixParentFromJSONTyped,
    RemixParentToJSON,
} from './RemixParent';
import type { TrackArtwork } from './TrackArtwork';
import {
    TrackArtworkFromJSON,
    TrackArtworkFromJSONTyped,
    TrackArtworkToJSON,
} from './TrackArtwork';
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './User';

/**
 * 
 * @export
 * @interface Track
 */
export interface Track {
    /**
     * 
     * @type {TrackArtwork}
     * @memberof Track
     */
    artwork?: TrackArtwork;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    genre?: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    track_cid?: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    mood?: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    release_date?: string;
    /**
     * 
     * @type {RemixParent}
     * @memberof Track
     */
    remix_of?: RemixParent;
    /**
     * 
     * @type {number}
     * @memberof Track
     */
    repost_count: number;
    /**
     * 
     * @type {number}
     * @memberof Track
     */
    favorite_count: number;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    tags?: string;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    title: string;
    /**
     * 
     * @type {User}
     * @memberof Track
     */
    user: User;
    /**
     * 
     * @type {number}
     * @memberof Track
     */
    duration: number;
    /**
     * 
     * @type {boolean}
     * @memberof Track
     */
    downloadable?: boolean;
    /**
     * 
     * @type {number}
     * @memberof Track
     */
    play_count: number;
    /**
     * 
     * @type {string}
     * @memberof Track
     */
    permalink?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Track
     */
    is_streamable?: boolean;
}

/**
 * Check if a given object implements the Track interface.
 */
export function instanceOfTrack(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "repost_count" in value;
    isInstance = isInstance && "favorite_count" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "user" in value;
    isInstance = isInstance && "duration" in value;
    isInstance = isInstance && "play_count" in value;

    return isInstance;
}

export function TrackFromJSON(json: any): Track {
    return TrackFromJSONTyped(json, false);
}

export function TrackFromJSONTyped(json: any, ignoreDiscriminator: boolean): Track {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'artwork': !exists(json, 'artwork') ? undefined : TrackArtworkFromJSON(json['artwork']),
        'description': !exists(json, 'description') ? undefined : json['description'],
        'genre': !exists(json, 'genre') ? undefined : json['genre'],
        'id': json['id'],
        'track_cid': !exists(json, 'track_cid') ? undefined : json['track_cid'],
        'mood': !exists(json, 'mood') ? undefined : json['mood'],
        'release_date': !exists(json, 'release_date') ? undefined : json['release_date'],
        'remix_of': !exists(json, 'remix_of') ? undefined : RemixParentFromJSON(json['remix_of']),
        'repost_count': json['repost_count'],
        'favorite_count': json['favorite_count'],
        'tags': !exists(json, 'tags') ? undefined : json['tags'],
        'title': json['title'],
        'user': UserFromJSON(json['user']),
        'duration': json['duration'],
        'downloadable': !exists(json, 'downloadable') ? undefined : json['downloadable'],
        'play_count': json['play_count'],
        'permalink': !exists(json, 'permalink') ? undefined : json['permalink'],
        'is_streamable': !exists(json, 'is_streamable') ? undefined : json['is_streamable'],
    };
}

export function TrackToJSON(value?: Track | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'artwork': TrackArtworkToJSON(value.artwork),
        'description': value.description,
        'genre': value.genre,
        'id': value.id,
        'track_cid': value.track_cid,
        'mood': value.mood,
        'release_date': value.release_date,
        'remix_of': RemixParentToJSON(value.remix_of),
        'repost_count': value.repost_count,
        'favorite_count': value.favorite_count,
        'tags': value.tags,
        'title': value.title,
        'user': UserToJSON(value.user),
        'duration': value.duration,
        'downloadable': value.downloadable,
        'play_count': value.play_count,
        'permalink': value.permalink,
        'is_streamable': value.is_streamable,
    };
}

