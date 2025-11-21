declare module "ics-parser" {
    export interface ICSEvent {
        uid?: string;
        summary?: string;
        description?: string;
        location?: string;
        start?: number[];
        end?: number[];
    }

    export interface ICSParseResult {
        events: ICSEvent[];
    }

    const parseICS: (text: string) => ICSParseResult;
    export default parseICS;
}
