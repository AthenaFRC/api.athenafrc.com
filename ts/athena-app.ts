/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:25 PM -- October 28th, 2021.
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

import { HTTPServer } from "@t99/http-server";

/**
 * The central managing entity for a given Athena instance.
 * 
 * @author Trevor Sears <trevor@trevorsears.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class AthenaApp {
	
	/**
	 * The HTTP server instance that is responsible for managing/responding to HTTP requests to this Athena instance.
	 */
	protected httpServer: HTTPServer;
	
	/**
	 * Initializes a new AthenaApp instance with the provided HTTPServer.
	 * 
	 * @param {HTTPServer} httpServer The HTTP server instance that is responsible for managing/responding to HTTP
	 * requests to this Athena instance.
	 */
	protected constructor(httpServer: HTTPServer) {
		
		this.httpServer = httpServer;
		
	}
	
	/**
	 * Returns a Promise that resolves to an initialized/ready-to-go AthenaApp instance.
	 * 
	 * @returns {Promise<AthenaApp>} A Promise that resolves to an initialized/ready-to-go AthenaApp instance.
	 */
	public static async initialize(): Promise<AthenaApp> {
		
		return new AthenaApp(
			await HTTPServer.initialize(3001) // FIX-ME [10/28/21 @ 11:01 AM] Temporarily hard-coded port!
		);
		
	}
	
	/**
	 * Returns the HTTP server instance that is responsible for managing/responding to HTTP requests to this Athena
	 * instance.
	 * 
	 * @returns {HTTPServer} The HTTP server instance that is responsible for managing/responding to HTTP requests to
	 * this Athena instance.
	 */
	public getHTTPServer(): HTTPServer {
		
		return this.httpServer;
		
	}
	
	/**
	 * Returns a Promise that resolves once this AthenaApp instance's child resources have been gracefully shut-down and
	 * freed/closed.
	 * 
	 * @returns {Promise<void>} A Promise that resolves once this AthenaApp instance's child resources have been
	 * gracefully shut-down and freed/closed.
	 */
	public async close(): Promise<void> {
		
		await this.httpServer.close();
		
	}
	
}
