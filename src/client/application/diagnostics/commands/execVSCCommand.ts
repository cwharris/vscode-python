// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

'use strict';

import { ICommandManager } from '../../../common/application/types';
import { IServiceContainer } from '../../../ioc/types';
import { sendTelemetryEvent } from '../../../telemetry';
import { DIAGNOSTICS_ACTION } from '../../../telemetry/constants';
import { IDiagnostic } from '../types';
import { BaseDiagnosticCommand } from './base';

export class ExecuteVSCCommand extends BaseDiagnosticCommand {
    constructor(diagnostic: IDiagnostic, private serviceContainer: IServiceContainer, private commandName: string) {
        super(diagnostic);
    }
    public async invoke(): Promise<void> {
        sendTelemetryEvent(DIAGNOSTICS_ACTION, undefined, { commandName: this.commandName });
        const cmdManager = this.serviceContainer.get<ICommandManager>(ICommandManager);
        return cmdManager.executeCommand(this.commandName).then(() => undefined);
    }
}
