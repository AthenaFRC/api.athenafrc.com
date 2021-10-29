# Athena Endpoints

Each endpoint on the Athena API should be created using the same structure to help reduce the rate of errors being
introduced into the various endpoints on the API, as well as to help aid in ease-of-understanding when reading over the
code for a given endpoint.

This structure is as follows:

```typescript
/* Block comments such as this one are to be ignored, and are for explanatory purposes only. Note that this exemption
 * does not also apply to doc-comments, which are notated with the '/**' syntax (two asterisks rather than one for the 
 * opening stanza). */

/* Import statements should appear at the very beginning of the file. */
import { MyImportedSymbol } from "./file-containing-imported-symbol.ts";

/**
 * A general explanation of the purpose and high-level functionality of the endpoint should appear here.
 * 
 * Other good items to take note of include:
 *  - Whether or not the endpoint is authenticated.
 *  - If the endpoint *is* authenticated, notate the types of permissions required to access it.
 *  - General pre-requisites for using the endpoint, if any.
 *  
 * Each individual HTTP method on the endpoint should have its own documentation, so the documentation that appears here
 * need-not-be exhaustive.
 */
export async function getEndpointNameEndpoint(): Promise<Router> {
	/* Also, as a note regarding the name of the endpoint function (the function to which this doc-comment is attached),
	 * the name of the function should be a camel-cased version of the path component to which the endpoint belongs,
	 * preceeded with the word 'get' and suceeded by the word 'endpoint'.
	 * 
	 * In other words, if the 'website.com/login' endpoint is the one in question, the function name would be
	 * `getLoginEndpoint`.
	 * 
	 * For endpoints that have more than a single path component, common sense should be used to fully explain and
	 * contextualize the endpoint in question, as the final path component may not fully and/or safely namespace the
	 * function. For example, 'website.com/ecom/:teamID/members'. Such an endpoint would not be fully explained by the
	 * function name `getMembersEndpoint`, and may in fact shadow the name of a function for a similar endpoint (i.e.
	 * 'website.com/all/members'). For such an endpoint, a name such as `getEcomTeamMembersEndpoint` may be more
	 * appropriate.
	 */
	
	const router: Router = new Router();
	
	/* HTTP method routers should be attached to the primary router in the order in which the relevant functions appear
	 * in the endpoint file.
	 */
	
	router.attachRouter(await createPOSTEndpoint());
	router.attachRouter(await createGETEndpoint());
	router.attachRouter(await createPUTEndpoint());
	router.attachRouter(await createDELETEEndpoint());
	
	return router;
	
}

/* After the primary, exported endpoint function, each of the HTTP methods present/supported by the endpoint should each
 * have their own function, to be called from the primary endpoint function. These functions should appear in the order
 * given here ('CRUD' order - create, read, update, and delete) for readability's sake, and should each include
 * documentation, as will be outlined for the `createPOSTRouter` function.
 * 
 * Many endpoints will not support/need each of the four common HTTP methods (POST, GET, PUT, and DELETE). In fact, most
 * endpoints will only require one or two. In these cases, it is not necesary to include empty function bodies for the
 * unsupported/unneeded HTTP methods. Instead, those functions should simply be omitted from the endpoint file.
 */

/**
 * An explanation of the purpose and high-level functionality of this HTTP method router should appear here.
 * 
 * Other good items to take note of include:
 *  - Whether or not this endpoint + HTTP method combination is authenticated.
 *  - What permissions are required for this endpoint + HTTP method combination.
 *  - The type(s)/format(s) of request body/bodies expected by this endpoint + HTTP method combination.
 *  - The type(s)/format(s) of response body/bodies to expected from this endpoint + HTTP method combination.
 *  - The various errors, if any, that can occur while using this endpoint + HTTP method combination.
 */
async function createPOSTRouter(): Promise<Router> {
	
	/* It is often beneficial to create a simple type to represent the expected format of the request body so that it
	 * can be referenced multiple times without having to re-type it out upon each use.
	 */
	type POSTBody = {
		myPostVariable: string,
		somethingElse: number
	};
	
	const router: Router = MethodRouter.POST();
	
	/* Once the HTTP method router has been initialized, Middleware and handlers should be attached in their order of
	 * execution. That order is as follows:
	 * 
	 *  - `attachMiddlewareAtBeginning`
	 *  - `attachMiddlewareBeforeHandler`
	 *  - `attachHandler`
	 *  - `attachMiddlewareAfterHandler`
	 *  - `attachMiddlewareAtEnd`
	 * 
	 * Similarly to the HTTP method handler function, unused components from the above list may obviously be omitted
	 * from the function.
	 */
	
	router.attachMiddlewareAtBeginning(/* middleware! */);
	
	router.attachMiddlewareBeforeHandler(/* middleware! */);
	
	router.attachHandler(async (request: IncomingHTTPRequest, response: OutgoingHTTPResponse): Promise<void> => {
	    
	    // Handle the request!
	    
	});
	
	router.attachMiddlewareAfterHandler(/* middleware! */);
	
	router.attachMiddlewareAtEnd(/* middleware! */);
	
	return router;

}

/**
 * Documentation, as outlined for the `createPOSTRouter` function.
 */
async function createGETRouter(): Promise<Router> { /* ... */ }

/**
 * Documentation, as outlined for the `createPOSTRouter` function.
 */
async function createPUTRouter(): Promise<Router> { /* ... */ }

/**
 * Documentation, as outlined for the `createPOSTRouter` function.
 */
async function createDELETERouter(): Promise<Router> { /* ... */ }

/* Any other necessary HTTP methods (that have not been specified above) attached to the given endpoint should appear at
 * the end of the endpoint function. Each function should be documented in the same format as each of the other HTTP
 * method functions.
 * 
 * The endpoint file should NEVER include additional functions or code outside of the endpoint and/or HTTP method router
 * functions. If additional functionality is required that you as the developer have decided should not be inlined into
 * the endpoint and/or router functions, additional TypeScript files/classes should be created to handle that
 * functionality.
 */
```
