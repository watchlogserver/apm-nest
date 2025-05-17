export declare class ApmService {
    private metrics;
    readonly serviceName: string;
    constructor(service: string);
    record(metric: any): void;
    flush(): any[];
    start(interval?: number): void;
    private send;
}
