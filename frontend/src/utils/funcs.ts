export function as_mapscoord(x: number, y: number): string {
    const coord = `https://www.google.com/maps/@${x},${y},14z`;
    return coord;
}

export function zip<T>(obj1: T[], obj2: T[]) {
    return obj1.map( (val, idx) => ( [val, obj2[idx]] ) )
}

export function cap1(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

interface ICoord {
    /** Positive if North, negative if South */
    latitude: number,
    /** Positive if East, negative if West */
    longitude: number,
};

export function coords2maps(coords: string): ICoord {
    const matches = coords.match(/^(N|S)\s*(\d+)(|\.\d+)\s*,\s*(E|O)\s*(\d+)(|\.\d+)$/);
    if (!matches) return {latitude: 0, longitude: 0};

    const poslat = matches[1] === "N" ? 1 : -1 ;
    const poslon = matches[4] === "E" ? 1 : -1 ;

    const latitude  = parseFloat( matches[2] + matches[3] ) * poslat;
    const longitude = parseFloat( matches[5] + matches[6] ) * poslon;

    console.log(`latitude: ${latitude}o, longitude: ${longitude}o`);

    return {
        latitude,
        longitude,
    }
}

export function isMail(addr: string): boolean {
    const name_domain = addr.split('@');
    if (name_domain.length !== 2) return false;

    const name = name_domain[0];
    const domain = name_domain[1];

    if (!name.match(/[\w.]+\w/))    return false;
    if (!domain.match(/[\w.]+\.\w+/)) return false;

    return true;
}

export function int_to_hex(i: number): string {
    let hex = ((i>>24)&0xFF).toString(16) +
              ((i>>16)&0xFF).toString(16) +
              ((i>>8)&0xFF).toString(16) +
              (i&0xFF).toString(16);
    hex += '000000';
    return hex.substring(0, 6);
}