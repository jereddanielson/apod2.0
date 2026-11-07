/*
	This is the APOD module. Its purpose is to handle interactions
	with the NASA APOD API. If the API or data format changes,
	it will be easier to modify this interface than hunting down
	API calls in the main application.

	The module caches data fetched from previous API calls,
	including the image elements, to both save on unnecessary API
	calls and to increase speed.

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

/*
	TODOS:
	- Keep track of inprogress requests in a Map and discard duplicate requests
*/

import React from "react"

import Moment from "moment"

import {getSummary} from "./archiveBlocks.js"
import {API_URL, cleanCredit, cleanExplanation, findVideo, resizedImageUrl, toDateCode, toDateString} from "./nasa.js"

import Image from "../components/Image.jsx"
import Loading from "../components/Loading.jsx"
import Video from "../components/Video.jsx"

var APOD = function(){
	// width of the image shown on the main page, the hi-res view uses the full size
	var _IMAGE_WIDTH = 1920;

	// map of cached data pulled from the API
	var dataCache = new Map();

	/*
	Get whatever we have for a date right now, without making a request.
	This is what lets a new date appear instantly. If isComplete is false on the
	result, there's more to come and the rest needs to be requested with APOD.get().
	@param {Date} date - Date to retrieve data for
	@returns {object} - The date's data, which is at least a loading indicator
	*/
	this.getInstant = function(date){
		var dateString = toDateString(date);
		if(dataCache.has(dateString)){
			return dataCache.get(dateString);
		}
		var summary = getSummary(dateString);
		if(summary){
			var ret = formatEntry(summary);
			if(ret.isComplete){
				dataCache.set(dateString, ret);
			}
			return ret;
		}
		return {date: dateString, mediatype: "loading", isComplete: false, reactElement: <Loading key={dateString + "loading"} />};
	};

	/*
	Query the APOD API for a date (or the latest entry, if there's no date) and get the data.
	Calls the passed onSuccess and onFail functions as callbacks
	@param {Date} date - Date to retrieve data for
	@param {function} onSuccess - Callback for successful API retrieval
	@param {function} [onFail] - Callback for failure
	*/
	this.get = function(date, onSuccess = function(d){}, onFail = function(d){}){
		// first check to see if we already have everything for this date

		// key date string for looking up date
		var dateString = (date !== undefined) ? toDateString(date) : undefined;
		var instant = (date !== undefined) ? this.getInstant(date) : undefined;
		if(instant && instant.isComplete){
			onSuccess(instant);
		} else {
			// load from API
			fetch(API_URL + (date !== undefined ? "/" + toDateCode(date) : "?per_page=1")).then(function(response){
				if(!response.ok){
					throw {status: response.status};
				}
				return response.json();
			}).then(function(data){
				// the latest entry comes back as a list of one
				var entry = Array.isArray(data) ? data[0] : data;
				if(entry){
					onGetComplete(entry, onSuccess);
				} else {
					onError({status: "empty"}, onFail, dateString);
				}
			}, function(e){
				// passed as a second argument, so that this only handles a failed request
				// and not a bug in the code above
				onError(e, onFail, dateString);
			});
		}
	};

	/*
	Execute the onSuccess callback from APOD.get().
	@param {object} data - Data retrieved from the APOD API
	@param {function} callOnSuccess - Callback to pass the formatted data to
	*/
	function onGetComplete(data, callOnSuccess){
		var ret = formatEntry(data);
		dataCache.set(ret.date, ret);
		callOnSuccess(ret);
	}

	/*
	Create our version of an entry from what the API returned.
	@param {object} data - A full entry from the API, or a summary without basic_html
	@returns {object} - The formatted data
	*/
	function formatEntry(data){
		var ret = {};
		ret.credit = cleanCredit(data.credit);
		ret.date = data.date;
		ret.explanation = cleanExplanation(data.explanation);
		ret.hdurl = data.hdurl;
		ret.mediatype = data.media_type;
		ret.permalink = data.permalink;
		ret.title = data.title;
		ret.sdurl = data.hdurl ? resizedImageUrl(data.hdurl, _IMAGE_WIDTH) : undefined;
		ret.fetchtime = Date.now();
		ret.isComplete = true;
		// anything that isn't an image should be a video, but show its image if we can't find one
		var video = (ret.mediatype !== "image") ? findVideo(data.basic_html) : undefined;
		if(ret.mediatype !== "image" && data.basic_html === undefined){
			// a video's location isn't in the summary, so its text is all we can show for now
			ret.isComplete = false;
			ret.hdurl = undefined;
			ret.reactElement = <Loading key={ret.date + "loading"} />;
		} else if(video){
			ret.reactElement = <Video key={ret.date + "vid"} type={video.type} vidsrc={video.src} permalink={ret.permalink} title={ret.title} />;
		} else if(ret.sdurl) {
			ret.reactElement = <Image key={ret.date + "img"} imgsrc={ret.sdurl} fallbacksrc={ret.hdurl} alt={data.alt} title={ret.title} />;
		} else {
			ret.reactElement = errorElement(<a href={ret.permalink} target="_blank" rel="noopener noreferrer">View this entry on NASA's website.</a>);
		}
		return ret;
	}

	/*
	Execute the onFail callback from APOD.get().
	@param {object} e - Error data from the APOD API
	@param {function} callOnFail - Callback
	@param [string] _dateString - Date string of the error
	*/
	function onError(e, callOnFail, _dateString = toDateString(Moment())){
		console.log("Error " + (e.status || e.message) + " while retrieving '" + _dateString + "' from NASA APOD API.");
		var isMissing = e.status === 404;
		var ret = {};
		ret.date = _dateString;
		ret.mediatype = "error";
		ret.title = isMissing ? "No Entry" : "API Error";
		ret.explanation = isMissing ? "NASA doesn't have an entry for this date. It may not have been published yet." : "NASA's API generated an error. Try viewing the original webpage on their website.";
		ret.reactElement = errorElement(isMissing ? <>There's no entry for {ret.date}.<br/>It may not have been published yet.</> : <>Error retrieving {ret.date}.<br/>This is likely a problem with NASA's API and I can't fix it.</>);
		// not cached, since trying again later might work
		callOnFail(ret);
	}

	function errorElement(contents){
		var errorStyle = {
			position: "absolute",
			color: "#ddd",
			width: "100vw",
			transform: "translate(-50%, -50%)",
			textAlign: "center"
		};
		return <div style={errorStyle} className="api-error-element">{contents}</div>;
	}

	/*
	Preload an asset, doing nothing with the returned data
	except for adding it to dataCache.
	@param {Date} string - The Date to preload data for
	@param {function} onSuccess - Callback for successful API retrieval
	@param {function} [onFail] - Callback for failure
	*/
	this.preload = function(_date, onSuccess, onFail){
		this.get(_date, function(d){
			// preload by creating image element (only if mediatype is an image, not video)
			if(d.mediatype === "image"){
				var img = document.createElement("img");
				img.src = d.sdurl;
			}
		}, onFail);
	}

	this.getCacheSize = function() {
		return dataCache.size;
	}
}

export default APOD;