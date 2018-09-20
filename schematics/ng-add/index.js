"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("@angular-devkit/schematics/tasks");
const package_json_1 = require("./package-json");
const version_names_1 = require("./version-names");
/**
 * Schematic factory entry-point for the `ng-add` schematic. The ng-add schematic will be
 * automatically executed if developers run `ng add @angular/material`.
 *
 * Since the Angular Material schematics depend on the schematic utility functions from the CDK,
 * we need to install the CDK before loading the schematic files that import from the CDK.
 */
function default_1(options) {
    return (host, context) => {
        // Since the Angular Material schematics depend on the schematic utility functions from the
        // CDK, we need to install the CDK before loading the schematic files that import from the CDK.
        let installTaskId;
        if (!options.skipPackageJson) {
            // Version tag of the `@angular/core` dependency that has been loaded from the `package.json`
            // of the CLI project. This tag should be preferred because all Angular dependencies should
            // have the same version tag if possible.
            const ngCoreVersionTag = package_json_1.getPackageVersionFromPackageJson(host, '@angular/core');
            package_json_1.addPackageToPackageJson(host, '@angular/cdk', `^${version_names_1.materialVersion}`);
            package_json_1.addPackageToPackageJson(host, '@angular/material', `^${version_names_1.materialVersion}`);
            package_json_1.addPackageToPackageJson(host, '@angular/animations', ngCoreVersionTag || version_names_1.requiredAngularVersionRange);
            if (options.gestures) {
                package_json_1.addPackageToPackageJson(host, 'hammerjs', version_names_1.hammerjsVersion);
            }
            installTaskId = context.addTask(new tasks_1.NodePackageInstallTask());
        }
        else {
            installTaskId = context.addTask(new tasks_1.NodePackageInstallTask({
                packageName: `@angular/cdk@^${version_names_1.materialVersion}`
            }));
        }
        context.addTask(new tasks_1.RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map