import { Setting } from "obsidian";
import Folders2GraphPlugin from "./Main";
import { GraphLeafWithCustomRenderer } from "interfaces/GraphLeafWithCustomRenderer";

export class GraphSidebarControls {
	private plugin: Folders2GraphPlugin;

	// Track injected sections so we can remove them later
	private injectedSections = new Map<HTMLElement, HTMLElement>();

	constructor(plugin: Folders2GraphPlugin) {
		this.plugin = plugin;
	}

	public inject(leaf: GraphLeafWithCustomRenderer): void {
		const container = leaf.view.containerEl;
		const controlsEl = container.querySelector(".graph-controls");

		if (!controlsEl) return;

		// Prevent duplicates per leaf
		if (container.querySelector(".folders2graph-sidebar-settings"))
			return;

		const section = document.createElement("div");
		section.classList.add(
			"tree-item",
			"graph-control-section",
			"folders2graph-sidebar-settings"
		);


		const children = document.createElement("div");
		children.classList.add("tree-item-children");


		section.appendChild(children);
		controlsEl.appendChild(section);

		// Track for cleanup
		this.injectedSections.set(container, section);

		// -------------------------------------------------------------

		new Setting(children)
			.setName("Hide root node")
			.addToggle((component) => {
				component
					.setValue(this.plugin.settings.hideRootNode)
					.onChange(async (value) => {
						this.plugin.settings.hideRootNode = value;

						await this.plugin.saveSettings();
						this.plugin.refreshGraphLeaves();
					});
			});

		new Setting(children)
			.setName("Hide manual links")
			.addToggle((component) => {
				component
					.setValue(this.plugin.settings.removeOtherLinks)
					.onChange(async (value) => {
						this.plugin.settings.removeOtherLinks = value;

						await this.plugin.saveSettings();
						this.plugin.refreshGraphLeaves();
					});
			});

		new Setting(children)
			.setName("Hide nodes by strings")
			.addToggle((component) => {
				component
					.setValue(this.plugin.settings.HiddenNodes)
					.onChange(async (value) => {
						this.plugin.settings.HiddenNodes = value;

						await this.plugin.saveSettings();
						this.plugin.refreshGraphLeaves();
					});
			});

		new Setting(children)
			.setName("Hidden nodes strings")
			.addText((text) =>
				text
					/* I need that placeholdee */
					/* eslint-disable-next-line obsidianmd/ui/sentence-case */	
					.setPlaceholder(".png .jpg")
					.setValue(this.plugin.settings.HiddenNodesString)
					.onChange(async (value) => {
						this.plugin.settings.HiddenNodesString = value;

						await this.plugin.saveSettings();
						this.plugin.refreshGraphLeaves();
					})
			);
	}

	public remove(leaf: GraphLeafWithCustomRenderer): void {
		const container = leaf.view.containerEl;

		const injected = container.querySelector(
			".folders2graph-sidebar-settings"
		);

		if (injected) injected.remove();

		this.injectedSections.delete(container);
	}

	public removeAll(): void {
		this.injectedSections.forEach((section) => {
			section.remove();
		});

		this.injectedSections.clear();
	}
}