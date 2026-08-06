import { SubmissionResponseDto } from '$lib/DTO/SubmissionDTO';
import { UserResponseDto } from '$lib/DTO/UserResponse';
import { type } from 'arktype';

enum WebsocketMessageType {
    InitializeRequest = 'initialize',
    SubmissionRequest = 'request_submission',
    SubmissionReviewRequest = 'review_submission',
    Success = 'ok',
    Fail = 'nok',
}

const WebsocketMessage = type({
    type: type.valueOf(WebsocketMessageType),
    'response_to?': type.or(type.valueOf(WebsocketMessageType), type.null, type.undefined),
    'payload?': type.or(type.null, type.object, type.undefined),
});

const WebsocketSubmissionUserPair = type({
    user: type(UserResponseDto),
    submission: type(SubmissionResponseDto),
});

type WebsocketMessageInfer = typeof WebsocketMessage.infer;
type WebsocketSubmissionUserPairInfer = typeof WebsocketSubmissionUserPair.infer;

export default class UnreviewedSubmissionStore {
    private ws: WebSocket;
    private jwt: string;

    public currentData = $state<WebsocketSubmissionUserPairInfer | null>(null);

    public noSubmissionsMarked = $state(false);

    constructor(wsUrl: string, jwt: string) {
        this.ws = new WebSocket(wsUrl);
        this.jwt = jwt;

        this.ws.onopen = (): any => {
            this.initialize();
        };

        this.ws.onclose = UnreviewedSubmissionStore.onWsClose;

        this.ws.onmessage = (event: MessageEvent) => {
            this.onWsMessage(event);
        };

        this.ws.onerror = UnreviewedSubmissionStore.onWsError;
    }

    private initialize(): any {
        this.send({
            type: WebsocketMessageType.InitializeRequest,
            payload: {
                jwt: this.jwt,
            },
        });
    }

    private static onWsClose(this: WebSocket, event: Event): any {
        console.log('WS closed');
        console.log(event);
    }

    private onWsMessage(event: MessageEvent): any {
        console.log('Got message');
        console.log(event);

        const message = WebsocketMessage(JSON.parse(event.data));

        if (message instanceof type.errors) {
            console.log(message.summary);
            return;
        }

        if (message.type === WebsocketMessageType.Fail) {
            this.handleFail(message);
            return;
        }

        if (message.response_to === null) {
            console.log('response to should not be null');
            return;
        }

        if (message.response_to === WebsocketMessageType.InitializeRequest) {
            this.requestSubmission();

            return;
        }

        if (message.response_to === WebsocketMessageType.SubmissionRequest) {
            const pair = WebsocketSubmissionUserPair(message.payload);

            if (pair instanceof type.errors) {
                console.log(pair.summary);
                return;
            }

            this.currentData = pair;

            return;
        }

        if (message.response_to === WebsocketMessageType.SubmissionReviewRequest) {
            console.log('review response');
            console.log('ok');

            this.requestSubmission();

            return;
        }
    }

    private handleFail(message: WebsocketMessageInfer) {
        if (message.response_to === WebsocketMessageType.SubmissionRequest) {
            // no more submissions
            this.noSubmissionsMarked = true;
        }
    }

    private static onWsError(this: WebSocket, event: Event): any {
        console.error('WS Error');
        console.error(event);
    }

    private send(message: WebsocketMessageInfer) {
        this.ws.send(JSON.stringify(message));
    }

    public requestSubmission(): void {
        console.log('requesting submission');

        this.send({
            type: WebsocketMessageType.SubmissionRequest,
        });
    }

    public accept(message: string): void {
        this.send({
            type: WebsocketMessageType.SubmissionReviewRequest,
            payload: {
                state: 'accepted',
                message,
            },
        });
    }

    public reject(message: string): void {
        this.send({
            type: WebsocketMessageType.SubmissionReviewRequest,
            payload: {
                state: 'rejected',
                message,
            },
        });
    }
}
