"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApmInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const perf_hooks_1 = require("perf_hooks");
const apm_service_1 = require("./apm.service");
let ApmInterceptor = class ApmInterceptor {
    constructor(apmService) {
        this.apmService = apmService;
    }
    intercept(context, next) {
        const start = perf_hooks_1.performance.now();
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe((0, rxjs_1.tap)(() => {
            var _a;
            const duration = perf_hooks_1.performance.now() - start;
            const method = (request === null || request === void 0 ? void 0 : request.method) || 'UNKNOWN';
            const path = ((_a = request === null || request === void 0 ? void 0 : request.route) === null || _a === void 0 ? void 0 : _a.path) || (request === null || request === void 0 ? void 0 : request.url) || 'UNKNOWN';
            const statusCode = (response === null || response === void 0 ? void 0 : response.statusCode) || 0;
            const memory = process.memoryUsage();
            this.apmService.record({
                type: 'request',
                service: this.apmService.serviceName,
                path,
                method,
                statusCode,
                duration: parseFloat(duration.toFixed(2)),
                timestamp: new Date().toISOString(),
                memory
            });
        }));
    }
};
exports.ApmInterceptor = ApmInterceptor;
exports.ApmInterceptor = ApmInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [apm_service_1.ApmService])
], ApmInterceptor);
