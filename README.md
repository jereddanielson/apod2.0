# APOD 2.0

NASA's Astronomy Picture of the Day is a fantastic resource for space enthusiasts. Unfortunately the user interface hasn't been updated in over a decade, and is a pain to use. This project seeks to enhance APOD with a suite of "web 2.0" enabled features to improve its usability.

### Primary goals:
- Update design aesthetics
- Improve navigation with keyboard controls and browsing
- Add social media login to enable metadata like tagging, sharing, and adding to favorites
- Intelligently preload and cache data to increase perceived speed
- Host the final project at http://apod.jered.io and spread awareness over social media

At some point I'll need to petition NASA for an API key capable of handling more than 1,000 requests per day.

### Installation:

Clone repo.
> `git clone https://github.com/jereddanielson/apod2.0.git`

Enter new directory and install with npm (you may or may not need sudo).
> `cd apod2.0`

> `npm install`

### Development:

Run the NPM `dev` script to run `webpack-dev-server` on port `8080`.
> `npm run dev`

### Build:

To build to the `dist` folder:
> `npm run build`

Copyright Jered Danielson, GNU GPL v3.0, 2018

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