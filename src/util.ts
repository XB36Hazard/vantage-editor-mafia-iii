import { Stream } from 'libvantage';

export function readString(io: Stream): string {
    const len = io.readUInt32();
    if (len === 0) {
        return '';
    }
    const str = io.readString('ascii', len - 1);
    io.position++;
    return str;
}

export function writeString(io: Stream, value: string): void {
    io.writeUInt32(value.length + 1);
    io.writeString(value, 'ascii', true);
}