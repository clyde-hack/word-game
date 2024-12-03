type KeyboardKey = { id: number; value: string };
type KeyboardRow = { id: number; keys: KeyboardKey[] };

const t = Array.from('QWERTYUIOP').map((char, index) => ({ id: index, value: char })) as KeyboardKey[];
const m = Array.from('ASDFGHJKL').map((char, index) => ({ id: index, value: char })) as KeyboardKey[];
const b = ['Enter', ...Array.from('ZXCVBNM'), 'Delete'].map((char, index) => ({
	id: index,
	value: char
})) as KeyboardKey[];

export const KEYBOARD = Array.of(t, m, b).map((row, index) => ({ id: index, keys: [...row] })) as KeyboardRow[];
