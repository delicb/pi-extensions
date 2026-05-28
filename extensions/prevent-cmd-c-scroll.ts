import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const SUPER_MODIFIER = 8;
const LOCK_MASK = 64 + 128;
const C_CODEPOINTS = new Set(["c".codePointAt(0), "C".codePointAt(0)]);
const KITTY_CSI_U = /^\x1b\[(\d+)(?::(\d*))?(?::(\d+))?(?:;(\d+))?(?::(\d+))?u$/;
const MODIFY_OTHER_KEYS = /^\x1b\[27;(\d+);(\d+)~$/;

function modifierFromValue(value: string | undefined): number {
	const modifierValue = value === undefined ? 1 : Number.parseInt(value, 10);
	if (!Number.isFinite(modifierValue)) return -1;
	return (modifierValue - 1) & ~LOCK_MASK;
}

function isCCodepoint(value: string | undefined): boolean {
	if (value === undefined || value === "") return false;
	return C_CODEPOINTS.has(Number.parseInt(value, 10));
}

function isCmdC(data: string): boolean {
	const kittyMatch = KITTY_CSI_U.exec(data);
	if (kittyMatch) {
		return (
			modifierFromValue(kittyMatch[4]) === SUPER_MODIFIER &&
			[kittyMatch[1], kittyMatch[2], kittyMatch[3]].some(isCCodepoint)
		);
	}

	const modifyOtherKeysMatch = MODIFY_OTHER_KEYS.exec(data);
	return Boolean(
		modifyOtherKeysMatch &&
			modifierFromValue(modifyOtherKeysMatch[1]) === SUPER_MODIFIER &&
			isCCodepoint(modifyOtherKeysMatch[2]),
	);
}

export default function (pi: ExtensionAPI) {
	let unsubscribe: (() => void) | undefined;

	pi.on("session_start", (_event, ctx) => {
		unsubscribe?.();
		unsubscribe = ctx.ui.onTerminalInput((data) => {
			if (isCmdC(data)) return { consume: true };
		});
	});

	pi.on("session_shutdown", () => {
		unsubscribe?.();
		unsubscribe = undefined;
	});
}
