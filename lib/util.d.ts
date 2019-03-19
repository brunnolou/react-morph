import { MorphOptions, NumberObject } from './types';
export declare const getRects: (node: HTMLElement) => {
    left: string;
    top: string;
    width: string;
    height: string;
};
export declare const applyOverlayStyle: (node: HTMLElement, styles?: {}) => void;
export declare const diffRect: (a: CSSStyleDeclaration, b: CSSStyleDeclaration) => {
    translateY: number;
    translateX: number;
    scaleY: number;
    scaleX: number;
};
export declare const getTransformString: ({ translateY, translateX, scaleY, scaleX }: NumberObject, removeScale?: boolean) => string;
export declare const getRect: (elm: HTMLElement, { getMargins }?: {
    getMargins?: boolean;
}) => CSSStyleDeclaration;
export declare const getValueFromProgress: (from: number, to: number, progress: number) => number;
export declare const interpolateObject: (from: NumberObject, to: NumberObject, { easings, isReversed }: MorphOptions) => (t: number) => {};
export declare const cloneElement: (element: HTMLElement, { portalElement, zIndex }: MorphOptions) => HTMLDivElement;
export declare const clamp: (min: number, max: number) => (x: number) => number;
export declare const clampProgress: (x: number) => number;
export declare const lerp: (from: number, to: number, isClamped: Boolean) => (t: number) => number;
declare const _default: {
    interpolateObject: (from: NumberObject, to: NumberObject, { easings, isReversed }: MorphOptions) => (t: number) => {};
};
export default _default;
