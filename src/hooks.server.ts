import {getCurrentUser} from "$actions/Auth";

export async function handle({event, resolve}: any): Promise<any> {
    //TODO
    const result = await getCurrentUser();
    if (result.type === 'success') {
        event.locals.user = result.response
    }

    return await resolve(event);
}
