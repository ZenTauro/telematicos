export function zip<T>(obj1: T[], obj2: T[]) {
    return obj1.map( (val, idx) => ( [val, obj2[idx]] ) )
}

export function cap1(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}