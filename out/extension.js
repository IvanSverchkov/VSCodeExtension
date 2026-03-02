"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const prepareTerminals_1 = require("./commands/prepareTerminals");
const nextTerminal_1 = require("./commands/nextTerminal");
const prepareStashMessage_1 = require("./commands/prepareStashMessage");
function activate(context) {
    context.subscriptions.push(prepareTerminals_1.prepareTerminals);
    context.subscriptions.push(nextTerminal_1.nextTerminal);
    context.subscriptions.push(prepareStashMessage_1.prepareStashMessage);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map