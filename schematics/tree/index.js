"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ast_1 = require("../utils/ast");
const component_1 = require("../utils/devkit-utils/component");
/**
 * Scaffolds a new tree component.
 * Internally it bootstraps the base component schematic
 */
function default_1(options) {
    return schematics_1.chain([
        component_1.buildComponent(Object.assign({}, options)),
        options.skipImport ? schematics_1.noop() : addTreeModulesToModule(options)
    ]);
}
exports.default = default_1;
/**
 * Adds the required modules to the relative module.
 */
function addTreeModulesToModule(options) {
    return (host) => {
        const modulePath = ast_1.findModuleFromOptions(host, options);
        ast_1.addModuleImportToModule(host, modulePath, 'MatTreeModule', '@angular/material');
        ast_1.addModuleImportToModule(host, modulePath, 'MatIconModule', '@angular/material');
        ast_1.addModuleImportToModule(host, modulePath, 'MatButtonModule', '@angular/material');
        return host;
    };
}
//# sourceMappingURL=index.js.map