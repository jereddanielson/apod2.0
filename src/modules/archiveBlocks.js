/*
	Loads summaries of the dates visible in the FilmStrip, which provide:
	- The thumbnail image. Its URL contains the image's original filename, so it
	  can't be worked out from the date alone and has to be looked up with the API.
	- The title and description, so that clicking a thumbnail can show them instantly.

	To keep that simple, dates are split into fixed blocks. Every date belongs to
	exactly one block, each block is requested once, and because the blocks never
	change, requests from different visitors can be served from NASA's cache.

	Copyright 2016, Jered Danielson
	jered@uw.edu

	This file is part of APOD 2.0.

	APOD 2.0 is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	APOD 2.0 is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with APOD 2.0.  If not, see <http://www.gnu.org/licenses/>.
*/

import Moment from "moment"

import {API_URL, EARLIEST_DATE, resizedImageUrl, toDateCode} from "./nasa.js"

const BLOCK_SIZE = 25; // the most results the API returns per page
const THUMBNAIL_WIDTH = 120; // twice the displayed size, for high resolution screens
// everything except basic_html, which is large and only videos need
const SUMMARY_FIELDS = "date,hdurl,title,explanation,credit,alt,permalink,media_type";
const RECENT_BLOCK_LIFETIME = 10 * 60 * 1000; // a block with recent dates may gain new entries
const FAILED_BLOCK_RETRY_DELAY = 30 * 1000;

const EPOCH = Moment.utc(EARLIEST_DATE); // UTC so that every day is exactly 24 hours long

// map of block number -> {entries: Map of date string -> entry, expires: timestamp, isLoading: bool}
const blocks = new Map();

function blockFor(dateString){
	return Math.floor(Moment.utc(dateString).diff(EPOCH, "days") / BLOCK_SIZE);
}

function fetchBlock(blockNumber){
	var firstDate = EPOCH.clone().add(blockNumber * BLOCK_SIZE, "days");
	var lastDate = firstDate.clone().add(BLOCK_SIZE - 1, "days");
	var block = blocks.get(blockNumber) || {entries: new Map()};
	block.isLoading = true;
	blocks.set(blockNumber, block);

	var query = "?per_page=" + BLOCK_SIZE + "&_fields=" + SUMMARY_FIELDS + "&date_from=" + toDateCode(firstDate) + "&date_to=" + toDateCode(lastDate);
	return fetch(API_URL + query).then(function(response){
		if(!response.ok){
			throw new Error("HTTP " + response.status);
		}
		return response.json();
	}).then(function(entries){
		entries.forEach(function(entry){
			block.entries.set(entry.date, entry);
		});
		var isRecent = lastDate.isSameOrAfter(Moment.utc().subtract(2, "days"));
		block.expires = isRecent ? Date.now() + RECENT_BLOCK_LIFETIME : Infinity;
		block.isLoading = false;
		return true;
	}).catch(function(e){
		console.log("Error " + e.message + " while retrieving summaries from " + toDateCode(firstDate) + ".");
		block.expires = Date.now() + FAILED_BLOCK_RETRY_DELAY;
		block.isLoading = false;
		return false;
	});
}

/*
Get the summary of a date, if it has been loaded.
@param {string} dateString - Date in YYYY-MM-DD format
@returns {object} - The entry as returned by the API, without basic_html, or undefined
*/
export function getSummary(dateString){
	var block = blocks.get(blockFor(dateString));
	return block ? block.entries.get(dateString) : undefined;
}

/*
Get the thumbnail URL for a date, if it has been loaded.
@param {string} dateString - Date in YYYY-MM-DD format
@returns {string} - The URL, or undefined
*/
export function getThumbnailUrl(dateString){
	var summary = getSummary(dateString);
	return summary && summary.hdurl ? resizedImageUrl(summary.hdurl, THUMBNAIL_WIDTH) : undefined;
}

/*
Check whether a date's entry is a video, if its summary has been loaded.
@param {string} dateString - Date in YYYY-MM-DD format
@returns {boolean} - True for a video, false for an image or a summary that hasn't loaded
*/
export function isVideoEntry(dateString){
	var summary = getSummary(dateString);
	return summary !== undefined && summary.media_type !== "image";
}

/*
Make sure the summaries of these dates are loaded, requesting any missing blocks.
@param {string[]} dateStrings - Dates in YYYY-MM-DD format
@param {function} onLoaded - Called each time a block finishes loading
*/
export function loadBlocks(dateStrings, onLoaded){
	new Set(dateStrings.map(blockFor)).forEach(function(blockNumber){
		var block = blocks.get(blockNumber);
		var isWanted = blockNumber >= 0 && !(block && (block.isLoading || Date.now() < block.expires));
		if(isWanted){
			fetchBlock(blockNumber).then(function(succeeded){
				if(succeeded){
					onLoaded();
				}
			});
		}
	});
}
