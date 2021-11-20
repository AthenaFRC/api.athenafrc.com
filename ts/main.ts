/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:23 PM -- October 28th, 2021.
 * Project: @athenafrc/api.athenafrc.com
 * 
 * @athenafrc/api.athenafrc.com - The backend daemon/server for the Athena platform.
 * Copyright (C) 2021 Trevor Sears
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * NPM main class used for exporting this package's contents.
 *
 * @author Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/)
 * @version v0.1.0
 * @since v0.1.0
 */

import { AthenaApp } from "./athena-app";
import { getAPIEndpoint } from "./api";
import readline from "readline";
import { HTTPServer, IncomingHTTPRequest, OutgoingHTTPResponse } from "@t99/http-server";

export async function main(): Promise<void> {
	
	// Initialize our app instance.
	const app: AthenaApp = await AthenaApp.initialize();
	
	// Grab the HTTP server from the app instance.
	const server: HTTPServer = app.getHTTPServer();
	
	// Attach the API endpoint to the base server router.
	server.attachRouter(await getAPIEndpoint());
	
	// If a given request has not been sent, but has reached the end of the router chain, send it.
	server.attachMiddlewareAtEnd(async (request: IncomingHTTPRequest, response: OutgoingHTTPResponse): Promise<void> => {
	    
	    if (!response.hasBeenSent()) await response.send();
	    
	});
	
	// Kill the server if the users hits ENTER.
	readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false
	}).on("line", app.close);
	
}

main().catch(console.error);
