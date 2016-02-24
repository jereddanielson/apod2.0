/*
	This is the APOD module. Its purpose is to handle interactions
	with the NASA APOD API. If the API or data format changes,
	it will be easier to modify this interface than hunting down
	API calls in the main application.

	TODO:
	In the future this will be extended to utilize localStorage
	to cache API requests and check localStorage before querying.

	Copyright (C) 2016 Jered Cahill Danielson jered@uw.edu

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var APOD = function(){
	var _KEY = "mwTWt97WoV91jHjbgdnjNbYSx9WtAZ91ZBfGUkIl";
	var _URL = "https://api.nasa.gov/planetary/apod?hd=true&api_key=" + _KEY;

	// map of cached data pulled from the API
	var dataCache = new Map();

	/*
	Query the APOD API for a date and get the data.
	Calls the passed onSuccess and onFail functions as callbacks
	@param {Date} date - Date to retrieve data for
	@param {function} onSuccess - Callback for successful API retrieval
	@param {function} [onFail] - Callback for failure
	*/
	this.get = function(date, onSuccess = function(d){console.log("No onSuccess specified.", d)}, onFail = function(d){console.log("No onFail specified.", d)}){
		// first check to see if we have an entry for this in "data"
		if(date !== undefined && dataCache.has(dateString)){
			// load from "data"
			// key date string for looking up date
			var dateString = date.toJSON().substring(0, 10);
			onSuccess(dataCache.get(dateString));
		} else {
			// load from API
			$.ajax({url: _URL + (date !== undefined ? "&date=" + (date.toJSON().substring(0, 10)) : ""), dataType: "json",
			success: function(data){
				onGetComplete(data, onSuccess);
			},
			error: function(e){
				onError(e, onFail);
			}});
		}
	};

	/*
	Execute the onSuccess callback from APOD.get().
	Creates an object to pass to the callback, then calls the callback with object.
	@param {object} data - Data retrieved from the APOD API
	@param {function} callOnSuccess - Callback to pass the formatted data to
	*/
	function onGetComplete(data, callOnSuccess){
		var ret = {};
		ret.copyright = data.copyright;
		ret.date = data.date;
		ret.explanation = data.explanation;
		ret.hdurl = data.hdurl;
		ret.mediatype = data.media_type;
		ret.title = data.title;
		ret.sdurl = data.url;
		ret.fetchtime = Date.now();
		dataCache.set(ret.date, ret);
		callOnSuccess(ret);
	}

	/*
	Execute the onFail callback from APOD.get().
	@param {object} e - Error data from the APOD API
	@param {function} callOnFail - Callback
	*/
	function onError(e, callOnFail, _dateString){
		console.log("Error retrieving data from NASA APOD API.");
		callOnFail(e);
	}
}

module.exports = APOD;