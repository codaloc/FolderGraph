import { RendererData } from "./RendererData";

export type LeafRenderer = {
	setData: (data: RendererData) => void;
	originalSetData?: (data: RendererData) => void;
};