import { RendererData } from "./RendererData";

type NodeClickHandler = (event: MouseEvent, id: string, type: string) => void;

export type LeafRenderer = {
	setData: (data: RendererData) => void;
	originalSetData?: (data: RendererData) => void;
	onNodeClick?: NodeClickHandler;
	originalOnNodeClick?: NodeClickHandler;
};
