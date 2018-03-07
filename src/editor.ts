import { SaveEditor, Stream, crc32 } from 'libvantage';
import { Mafia_III_Save } from './save';
import { observable } from 'aurelia-framework';
export class Editor implements SaveEditor {
    private M3S: Mafia_III_Save = null;
    private Wallet: number = 0; private Stash: number = 0; private Medkits: number = 0;
    private Weapon_1_Bullets: number = 0; private Weapon_1_Clips: number = 0;
    private Weapon_2_Bullets: number = 0; private Weapon_2_Clips: number = 0;
    private Frag_Grenade: number = 0; private Molotov_Cocktails: number = 0; private Screaming_Zemi: number = 0; private Proximity_Mine: number = 0;
    private c_table:string = ''; private v_table:string = ''; private t_table:string = '';
    @observable private favors_selected_character = '0';
    private favors_selected_characterChanged(newValue, oldValue) { //Not Implemented
        if(newValue !== oldValue) {
            if(newValue == "0") {
                this.v_table = 'display:none;'; this.t_table = 'display:none;'; this.c_table = 'display:none;';
            } else if(newValue == "1") {
                this.c_table = 'display:none;'; this.t_table = 'display:none;'; this.v_table = 'display:none;';
            } else if(newValue == "2") {
                this.c_table = 'display:none;'; this.v_table = 'display:none;'; this.t_table = 'display:none;';
            }
        }
    }
    private favors_not_loading:boolean = true;
    private can_update_favors():boolean { if(this.M3S != null) { if(this.M3S.IsValid) { return this.favors_not_loading; } } return false; }
    @observable private favors_0_z:boolean = false; private favors_0_zChanged(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(0, 0, newValue); this.Favors_Load(0); } }
    @observable private favors_0_1:boolean = false; private favors_0_1Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(0, 1, newValue); this.Favors_Load(0); } }
    @observable private favors_0_2:boolean = false; private favors_0_2Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(0, 2, newValue); this.Favors_Load(0); } }
    @observable private favors_0_3:boolean = false; private favors_0_3Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(0, 3, newValue); this.Favors_Load(0); } }
    @observable private favors_0_4:boolean = false; private favors_0_4Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(0, 4, newValue); this.Favors_Load(0); } }
    @observable private favors_0_5:boolean = false; private favors_0_5Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(0, 5, newValue); this.Favors_Load(0); } }
    @observable private favors_0_6:boolean = false; private favors_0_6Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(0, 6, newValue); this.Favors_Load(0); } }
    @observable private favors_0_7:boolean = false; private favors_0_7Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(0, 7, newValue); this.Favors_Load(0); } }
    @observable private favors_0_8:boolean = false; private favors_0_8Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(0, 8, newValue); this.Favors_Load(0); } }
    @observable private favors_0_9:boolean = false; private favors_0_9Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(0, 9, newValue); this.Favors_Load(0); } }
    @observable private favors_0_a:boolean = false; private favors_0_aChanged(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(0, 10, newValue); this.Favors_Load(0); } }
    @observable private favors_1_z:boolean = false; private favors_1_zChanged(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(1, 0, newValue); this.Favors_Load(1); } }
    @observable private favors_1_1:boolean = false; private favors_1_1Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(1, 1, newValue); this.Favors_Load(1); } }
    @observable private favors_1_2:boolean = false; private favors_1_2Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(1, 2, newValue); this.Favors_Load(1); } }
    @observable private favors_1_3:boolean = false; private favors_1_3Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(1, 3, newValue); this.Favors_Load(1); } }
    @observable private favors_1_4:boolean = false; private favors_1_4Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(1, 4, newValue); this.Favors_Load(1); } }
    @observable private favors_1_5:boolean = false; private favors_1_5Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(1, 5, newValue); this.Favors_Load(1); } }
    @observable private favors_1_6:boolean = false; private favors_1_6Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(1, 6, newValue); this.Favors_Load(1); } }
    @observable private favors_1_7:boolean = false; private favors_1_7Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(1, 7, newValue); this.Favors_Load(1); } }
    @observable private favors_1_8:boolean = false; private favors_1_8Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(1, 8, newValue); this.Favors_Load(1); } }
    @observable private favors_1_9:boolean = false; private favors_1_9Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(1, 9, newValue); this.Favors_Load(1); } }
    @observable private favors_1_a:boolean = false; private favors_1_aChanged(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(1, 10, newValue); this.Favors_Load(1); } }
    @observable private favors_2_z:boolean = false; private favors_2_zChanged(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(2, 0, newValue); this.Favors_Load(2); } }
    @observable private favors_2_1:boolean = false; private favors_2_1Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(2, 1, newValue); this.Favors_Load(2); } }
    @observable private favors_2_2:boolean = false; private favors_2_2Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(2, 2, newValue); this.Favors_Load(2); } }
    @observable private favors_2_3:boolean = false; private favors_2_3Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(2, 3, newValue); this.Favors_Load(2); } }
    @observable private favors_2_4:boolean = false; private favors_2_4Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(2, 4, newValue); this.Favors_Load(2); } }
    @observable private favors_2_5:boolean = false; private favors_2_5Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(2, 5, newValue); this.Favors_Load(2); } }
    @observable private favors_2_6:boolean = false; private favors_2_6Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(2, 6, newValue); this.Favors_Load(2); } }
    @observable private favors_2_7:boolean = false; private favors_2_7Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(2, 7, newValue); this.Favors_Load(2); } }
    @observable private favors_2_8:boolean = false; private favors_2_8Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(2, 8, newValue); this.Favors_Load(2); } }
    @observable private favors_2_9:boolean = false; private favors_2_9Changed(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(2, 9, newValue); this.Favors_Load(2); } }
    @observable private favors_2_a:boolean = false; private favors_2_aChanged(newValue, oldValue) { if(this.can_update_favors()) { this.M3S.Favor_Set(2, 10, newValue); this.Favors_Load(2); } }
    private Favors_Load(CharacterIndex:number) {
        this.favors_not_loading = false;
        if(this.M3S != null) {
            if (this.M3S.IsValid) {
                if(CharacterIndex == 0) {
                    this.favors_0_z = this.M3S.Favor_Unlocked(CharacterIndex, 0);
                    this.favors_0_1 = this.M3S.Favor_Unlocked(CharacterIndex, 1);
                    this.favors_0_2 = this.M3S.Favor_Unlocked(CharacterIndex, 2);
                    this.favors_0_3 = this.M3S.Favor_Unlocked(CharacterIndex, 3);
                    this.favors_0_4 = this.M3S.Favor_Unlocked(CharacterIndex, 4);
                    this.favors_0_5 = this.M3S.Favor_Unlocked(CharacterIndex, 5);
                    this.favors_0_6 = this.M3S.Favor_Unlocked(CharacterIndex, 6);
                    this.favors_0_7 = this.M3S.Favor_Unlocked(CharacterIndex, 7);
                    this.favors_0_8 = this.M3S.Favor_Unlocked(CharacterIndex, 8);
                    this.favors_0_9 = this.M3S.Favor_Unlocked(CharacterIndex, 9);
                    this.favors_0_a = this.M3S.Favor_Unlocked(CharacterIndex, 10);
                } else if(CharacterIndex == 1) {
                    this.favors_1_z = this.M3S.Favor_Unlocked(CharacterIndex, 0);
                    this.favors_1_1 = this.M3S.Favor_Unlocked(CharacterIndex, 1);
                    this.favors_1_2 = this.M3S.Favor_Unlocked(CharacterIndex, 2);
                    this.favors_1_3 = this.M3S.Favor_Unlocked(CharacterIndex, 3);
                    this.favors_1_4 = this.M3S.Favor_Unlocked(CharacterIndex, 4);
                    this.favors_1_5 = this.M3S.Favor_Unlocked(CharacterIndex, 5);
                    this.favors_1_6 = this.M3S.Favor_Unlocked(CharacterIndex, 6);
                    this.favors_1_7 = this.M3S.Favor_Unlocked(CharacterIndex, 7);
                    this.favors_1_8 = this.M3S.Favor_Unlocked(CharacterIndex, 8);
                    this.favors_1_9 = this.M3S.Favor_Unlocked(CharacterIndex, 9);
                    this.favors_1_a = this.M3S.Favor_Unlocked(CharacterIndex, 10);
                } else if(CharacterIndex == 2) {
                    this.favors_2_z = this.M3S.Favor_Unlocked(CharacterIndex, 0);
                    this.favors_2_1 = this.M3S.Favor_Unlocked(CharacterIndex, 1);
                    this.favors_2_2 = this.M3S.Favor_Unlocked(CharacterIndex, 2);
                    this.favors_2_3 = this.M3S.Favor_Unlocked(CharacterIndex, 3);
                    this.favors_2_4 = this.M3S.Favor_Unlocked(CharacterIndex, 4);
                    this.favors_2_5 = this.M3S.Favor_Unlocked(CharacterIndex, 5);
                    this.favors_2_6 = this.M3S.Favor_Unlocked(CharacterIndex, 6);
                    this.favors_2_7 = this.M3S.Favor_Unlocked(CharacterIndex, 7);
                    this.favors_2_8 = this.M3S.Favor_Unlocked(CharacterIndex, 8);
                    this.favors_2_9 = this.M3S.Favor_Unlocked(CharacterIndex, 9);
                    this.favors_2_a = this.M3S.Favor_Unlocked(CharacterIndex, 10);
                }
            }
        }
        this.favors_not_loading = true;
    }
    public load(buffer: Buffer) {
        this.M3S = new Mafia_III_Save(buffer);    
        if(this.M3S.IsValid) {
            this.Wallet = this.M3S.Values[0];
            this.Stash = this.M3S.Values[1];
            this.Medkits = this.M3S.Values[2];
            this.Weapon_1_Bullets = this.M3S.Values[3];
            this.Weapon_1_Clips = this.M3S.Values[4];
            this.Weapon_2_Bullets = this.M3S.Values[5];
            this.Weapon_2_Clips = this.M3S.Values[6];
            this.Frag_Grenade = this.M3S.Values[7];
            this.Molotov_Cocktails = this.M3S.Values[8];
            this.Proximity_Mine = this.M3S.Values[9];
            this.Screaming_Zemi = this.M3S.Values[10];
            //this.Favors_Load(0); this.Favors_Load(1); this.Favors_Load(2);
            //this.favors_selected_character = '1';
            //this.favors_selected_character = '0';
        }
    }
    public save(): Buffer {
        if(this.M3S != null) {
            if(this.M3S.IsValid) {
                this.M3S.Values[0] = this.Wallet;
                this.M3S.Values[1] = this.Stash;
                this.M3S.Values[2] = this.Medkits;
                this.M3S.Values[3] = this.Weapon_1_Bullets;
                this.M3S.Values[4] = this.Weapon_1_Clips;
                this.M3S.Values[5] = this.Weapon_2_Bullets;
                this.M3S.Values[6] = this.Weapon_2_Clips;
                this.M3S.Values[7] = this.Frag_Grenade;
                this.M3S.Values[8] = this.Molotov_Cocktails;
                this.M3S.Values[9] = this.Proximity_Mine;
                this.M3S.Values[10] = this.Screaming_Zemi;
                return this.M3S.toBuffer();
            }
        }
    }
}