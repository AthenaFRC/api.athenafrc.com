/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:37 PM -- October 28th, 2021.
 * Project: @athenafrc/athenad
 * 
 * @athenafrc/athenad - The backend daemon/server for the Athena platform.
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

import { Router, MethodRouter, IncomingHTTPRequest, OutgoingHTTPResponse } from "@t99/http-server";

/**
 * Returns a Promise that resolves to the `version` endpoint.
 * 
 * This endpoint's sole responsibility is to return the current version of the API.
 * 
 * @returns {Promise<Router>} A Promise that resolves to the `version` endpoint.
 */
export async function getVersionEndpoint(): Promise<Router> {
	
	const router: Router = new Router();
	
	router.attachRouter(await createGETRouter());
	
	return router;
	
}

/**
 * Returns a Promise that resolves to the GET endpoint for the `version` endpoint.
 * 
 * This endpoint returns a representation of the current version of the Athena API being accessed.
 * 
 * @returns {Promise<Router>} A Promise that resolves to the GET endpoint for the `version` endpoint.
 */
async function createGETRouter(): Promise<Router> {
	
	const router: Router = MethodRouter.GET();
	
	router.attachHandler(async (request: IncomingHTTPRequest, response: OutgoingHTTPResponse): Promise<void> => {
	    
	    response.headers.setHeader("Content-Type", "text/plain");
	    response.setBody("v0.1.0");
	    
	});
	
	return router;
	
}
