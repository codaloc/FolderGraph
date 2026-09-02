import { App, TFolder } from "obsidian";

export type AppWithInternalPlugins = App & {
	internalPlugins: {
		getEnabledPluginById: (id: string) => { revealInFolder: (folder: TFolder) => void } | null;
	};
};
