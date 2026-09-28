// Solo añades la palabra "export" al principio
export function parseJSON(data: any) {
    if (typeof data === 'object' && data !== null) return data;
    
    try {
        let parsed = JSON.parse(data);
        if (typeof parsed === 'string') {
            parsed = JSON.parse(parsed);
        }
        return parsed;
    } catch (e) {
        console.error("No se pudo parsear la data:", data);
        return null;
    }
}