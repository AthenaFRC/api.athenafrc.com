/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:27 PM -- October 28th, 2021.
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

import { Router, PathRouter } from "@t99/http-server";
import { getVersionEndpoint } from "./api/version";

/**
 * Returns a Promise that resolves to the `api` endpoint.
 * 
 * This endpoint serves as a base for all of the other endpoints on the Athena API.
 * 
 * @returns {Promise<Router>} A Promise that resolves to the `api` endpoint.
 */
export async function getAPIEndpoint(): Promise<Router> {
	
	// /api
	const apiEndpoint: Router = new PathRouter("api");
	
		// /api/version
		apiEndpoint.attachRouter(new PathRouter("version"), await getVersionEndpoint());
		
	return apiEndpoint;
	
}
