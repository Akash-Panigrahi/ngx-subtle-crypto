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

export function hexStringToArrayBuffer(hexStr: string, bytes: number = 2): ArrayBuffer {
    let str = '';

    for (let i = 0; i < hexStr.length; i += 2) {
        str += String.fromCharCode(parseInt(hexStr.substr(i, 2), 16));
    }

    return stringToArrayBuffer(str, bytes);
}

export function arrayBufferToHexString(ab: ArrayBuffer, bytes?: number) {
    const byteArray = getBufferView(ab, bytes);

    const hexCodes = [...byteArray].map(value => {
        const hexCode = value.toString(16);
        const paddedHexCode = hexCode.padStart(2, '0');
        return paddedHexCode;
    });

    return hexCodes.join('');
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

export function convertData(data: ArrayBuffer, type: string, bytes?: number): string {
    return type === 'hexString'
        ? arrayBufferToHexString(data, bytes)
        : arrayBufferToString(data, bytes);
}

export function isArrayBuffer(data: any): boolean {
    return data.byteLength ? true : false;
}

export function properData(data: any, type: string, bytes?: number): ArrayBuffer {

    if (isArrayBuffer(data)) {
        console.log('is arraybuffer');
    } else {
        if (type === 'hexString') {
            console.log('hexString', arrayBufferToHexString(hexStringToArrayBuffer(data, bytes)));
        } else {
            console.log('string', arrayBufferToHexString(stringToArrayBuffer(data, bytes)));
        }
    }

    return isArrayBuffer(data)
        ? data
        : type === 'hexString'
            ? hexStringToArrayBuffer(data, bytes)
            : stringToArrayBuffer(data, bytes);
}

export function stringData(data: any, bytes?: number): ArrayBuffer {
    return isArrayBuffer(data) ? data : stringToArrayBuffer(data, bytes);
}

export function hexStringData(data: any, bytes?: number): ArrayBuffer {
    return isArrayBuffer(data) ? data : hexStringToArrayBuffer(data, bytes);
}
