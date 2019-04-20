export function stringToArrayBuffer(str: string): ArrayBuffer {
	const buffer = new ArrayBuffer(str.length * 2); // 2 bytes for each array
	const bufferView = new Uint16Array(buffer);

	for (let i = 0; i < str.length; i++) {
		bufferView[i] = str.charCodeAt(i);
	}

	return buffer;
}

export function arrayBufferToString(ab: ArrayBuffer): string {
	return String.fromCharCode.apply(null, new Uint16Array(ab));
}

export function hexString(buffer) {
	const byteArray = new Uint8Array(buffer);

	const hexCodes = [...byteArray].map(value => {
		const hexCode = value.toString(16);
		const paddedHexCode = hexCode.padStart(2, '0');
		return paddedHexCode;
	});

	return hexCodes.join('');
}