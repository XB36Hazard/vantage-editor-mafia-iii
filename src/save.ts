import { Stream, crc32 } from 'libvantage';
import { computedFrom, newInstance } from 'aurelia-framework';
import { isNull } from 'util';
export class Mafia_III_Save {
    public IsValid = false; private buffer: Buffer;
    private show_error_message(message:string) { alert("Error - " + message); throw new Error(message); }
    constructor(buffer: Buffer) { this.buffer = buffer; this.IsValid = this.Load(); }
    public toBuffer(): Buffer { this.Save(); return this.buffer; }
    private Offsets: number[]; public Values: number[]; private readonly Incomes:number[] = [100, 30000, 60000, 100000, 140000, 180000, 220000, 270000, 320000, 370000, 420000];
    public Favor_Unlocked(CharacterIndex: number, FavorIndex: number): boolean {
        if(CharacterIndex < 200) { return false; } //Not Implemented
        if(this.IsValid) {
            if(CharacterIndex == 0) { return this.Values[11] >= this.Incomes[FavorIndex]; }
            else if(CharacterIndex == 1) { return this.Values[14] >= this.Incomes[FavorIndex]; }
            else if(CharacterIndex == 2) { return this.Values[17] >= this.Incomes[FavorIndex]; }
        }
        return false;
    }
    public Favor_Set(CharacterIndex: number, FavorIndex: number, Unlocked: boolean) {
        if(CharacterIndex < 200) { return; } //Not Implemented
        if(this.IsValid) {
            if(CharacterIndex == 0) {
                if(Unlocked == true) { this.Values[11] = this.Incomes[FavorIndex] + 100; }
                else { this.Values[11] = this.Incomes[FavorIndex] - 100; }
            } else if(CharacterIndex == 1) {
                if(Unlocked == true) { this.Values[14] = this.Incomes[FavorIndex] + 100; }
                else { this.Values[14] = this.Incomes[FavorIndex] - 100; }
            } else if(CharacterIndex == 2) {
                if(Unlocked == true) { this.Values[17] = this.Incomes[FavorIndex] + 100; }
                else { this.Values[17] = this.Incomes[FavorIndex] - 100; }
            }
        }
    }
    private Load(): boolean {
        this.Offsets = []; this.Values = []; const io = new Stream(this.buffer); io.position = 0;
        if(io.readUInt32() == 0x524E4547) {
            io.position = io.length - 4; const Hash_1 = io.readUInt32();
            io.position = 0; const Hash_2 = crc32(io.readBytes(io.length - 4), 0, io.length - 4);
            if (Hash_1 !== Hash_2) { 
                this.show_error_message('Error: Invalid Hash!');
            } else {
                const HexData:string = this.ToHex(this.buffer);
                if(HexData !== "") {
                    this.Offsets.push((HexData.indexOf("6d5f537461736856616c7565") / 2) + 0x3C); //0:Wallet
                    this.Offsets.push(this.Offsets[0] + 0x10); //1:Stash
                    this.Offsets.push((HexData.indexOf("6d5f4d65646b6974436e74") / 2) + 0x4E1); //2:Medkits
                    this.Offsets.push((HexData.indexOf("6d5f416d6d6f496e57656170") / 2) + 0xDB); //3:Weapon_1_Bullets
                    const Ammo:number = (HexData.indexOf("066d5f416d6d6f") / 2);
                    this.Offsets.push(Ammo + 0x47); //4:Weapon_1_Clips
                    this.Offsets.push(this.Offsets[3] + 0x104); //5:Weapon_2_Bullets
                    this.Offsets.push(this.Offsets[4] + 0x138); //6:Weapon_2_Clips
                    this.Offsets.push(Ammo + 0x117); //7:Frag_Grenade
                    this.Offsets.push(Ammo + 0xAF); //8:Molotov_Cocktails
                    this.Offsets.push(Ammo + 0x7B); //9:Proximity_Mine
                    this.Offsets.push(Ammo + 0xE3); //10:Screaming_Zemi
                    for (let i = 0; i < this.Offsets.length; i++) { io.position = this.Offsets[i]; this.Values.push(io.readUInt32()); }
                    return true;
                }
            }
        } else { this.show_error_message("Invalid Magic!"); }
        return false;
    }
    private Save() { if(this.IsValid) { const io = new Stream(this.buffer); for (let i = 0; i < this.Offsets.length; i++) { io.position = this.Offsets[i]; io.writeUInt32(this.Values[i]); } io.position = 0; io.writeUInt32(crc32(io.readBytes(io.length - 4), 0, io.length - 4)); this.buffer = io.getBuffer(); } }
    private ToHex(buffer: Buffer): string { var Output = ""; for (let x = 0; x < buffer.length; x++) { Output = Output + buffer[x].toString(16).padStart(2, "0"); } return Output; }
}