export function stringToArrayBuffer(str: string, bytes: number = 2): ArrayBuffer {
    const buffer = new ArrayBuffer(str.length * bytes); // number of bytes for each array -- default 2
    const bufferView = getBufferView(buffer, bytes);

    for (let i = 0; i < str.length; i++) {
        bufferView[i] = str.charCodeAt(i);
    }

    return buffer;
}

export function arrayBufferToString(ab: ArrayBuffer, bytes?: number): string {
    return String.fromCharCode.apply(null, getBufferView(ab, bytes));
}

export function getBufferView(buffer: ArrayBuffer, bytes: number = 2): Uint8Array | Uint16Array | Uint32Array {
    let bufferView: Uint8Array | Uint16Array | Uint32Array;

    switch (bytes) {
        case 1: bufferView = new Uint8Array(buffer); break;
        case 2: bufferView = new Uint16Array(buffer); break;
        case 3: bufferView = new Uint32Array(buffer); break;
    }

    return bufferView;
}

export function convertData(data: ArrayBuffer, bytes?: number): string {
    return arrayBufferToString(data, bytes);
}

export function isArrayBuffer(data: any): boolean {
    return data.byteLength ? true : false;
}

export function properData(data: any, bytes?: number): ArrayBuffer {
    return isArrayBuffer(data) ? data : stringToArrayBuffer(data, bytes);
}
