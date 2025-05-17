"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ApmModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApmModule = void 0;
const common_1 = require("@nestjs/common");
const apm_service_1 = require("./apm.service");
const apm_interceptor_1 = require("./apm.interceptor");
let ApmModule = ApmModule_1 = class ApmModule {
    static forRoot(service) {
        const apmProvider = {
            provide: apm_service_1.ApmService,
            useFactory: () => {
                const apm = new apm_service_1.ApmService(service);
                apm.start(); // فعال‌سازی ارسال خودکار
                return apm;
            }
        };
        return {
            module: ApmModule_1,
            providers: [apmProvider, apm_interceptor_1.ApmInterceptor],
            exports: [apm_service_1.ApmService, apm_interceptor_1.ApmInterceptor]
        };
    }
};
exports.ApmModule = ApmModule;
exports.ApmModule = ApmModule = ApmModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], ApmModule);
