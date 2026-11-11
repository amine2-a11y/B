/* Copyright (C) 2023-2025 anonymous

This file is part of PSFree and is distributed under the GNU Affero General
Public License, version 3 or (at your option) any later version.
*/

// Keep this file dependency-free so module import failures are visible.
function describeError(reason) {
    if (reason == null) return 'Unknown error';
    if (typeof reason === 'string') return reason;
    return reason.message || String(reason);
}

function showError(kind, reason, event) {
    const details = describeError(reason);
    const source = reason && (reason.sourceURL || reason.fileName)
        || event && (event.filename || event.source)
        || '';
    const line = reason && (reason.line || reason.lineNumber)
        || event && event.lineno
        || '';
    const column = reason && (reason.column || reason.columnNumber)
        || event && event.colno
        || '';
    const stack = reason && reason.stack || '';

    alert(
        kind + '\\n'
        + details + '\\n'
        + source + ':' + line + ':' + column + '\\n'
        + stack
    );
}

addEventListener('unhandledrejection', event => {
    showError('Unhandled rejection', event.reason, event);
    event.preventDefault();
});

addEventListener('error', event => {
    showError('Unhandled error', event.error || event.message, event);
    // Returning true suppresses the browser's duplicate default error report.
    return true;
});

// Dynamic import allows this file to catch errors from the main module.
import('./psfree.mjs').catch(error => {
    showError('PSFree module failed to start', error, null);
});
